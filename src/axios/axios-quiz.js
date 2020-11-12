import axios from 'axios'

export default axios.create({
    baseURL: 'https://react-quiz-5fbcf.firebaseio.com/'
})