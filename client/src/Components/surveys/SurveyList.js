import React, { Component } from 'react';
import { connect } from 'react-redux';

import { fetchSurvey, deleteSurvey } from '../../actions';

class SurveyList extends Component {

    componentDidMount(){
        this.props.fetchSurvey();
        this.props.deleteSurvey();
    }

    renderSurveys(){
        return this.props.surveys.reverse().map(survey => {
            return(
                <div className="card darken-1" key={ survey._id }>
                    <div className="card-content ">
                        <span className="card-title">{ survey.title }</span>
                        <p>{ survey.body }</p>
                        <p>
                            Sent On: { new Date(survey.dateSent).toLocaleDateString() }
                        </p>
                        <button className="red btn-floating right" onClick ={deleteSurvey()}>
                            <i className="material-icons ">delete</i>
                        </button>
                    </div>
                    <div className="card-action" style={{marginTop:'20px'}}>
                        <button>Yes: {survey.yes}  </button>
                        <button>No: {survey.no}  </button>
                    </div>
              </div>
            );
        });
    }

    render(){
        return(
            <div>
                { this.renderSurveys() }
            </div>
        );
    }
}

function mapStateToProps({surveys}){
    return {  surveys };
}

export default connect(mapStateToProps, { fetchSurvey, deleteSurvey })(SurveyList);