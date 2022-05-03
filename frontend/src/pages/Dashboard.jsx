import React, { useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux'
import RunForm from '../components/RunForm'
import GoalForm from '../components/GoalForm'
import Spinner from '../components/Spinner'
import RunItem from '../components/RunItem'
import GoalItem from '../components/GoalItem'
import { getRuns, reset } from '../features/runs/runSlice'
import { getGoals, goalReset } from '../features/goals/goalSlice'

const Dashboard = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const { user } = useSelector((state) => state.auth)
    const { runs, isLoading, isError, message, runsDistance } = useSelector((state) => state.runs)
    const { goals } = useSelector((state) => state.goals )


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
                <div className="numbers">
                    <p>Whole distance<br/>{runsDistance} km</p>
                    <p>Year distance<br/>{runsDistance} km</p>
                    <div>
                        {goals.map(goal => (
                            <div className="goalItem">
                                <p>Year Goal<br/>{`${goal.amount}`} km</p>
                                <button className="deleteBtn">&gt;</button>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
            <section className="content">
                {runs.length > 0
                ?
                (
                    <div className="goals">
                        {goals.map(goal => (
                            <GoalItem key={goal._id} goal={goal} runs={runs}/>
                        ))}
                    </div>
                )
                :
                (<h3>You do not have goals</h3>)}
            </section>
            <RunForm />
            <GoalForm />
            <section className="content">
                {runs.length > 0
                ?
                (
                    <div className="runs">
                        {runs.map(run => (
                            <RunItem key={run._id} run={run}/>
                        ))}
                    </div>
                )
                :
                (<h3>You do not have runs</h3>)}
            </section>
        </>
     );
}
 
export default Dashboard;