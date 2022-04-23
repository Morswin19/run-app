import React from 'react';
import {useDispatch} from 'react-redux'
import {deleteRun} from '../features/runs/runSlice'


const RunItem = ({run}) => {
    const dispatch = useDispatch()

    return ( 
        <div className="goal">
            <div>{run.date}</div>
            <h2>{run.length}</h2>
            <button onClick={() => dispatch(deleteRun(run._id))} className="close">X</button>
        </div>
     );
}
 
export default RunItem;