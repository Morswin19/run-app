import axios from 'axios'

const API_URL = '/api/runs/'

//create new run
const createRun = async (runData, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    const response = await axios.post(API_URL, runData, config)

    return response.data
}

const runService = {
    createRun,
}

export default runService
