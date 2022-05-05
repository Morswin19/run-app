import React from 'react';
import { useSelector } from 'react-redux'

const YearsDistance = () => {
    const { runsSortByDate } = useSelector((state) => state.runs)

    const runYears = [];

    runsSortByDate.map(run => {
        const date = new Date(run.date)
        const year = date.getFullYear()
        !runYears.includes(year) && runYears.push(year)
        return run
    })

    const yearsWithDistance = runYears.map((year) => {
        const actualYearRuns = runsSortByDate.filter(run => run.date.includes(`${year}-`));
        let actualYearDistance = 0;

        for(let i = 0; i < actualYearRuns.length; i++){
            actualYearDistance += actualYearRuns[i].length
        }
        return {year, distance: actualYearDistance}
    });

    return (
        <div className="yearsDistance">
            <h3>Total Distance By Year</h3>
            <div className="years content">
                {yearsWithDistance.map(year => (
                    <div className="goal" key={year.year}>
                        <div>{year.year}</div>
                        <h2>{year.distance}</h2>
                    </div>
                ))}
            </div>
        </div>
     );
}

export default YearsDistance;