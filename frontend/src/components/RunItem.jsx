import React from 'react';
import {useDispatch} from 'react-redux'
import {deleteRun} from '../features/runs/runSlice'


const RunItem = ({run}) => {
    const dispatch = useDispatch()
    const runDate = new Date(run.date)
    const runYear = runDate.getFullYear()
    const runMonth = runDate.getMonth() + 1
    const runDay = runDate.getDate()

    return ( 
        <div className="goal">
            <div>{runYear}-{runMonth}-{runDay}</div>
            <h2>{run.length} km</h2>
            <button onClick={() => dispatch(deleteRun(run._id))} className="close">X</button>
        </div>
     );
}
 
export default RunItem;