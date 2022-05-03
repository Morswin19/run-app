import React, { useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux'
import GoalForm from '../components/GoalForm'
import Spinner from '../components/Spinner'
import GoalItem from '../components/GoalItem'
import Distances from '../components/Distances'
import { getRuns, reset } from '../features/runs/runSlice'
import { getGoals, goalReset } from '../features/goals/goalSlice'

const GoalDashboard = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const { user } = useSelector((state) => state.auth)
    const { runs, isLoading, isError, message } = useSelector((state) => state.runs)
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
                <div className="numbers goalNumbers">
                    <Distances goals={goals} runs={runs}/>
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
            {goals.length > 0
            ?
            <h3 className="content">You can only have one year goal. If you want to set new, please delete the exist one</h3>
            :
            <GoalForm />
            }
        </>
     );
}
 
export default GoalDashboard;