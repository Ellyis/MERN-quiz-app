import axios from 'axios';

export const BASE_URL = 'https://mern-quiz-app-server.vercel.app/';

export const ENDPOINTS = {
    PARTICIPANT: 'Participants',
    QUESTION: 'Questions',
    GETANSWERS: 'Questions/GetAnswers',
}

export const createAPIEndpoint = endpoint => {
    let url = BASE_URL + 'api/' + endpoint + '/';

    return {
        fetchAll: () => axios.get(url),
        fetchById: id => axios.get(url + id),
        post: newRecord => axios.post(url, newRecord),
        put: (id, updatedRecord) => axios.put(url + id, updatedRecord),
        delete: id => axios.delete(url + id),
    }
}