import React from 'react';
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { createRun } from '../features/runs/runSlice'

const RunForm = () => {
    const [length, setLength] = useState('')
    const [date, setDate] = useState('')

    const dispatch = useDispatch()

    const onSubmit = e => {
        e.preventDefault()
        dispatch(createRun({length, date}))
        setLength('')
        setDate('')
    }

    return (
        <section className="form">
            <form onSubmit={onSubmit}>
                <div className="form-group">
                    <label htmlFor="length">Run</label>
                    <input placeholder="run length" type="number" name='length' id="length" value={length} onChange={(e) => setLength(e.target.value)}/>
                </div>
                <div className="form-group">
                    <label htmlFor="date">Date</label>
                    <input type="date" name='date' id="date" value={date} onChange={(e) => setDate(e.target.value)}/>
                </div>
                <div className="form-group">
                    <button className="btn btn-block" type='submit'>Add run (km)</button>
                </div>
            </form>
        </section>
     );
}

export default RunForm;