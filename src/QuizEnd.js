import React, {Component} from 'react';

class QuizEnd extends Component {
    handleResetClick() {
        this.props.resetClickHandler()
    }
    render() {
        return (
            <div>
                <p>Thanks for playing! You got {this.props.correct_answers} questions correct.</p>
                <a href='' onClick={this.handleResetClick.bind(this)}>Reset Quiz</a>
            </div>
        );
    }
}

export default QuizEnd;