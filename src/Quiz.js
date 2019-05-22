import React, {Component} from 'react';
import QuizQuestion from "./QuizQuestion";
import QuizEnd from "./QuizEnd";
import axios from 'axios';

class Quiz extends Component {
    constructor(props) {
        super(props);
        this.state = {
            quiz_position: 1,
            questions: [],
            correctAnswers: 0,
            wrongAnswers: 0
            }
    }

    componentDidMount() {
        axios.get(`https://opentdb.com/api.php?amount=10&category=22&difficulty=easy&type=multiple`)
            .then(res => {
                const questions = [];
                res.data.results.map(question => {
                    questions.push(question);
                });
                this.setState({ questions });
            })
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

        return (
            <div className="container py-4">
                <div className="row">
                    <div className="col-12">
                        <h1>Trivia</h1>

                        {this.state.questions.length > 0 &&
                        (isQuizEnd ?
                            <QuizEnd resetClickHandler={this.handleResetClick.bind(this)} correctAnswers={this.state.correctAnswers}/>
                            :

                                    <QuizQuestion quiz_question={this.state.questions[this.state.quiz_position - 1]}
                                                  correctAnswers={this.state.correctAnswers}
                                                  wrongAnswers={this.state.wrongAnswers}
                                                  showNextQuestionHandler={this.showNextQuestion.bind(this)}
                                    />
                        )
                        }

                    </div>
                </div>
            </div>

        );
    }
}

export default Quiz;