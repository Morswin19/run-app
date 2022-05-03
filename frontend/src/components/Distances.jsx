import React from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { deleteGoal } from '../features/goals/goalSlice'

const Distances = () => {
    const dispatch = useDispatch()

    const date = new Date()
    const year = date.getFullYear()

    const { runs, runsDistance } = useSelector((state) => state.runs)
    const { goals } = useSelector((state) => state.goals )

    const actualYearRuns = runs.filter(run => run.date.includes(`${year}-`));
    let actualYearDistance = 0;

    for(let i = 0; i < actualYearRuns.length; i++){
        actualYearDistance += actualYearRuns[i].length
    }

    return (
        <div className="distances">
                    <p>Whole distance<br/>{runsDistance} km</p>
                    <p>{year} distance<br/>{actualYearDistance} km</p>
                    <div>
                        {goals.map(goal => (
                            <div className="goalItem" key={goal._id}>
                                <p>{year} goal<br/>{`${goal.amount}`} km</p>
                                <button onClick={() => dispatch(deleteGoal(goal._id))} className="deleteBtn">Delete goal</button>
                            </div>
                        ))}
                    </div>
        </div>
     );
}
 
export default Distances;