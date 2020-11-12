import React, { Component } from 'react'
import classes from './Quiz.module.css'
import ActiveQuize from '../../components/ActiveQuize/ActiveQuize'
import FinishedQuiz from '../../components/FinishedQuiz/FinishedQuiz'
import axios from '../../axios/axios-quiz'
import Loader from '../../components/UI/Loader/Loader'

class Quiz extends Component {

    state = {
        results: {}, // {[id]: success error}
        isFinished: false,
        header: 'Ответьте на вопросы',
        activeQuestion: 0,
        answerState: null, //
        quiz: [],
        loading: true
    }

    

    onAnswerClickHandler = (AnswerId) => {
        if (this.state.answerState) {
            const key = Object.keys(this.state.answerState)[0] 
            if (this.state.answerState[key] === 'success') {
                return
            }
        }
        
        const question = this.state.quiz[this.state.activeQuestion]
        const results = this.state.results

        if (question.rightAnswerId === AnswerId) {
            if (!results[question.id]) {
                results[question.id] = 'success'
            }

            this.setState({
                answerState: {[AnswerId]: 'success'},
                results
            })
            
            const timeout = window.setTimeout(() => {
                
                if (this.isQuizFinished()) {
                    this.setState({
                        isFinished: true
                    })
                } else {
                        this.setState({
                            activeQuestion: this.state.activeQuestion + 1,
                            answerState: null
                        })
                }
                window.clearTimeout(timeout)
                }, 1000)
        
            
            } else {
                results[question.id] = 'error'
                this.setState({
                    answerState: {[AnswerId]: 'error',
                    results
                    }
                })
            }
            
}

    isQuizFinished() {
        return this.state.activeQuestion + 1 === this.state.quiz.length
    }

    retryHandler = () => {
        this.setState({
            activeQuestion: 0,
            isFinished: false,
            answerState: null,
            results: {}
        })
    }
    
    async componentDidMount() {
        try {
            const response = await axios.get(`/quizes/${this.props.match.params.id}.json`)
            const quiz = response.data

            this.setState({
                quiz,
                loading: false
            })
        } catch (e) {
            console.log(e)
        }


        console.log('Quiz ID = ', this.props.match.params.id)
    }

    render() {
        return (
            <div className={classes.Quiz}>
                <div className={classes.QuizWrapper}>
                    <h1>Ответьте на вопросы</h1>

                    {
                        this.state.loading
                         ? <Loader />
                         : this.state.isFinished
                            ? <FinishedQuiz
                              results={this.state.results}
                              quiz={this.state.quiz}
                              onRetry={this.retryHandler}
                            />
                            : <ActiveQuize 
                              answers={this.state.quiz[this.state.activeQuestion].answers}
                              question={this.state.quiz[this.state.activeQuestion].question}
                              onAnswerClick={this.onAnswerClickHandler}
                              quizLenght={this.state.quiz.length}
                              answerNumber={this.state.activeQuestion + 1}
                              state={this.state.answerState}
                            />
                    }

                    
                </div>
            </div>
        )
    }
}


export default Quiz