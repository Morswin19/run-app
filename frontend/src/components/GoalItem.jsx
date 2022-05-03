import React from 'react';
import runner from '../assets/runner.png'

const GoalItem = ({goal, runs}) => {
    const date = new Date()
    const year = date.getFullYear()

    const actualYearRuns = runs.filter(run => run.date.includes(`${year}-`));
    let actualYearDistance = 0;
    let markerLeftGoal = '';

    for(let i = 0; i < actualYearRuns.length; i++){
        actualYearDistance += actualYearRuns[i].length
    }

    let calculateGoalComplete = () => (actualYearDistance * 100 / goal.amount)

    markerLeftGoal = calculateGoalComplete()  + '%'
    if(calculateGoalComplete > 100) markerLeftGoal = '100%'


    // get start/end dates and percent of year to come
    const endYearDate = new Date(`${year}-12-31`)
    const startYearDate = new Date(`${year}-01-01`)
    const markerLeftYear = Math.round(((date.getTime() - startYearDate.getTime()) * 100 / (endYearDate.getTime() - startYearDate.getTime()))) + '%'
    if(calculateGoalComplete > 100) markerLeftGoal = '100%'

    // styles from year and goal completed stripes
    const goalCompleteStyle = {
        left: markerLeftGoal
    }
    const yearCompleteStyle = {
        left: markerLeftYear
    }


    return (
        <div className="goalItem">
            <div className="goalItemActual">
                <h3>Goal Tempo</h3>
                <div className="goalStripe">
                    <div className="goalStripeOuter">
                        <div style={yearCompleteStyle} className="goalItemActualMarker goalMarker"><img src={runner} alt="runner_icon" /></div>
                    </div>
                </div>
            </div>
            <div className="goalItemThisYear">
                <h3>Your Tempo</h3>
                <div className="goalStripe">
                    <div className="goalStripeOuter">
                        <p>{goal.amount} km</p>
                        <div style={goalCompleteStyle} className="goalItemThisYearMarker goalMarker"><img src={runner} alt="runner_icon" /></div>
                    </div>
                </div>
            </div>
            <div className="goalItemPast">
                <h3>Last Years Tempo</h3>
                <h3>This Year Distance = {actualYearDistance}</h3>
            </div>
        </div>
     );
}

export default GoalItem;