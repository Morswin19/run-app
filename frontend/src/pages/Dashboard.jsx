import React, { useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux'
import RunForm from '../components/RunForm'
import Spinner from '../components/Spinner'
import RunItem from '../components/RunItem'
import { getRuns, reset } from '../features/runs/runSlice'

const Dashboard = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const { user } = useSelector((state) => state.auth)
    const { runs, isLoading, isError, message } = useSelector((state) => state.runs)

    useEffect(() => {
        if(isError){
            console.log(message);
        }
        if(!user){
            navigate('/login')
        }

        dispatch(getRuns())

        return () => {
            dispatch(reset())
        }
    }, [user, navigate, isError, message, dispatch])

    if(isLoading){
        return <Spinner />
    }

    return (
        <>
            <section className="heading">
                <h1>Welcome {user && user.name}</h1>
                <p>Runs Dashboard</p>
            </section>
            <RunForm />
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