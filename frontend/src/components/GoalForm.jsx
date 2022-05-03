import React from 'react';
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { createGoal } from '../features/goals/goalSlice.js'

const GoalForm = () => {
    const [amount, setAmount] = useState('')

    const dispatch = useDispatch()

    const onSubmit = e => {
        e.preventDefault()
        console.log('submit from goalForm')
        dispatch(createGoal({amount}))
        setAmount('')
    }

    return (
        <section className="form">
            <form onSubmit={onSubmit}>
                <div className="form-group">
                    <label htmlFor="amount">Goal</label>
                    <input placeholder="goal amount" type="number" name='amount' id="amount" value={amount} onChange={(e) => setAmount(e.target.value)}/>
                </div>
                <div className="form-group">
                    <button className="btn btn-block" type='submit'>Add year goal</button>
                </div>
            </form>
        </section>
     );
}

export default GoalForm;