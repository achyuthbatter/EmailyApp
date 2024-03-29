const _ = require('lodash');
const {Path} = require('path-parser');
const { URL } = require('url');
const mongoose = require('mongoose');
const requireLogin = require('../middlewares/requireLogin');
const requireCredits= require('../middlewares/requireCredits');
const Mailer = require('../services/mailer');
const surveyTemplate = require('../services/emailTemplates/surveyTemplate');

const Survey = mongoose.model('surveys');

module.exports = app => {

    app.get('/api/surveys/delete/one', requireLogin, async (req,res) => {
        // await Survey.deleteOne({ _id:req.body.id })

        // res.send('/surveys');
    });

    app.get('/api/surveys', requireLogin, async (req,res) => {
        const surveys = await Survey.find({ _user: req.user.id })
            .select({ recipients: false });

        res.send(surveys);
    });

    app.get('/api/surveys/:surveyId/:choice', (req,res) =>{
        res.send('Thanks for the feedback!');
    });

    app.post('/api/surveys/webhooks', (req, res) => {
        const p = new Path('/api/surveys/:surveyId/:choice');

        // const events = _.map(req.body, ({url, email}) => {
        //     const match = p.test(new URL(url).pathname);
        //     if(match){
        //         return { email, surveyId: match.surveyId, choice: match.choice };
        //     }
        // });


        // const compactEvents = _.compact(events); //remove undefined values returned from webhook
        // const uniqueEvents = _.uniqBy(compactEvents, 'email', 'surveyId');

        //chain function to clean up repetitive syntax of lodash
         _.chain(req.body)  
        .map(({url, email}) => {
          const match = p.test(new URL(url).pathname);
            if(match){
                return { email, surveyId: match.surveyId, choice: match.choice };
            }
        })
        .compact()
        .uniqBy('email', 'surveyId')
        .each(({surveyId, email, choice}) => {
            Survey.updateOne({
                _id:surveyId,
                recipients: {
                    $elemMatch: {email: email, responded: false}
                }
            },{
                $inc:{[choice] : 1},
                $set: {'recipients.$.responded': true },
                lastResponded: new Date()
            }).exec();
        })
        .value();

        res.send({});
    });

    app.post('/api/surveys', requireLogin, requireCredits, async (req,res) => {
        const { title, subject, body, recipients }  = req.body;

        const survey = new Survey({
            title,
            subject,
            body,
            recipients: recipients.split(',').map(email => ({ email: email.trim() }) ),
            _user: req.user.id,
            dateSent: Date.now()       
         });

        
         //place to send email
         const mailer = new Mailer(survey, surveyTemplate(survey));
         try{
            await mailer.send();
            await survey.save();
            req.user.credits -= 1;
            const userupdate = await req.user.save();

            res.send(userupdate);
         }catch(err){
             res.status(422).send(err);
         }
    });


};