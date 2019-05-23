import React, {Component} from 'react';
import bravoI from './assets/img/undraw_celebration.svg'
import tryAgainI from './assets/img/undraw_knowledge.svg'


class QuizEnd extends Component {
    handleResetClick = _ => {
        this.props.resetClickHandler()
    }
    render() {
        const halfLength = this.props.questionsLength/2;
        return (
            <div className="done-illustration">
                <h3>Thanks for playing! You got <strong>{this.props.correctAnswers}</strong> questions correct out of {this.props.questionsLength}.</h3>

                {(this.props.correctAnswers < halfLength) ?
                    <div>
                        <img src={tryAgainI} alt="Not so great illustration"/>
                        <p className="text-center mt-3">They say that knowledge is power. So why don't you try that again?</p>
                    </div>
                    :
                    <img src={bravoI} alt="Congratulations illustration"/>
                }
                <a href='' onClick={this.handleResetClick} className="btn btn-primary btn-lg">Reset Quiz</a>
            </div>
        );
    }
}

export default QuizEnd;