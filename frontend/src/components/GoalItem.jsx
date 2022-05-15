import React from 'react';
import runner from '../assets/runner.png'

const GoalItem = ({goal, runs}) => {
    const date = new Date()
    const year = date.getFullYear()
    const monthName = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'November', 'December']

    const runYears = [];

    runs.map(run => {
        const date = new Date(run.date)
        const year = date.getFullYear()
        !runYears.includes(year) && runYears.push(year)
        return run
    })

    // get start/end dates and percent of year to come
    const endYearDate = new Date(`${year}-12-31`)
    const startYearDate = new Date(`${year}-01-01`)
    const percentOfTheYearGone = Math.round(((date.getTime() - startYearDate.getTime()) * 100 / (endYearDate.getTime() - startYearDate.getTime())))
    const markerLeftYear = percentOfTheYearGone + '%'

    // styles for year runner marker
    const yearCompleteStyle = {
        left: markerLeftYear
    }

    // calculate the distance of each year
    const yearsWithDistance = runYears.map((year) => {

        let yearDate = new Date(`${year}-${date.getMonth() + 1}-${date.getDate()}`);

        const actualYearRuns = runs
            .filter(run => run.date.includes(`${year}-`))
            .filter(run => {
            let runDate = new Date(run.date);
            if (runDate < yearDate) return true
            else return false
        })

        let actualYearDistance = 0;
        let calculateGoalComplete = 0;

        for(let i = 0; i < actualYearRuns.length; i++){
            actualYearDistance += actualYearRuns[i].length
            calculateGoalComplete = Math.round((actualYearDistance * 100 / goal.amount))
            if(calculateGoalComplete > 100) calculateGoalComplete = 100
        }
        return {
            year,
            distance: actualYearDistance,
            goalComplete: calculateGoalComplete + '%',
            leftStyle: {left: calculateGoalComplete + '%'}
        }
    });

    const pastYearsDistance = yearsWithDistance.slice(1)

    return (
        <div className="goalItem">
            <div className="goalItemThisYear">
                <h3>{year} runs to {date.getDate()} {monthName[date.getMonth()]}</h3>
                <div className="goalStripe">
                    <div className="goalStripeOuter">
                        <p>{goal.amount} km</p>
                        <div style={yearsWithDistance[0].leftStyle} className="goalItemThisYearMarker goalMarker"><img src={runner} alt="runner_icon" /></div>
                    </div>
                </div>
            </div>
            <div className="goalItemActual">
                <h3>Goal {year} Pace (goal / percentage of the year elapsed)</h3>
                <div className="goalStripe">
                    <div className="goalStripeOuter">
                        <div style={yearCompleteStyle} className="goalItemActualMarker goalMarker"><img src={runner} alt="runner_icon" /></div>
                    </div>
                </div>
            </div>
            <h3>Past years ghosts (see how you ran in previous years against this year's goal)</h3>
            <div>
                {pastYearsDistance.map((year, index) => (
                    <div key={year.year}>
                        <div className="goalItem">
                            <p>{year.year} runs to {date.getDate()} {monthName[date.getMonth()]}: {`${Math.round(year.distance)}`} km</p>
                        </div>
                        <div className="goalStripe">
                            <div className="goalStripeOuter">
                                <p>{goal.amount} km</p>
                                <div style={year.leftStyle} className="goalItemActualMarker goalMarker"><img src={runner} alt="runner_icon" /></div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
     );
}

export default GoalItem;