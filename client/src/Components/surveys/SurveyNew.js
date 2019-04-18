//SurveyNew shows survey form and form review components
import React, { Component } from 'react';
// import { reduxForm } from 'redux-form';
import SurveForm from './SurveyForm';
import SurveyFormReview from './SurveyFormReview';

class SurveyNew extends Component{

    //one way to create state
    // constructor(props){
    //     super(props);

    //     this.state = {
    //         showReview: false
    //     }
    // }
    //the other way to initialize state 
    state = { showReview: false};

    renderContent(){
        if(this.state.showReview){
            return <SurveyFormReview onCancel={() => this.setState({ showReview: false }) } />;
        }
        return <SurveForm onSurveySubmit= {() => this.setState({ showReview: true })} />;
    }

    render(){
        return(
            <div>
               {this.renderContent()}
            </div>
        );
    }
}

export default SurveyNew;