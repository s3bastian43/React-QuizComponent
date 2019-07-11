import React, {Component} from 'react';
import QuizQuestionButton from "./QuizQuestionButton";

class QuizQuestion extends Component {
    handleClick(buttonText) {
        this.props.checkAnswerHandler(buttonText)
    }

    render() {
        return (
            <main>
                <h3>
                    {
                        'Q' + (this.props.currentPosition + 1) + '/' + this.props.questionsLength
                    }
                </h3>
                <section>
                    <p>{decodeURIComponent(this.props.quiz_question.question)}</p>
                </section>
                <section className="answers">
                    <ul>
                        {
                            this.props.quiz_question.incorrect_answers.map((answer_option, index) =>
                                <QuizQuestionButton button_text={answer_option} key={index} clickHandler={this.handleClick.bind(this)}/>
                            )
                        }
                    </ul>
                </section>

      {/*          {this.props.incorrectAnswer ?
                    <div className="alert alert-danger mt-3" role="alert">
                         Sorry, that's not right
                    </div>
                : null}*/}


            </main>
        );
    }
}

export default QuizQuestion;