import React, { Component } from 'react'
import classes from './Quiz.module.css'
import ActiveQuize from '../../components/ActiveQuize/ActiveQuize'
import FinishedQuiz from '../../components/FinishedQuiz/FinishedQuiz'
import Loader from '../../components/UI/Loader/Loader'
import { connect } from 'react-redux';
import { fetchQuizById, answerClick, retryQuiz } from '../../store/actions/quiz';

class Quiz extends Component {
    
    componentDidMount() {
        this.props.fetchQuizById(this.props.match.params.id)
    }

    componentWillUnmount() {
        this.props.retryQuiz()
    }

    render() {
        return (
            <div className={classes.Quiz}>
                <div className={classes.QuizWrapper}>
                    <h1>Ответьте на вопросы</h1>

                    {
                        this.props.loading || !this.props.quiz
                         ? <Loader />
                         : this.props.isFinished
                            ? <FinishedQuiz
                              results={this.props.results}
                              quiz={this.props.quiz}
                              onRetry={this.props.retryQuiz}
                            />
                            : <ActiveQuize 
                              answers={this.props.quiz[this.props.activeQuestion].answers}
                              question={this.props.quiz[this.props.activeQuestion].question}
                              onAnswerClick={this.props.answerClick}
                              quizLenght={this.props.quiz.length}
                              answerNumber={this.props.activeQuestion + 1}
                              state={this.props.answerState}
                            />
                    }

                    
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        results: state.quiz.results,
        isFinished: state.quiz.isFinished,
        header: state.quiz.header,
        activeQuestion: state.quiz.activeQuestion,
        answerState: state.quiz.answerState,
        quiz: state.quiz.quiz,
        loading: state.quiz.loading,
    }
}

function mapDispathToProps(dispatсh) {
    return {
        fetchQuizById: id => dispatсh(fetchQuizById(id)),
        answerClick: AnswerId => dispatсh(answerClick(AnswerId)),
        retryQuiz: () => dispatсh(retryQuiz())
    }
}


export default connect(mapStateToProps, mapDispathToProps)(Quiz) 