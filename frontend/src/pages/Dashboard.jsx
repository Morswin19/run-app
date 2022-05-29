import React, { useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux'
import RunForm from '../components/RunForm'
import Spinner from '../components/Spinner'
import RunItem from '../components/RunItem'
import Distances from '../components/Distances'
import YearsDistance from '../components/YearsDistance'
import { getRuns, reset } from '../features/runs/runSlice'
import { getGoals, goalReset } from '../features/goals/goalSlice'

const Dashboard = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const { user } = useSelector((state) => state.auth)
    const { runs, runsSortByDate, isLoading, isError, message} = useSelector((state) => state.runs)
    const { goals } = useSelector((state) => state.goals )
    const [ showAllRuns, setShowAllRuns ] = useState(false)

    useEffect(() => {
        if(isError){
            console.log(message);
        }
        if(!user){
            navigate('/login')
        }

        dispatch(getRuns())
        dispatch(getGoals())

        return () => {
            dispatch(reset())
            dispatch(goalReset())
        }
    }, [user, navigate, isError, message, dispatch])

    if(isLoading){
        return <Spinner />
    }

    return (
        <>
            <section className="heading">
                <h1>Welcome {user && user.name}</h1>
                <div className="numbers runNumbers">
                    <Distances goals={goals} runs={runsSortByDate}/>
                </div>
            </section>
            <RunForm />
            <h3>{!showAllRuns ? 'Your last runs' : 'Your runs'}</h3>
            <section className="content">
                {runs.length <= 0
                ?
                (<h3>You do not have runs</h3>)
                :
                showAllRuns
                ?
                (
                    <div className="runs">
                        {runs.map(run => (
                            <RunItem key={run._id} run={run}/>
                        ))}
                    </div>
                )
                :
                    <div className="runs">
                        {runs.map(run => (
                            <RunItem key={run._id} run={run}/>
                        )).filter((run, index) => index < 4)}
                    </div>
                }
                <button onClick={() => setShowAllRuns(!showAllRuns)} className="btn">{!showAllRuns ? 'Show all runs' : 'Show only last runs'}</button>
            </section>
            <section>
                <YearsDistance />
            </section>
        </>
     );
}

export default Dashboard;