import React, {Component} from 'react';
import QuizQuestion from "./QuizQuestion";
import QuizEnd from "./QuizEnd";
import axios from 'axios';
import {shuffle} from "./functions";
import CircularProgress from "@material-ui/core/CircularProgress";

class Quiz extends Component {
    constructor(props) {
        super(props);
        this.state = {
            quiz_position: 1,
            questions: [],
            incorrectAnswer: false,
            correctAnswers: 0,
            wrongAnswers: 0
        }
    }

    componentDidMount() {
        axios.get(`https://opentdb.com/api_token.php?command=request`)
            .then(res => {
                return axios.get(`https://opentdb.com/api.php?amount=2&token=${res.data.token}&category=22&difficulty=easy&type=multiple`)
            })
            .then(res => {
                const questions = []
                res.data.results.map(question => {
                    return questions.push(question);
                });
                this.setState({questions})
            })
            .catch(err => {
                console.log(err)
            })
    }

    checkAnswer(buttonText) {
        if (buttonText === this.state.questions[this.state.quiz_position - 1].correct_answer) {
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
        this.showNextQuestion();


    }

    showNextQuestion() {
        this.setState(state => {
            return {quiz_position: state.quiz_position + 1}
        })
    }

    handleResetClick() {
        this.setState(_ => {
            return {
                quiz_position: 1,
                questions: []
            }
        })
    }


    render() {
        const isQuizEnd = ((this.state.quiz_position - 1) === this.state.questions.length);
        let currentPosition = this.state.quiz_position - 1;

        if (this.state.questions.length > 0 && !isQuizEnd) {
            this.state.questions[this.state.quiz_position - 1].incorrect_answers.push(this.state.questions[this.state.quiz_position - 1].correct_answer);
            this.state.questions[this.state.quiz_position - 1].incorrect_answers = shuffle(this.state.questions[this.state.quiz_position - 1].incorrect_answers);
        }
        return (
            <div className="container py-4">
                <div className="row">
                    <div className="col-12">
                        <h1>Trivia Game</h1>

                        {this.state.questions.length > 0 ?

                            (isQuizEnd ?
                                    <QuizEnd resetClickHandler={this.handleResetClick.bind(this)}
                                             correctAnswers={this.state.correctAnswers}
                                             wrongAnswers={this.state.wrongAnswers}
                                             questionsLength={this.state.questions.length}
                                    />
                                    :

                                    <QuizQuestion quiz_question={this.state.questions[currentPosition]}
                                                  correctAnswers={this.state.correctAnswers}
                                                  wrongAnswers={this.state.wrongAnswers}
                                                  incorrectAnswer={this.state.incorrectAnswer}
                                                  currentPosition={currentPosition}
                                                  checkAnswerHandler={this.checkAnswer.bind(this)}
                                                  questionsLength={this.state.questions.length}
                                                  showNextQuestionHandler={this.showNextQuestion.bind(this)}
                                    />
                            )
                            :
                            <div className="d-flex align-items-center justify-content-center loading-container">
                                <CircularProgress/>
                            </div>
                        }

                    </div>
                </div>
            </div>

        );
    }
}

export default Quiz;