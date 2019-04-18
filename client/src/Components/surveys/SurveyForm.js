//SurveyForm shows a form for a user to add input
import _ from 'lodash';// helper to iterate the array fields
import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { Link } from 'react-router-dom';
import SurveyField from './SurveyField';
import validateEmails from '../../utils/validateEmails';
import formFields from './formFields';


class SurveyForm extends Component{

    renderFields() {
            //one way to set fields
            // <div>
            //     <Field label="Survey Title" type="text" name="title" component={SurveyField} />
            //     <Field label="Subject Line" type="text" name="subject" component={SurveyField} />
            //     <Field label="Email Body" type="text" name="body" component={SurveyField} />
            //     <Field label="Recipient List" type="text" name="emails" component={SurveyField} />
            // </div>
            //other way to create the array of similar props above the class

        return _.map(formFields, ({label, name}) =>{
            return <Field key={name} component={SurveyField} type="text" label= {label} name= {name} />
        });
    }

    render(){
        return(
            <div className="container">
                <form onSubmit={this.props.handleSubmit(this.props.onSurveySubmit)}>
                    {this.renderFields()}
                    <Link to="/surveys" className="red btn-flat white-text">
                    Cancel
                    <i className="material-icons right">cancel</i>
                    </Link>
                    <button type="submit" className="teal btn-flat right white-text">
                    Next
                    <i className="material-icons right">done</i>
                    </button>
                    
                </form>
               
            </div>
        );
    }
}
function validate(values){
    const error = {};

    error.recipients = validateEmails(values.recipients || '');
    
    _.each(formFields, ({name, errormsg}) => {
        if(!values[name]){
            error[name] = errormsg;
        }
    });

    

    return error;
}

export default reduxForm({
    validate,
    form: 'surveyForm',
    destroyOnUnmount: false
})(SurveyForm);