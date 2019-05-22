import React, {Component} from 'react';
import QuizQuestionButton from "./QuizQuestionButton";
import {shuffle} from './functions';

class QuizQuestion extends Component {
    constructor(props) {
        super(props);
        this.state= {
            incorrectAnswer: false,
            correctAnswers: this.props.correctAnswers,
            wrongAnswers: this.props.wrongAnswers,
        }
    }

    // TODO: Lift the state up to use it in quiz end

    handleClick(buttonText) {
        if(buttonText === this.props.quiz_question.correct_answer) {
            this.props.showNextQuestionHandler();
            this.setState(state => {
                return {
                    incorrectAnswer: false,
                    correctAnswers: state.correctAnswers + 1
                }
            })
        } else {
            this.setState(state => {
                return {
                    incorrectAnswer: true,
                    wrongAnswers: state.wrongAnswers + 1
                }
            })
        }

    }
    render() {
        if(!this.state.incorrectAnswer) {
            this.props.quiz_question.incorrect_answers.push(this.props.quiz_question.correct_answer);
            this.props.quiz_question.incorrect_answers = shuffle(this.props.quiz_question.incorrect_answers);
        }
        return (
            <main>
                <section>
                    <p>{this.props.quiz_question.question}</p>
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
                {this.state.correctAnswers + ' ' + this.state.wrongAnswers}

                {this.state.incorrectAnswer ?
                    <div className="alert alert-danger mt-3" role="alert">
                         Sorry, that's not right
                    </div>
                : null}


            </main>
        );
    }
}

export default QuizQuestion;