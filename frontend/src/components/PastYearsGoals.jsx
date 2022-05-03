import React from 'react';
import { useSelector } from 'react-redux'

const YearsDistance = () => {
    const { runs } = useSelector((state) => state.runs)

    const runYears = [];

    runs.map(run => {
        const date = new Date(run.date)
        const year = date.getFullYear()
        !runYears.includes(year) && runYears.push(year)
    })

    const yearsWithDistance = runYears.map((year) => {
        const actualYearRuns = runs.filter(run => run.date.includes(`${year}-`));
        let actualYearDistance = 0;

        for(let i = 0; i < actualYearRuns.length; i++){
            actualYearDistance += actualYearRuns[i].length
        }
        return {year, distance: actualYearDistance}
    });

    return (
        <div>
            <div className="years content">
                {yearsWithDistance.map(year => (
                    <div className="goal">
                        <div>{year.year}</div>
                        <h2>{year.distance}</h2>
                    </div>
                ))}
            </div>
        </div>
     );
}
 
export default YearsDistance;