import axios from 'axios'

export default {
    passiveSearch(payload) {
        return axios.post('localhost', payload);
    }
}
