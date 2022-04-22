import React, { useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux'
import RunForm from '../components/RunForm'

const Dashboard = () => {
    const navigate = useNavigate()

    const { user } = useSelector((state) => state.auth)

    useEffect(() => {
        if(!user){
            navigate('/login')
        }
    }, [user, navigate])

    return ( 
        <>
            <section className="heading">
                <h1>Welcome {user && user.name}</h1>
                <p>Runs Dashboard</p>
            </section>
            <RunForm />
        </>
     );
}
 
export default Dashboard;