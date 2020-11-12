import React from 'react'
import classes from './ActiveQuize.module.css'
import AnswersList from './AnswersList/AnswersList'

const ActiveQuize = props => (

<div className={classes.ActiveQuize}>
    <p className={classes.Question}>
        <span>
            <strong>{props.answerNumber}.</strong>&nbsp; 
            {props.question}
        </span>
        <small>{props.answerNumber} из {props.quizLenght}</small>
    </p>
    <AnswersList 
        state={props.state}
        answers={props.answers}
        onAnswerClick={props.onAnswerClick}
    />
</div>
)


export default ActiveQuize