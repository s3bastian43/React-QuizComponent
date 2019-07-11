import React, {Component} from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom'

class QuizCategories extends Component {
    constructor(props) {
        super(props);
        this.state = {
            categories: [],
        }
    }

    componentDidMount() {
        axios.get(`https://opentdb.com/api_category.php`)
            .then(res => {
                const categories = []
                res.data.trivia_categories.map(category => {
                    return categories.push(category);
                });
                this.setState({categories})
            })
            .catch(err => {
                console.log(err)
            })
    }

    render() {
        return (
            <div className="container py-4">
                <div className="row">
                    {
                        this.state.categories.map((category) =>
                            <div className="col-3 mb-3">
                                <Link to={'/quiz/' + category.id} className="quiz-category">{category.name}</Link>
                            </div>
                        )
                    }
                </div>
            </div>
        );
    }
}

export default QuizCategories;