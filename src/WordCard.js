import React, { useState } from "react";
import CharacterCard from "./CharacterCard";
import _ from 'lodash';

const prepareStateFromWord = (given_word) => {
    let word = given_word.toUpperCase()
    let chars = _.shuffle(Array.from(word))
    return {
        word,
        chars,
        attempt: 1,
        guess: '',
        completed: false
    }
}

export default function WordCard(props) {

    const [state, setState] = useState(prepareStateFromWord(props.value))

    const activationHandler = (c) => {
        console.log(`${c} has been activated.`)

        let guess = state.guess + c
        setState({...state, guess: guess})

        if(guess.length === state.word.length) {
            if(guess === state.word) {
                console.log('yeah!')
                setState({...state, guess: '', completed: true})
                console.log(`Completed in ${state.attempt} ${state.attempt === 1 ? 'attempt' : 'attempts'}.`)
            }
            else {
                console.log('reset, next attempt')
                setState({...state, guess: '', attempt: state.attempt + 1})
                console.log(`attempt: ${state.attempt + 1}`)
            }
        }
    }
    const deActivationHandler = (c) => {
        console.log(`${c} has been deactivated.`)
        setState({...state, guess: state.guess.slice(0, -1)})
    }
    const text = `Total Attempt: ${state.attempt}`
    return (
        <div>
            {
                state.chars.map((c, i) => <CharacterCard value={c} key={i} activationHandler={activationHandler} deActivationHandler={deActivationHandler} attempt={state.attempt}/>)
            }
            <h2 className="centerText">{text}<br/>{state.completed ? 'YAY!':''}</h2>
        </div>
    )
}