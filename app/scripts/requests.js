const axios = require('axios');

const instance = axios.create({baseURL: 'http://localhost:3035'})

function passiveSearch(req) {
    const params = {
        search: req
    }

    // let resp = axios.post('localhost:3035/search/passive/', params);
    let resp = await instance.post('/search/passive/', params).then((res)=>{
        console.log('request.data: ');
        console.log(res.data.data[0]);
        return res.data.data;
    });
}

async function activeSearch(req) {
    const params = {
        search: req
    }

    // let resp = axios.post('localhost:3035/search/active/', params);
    let resp = await instance.post('/', params).then((res)=>{
        console.log(res);
    });

    console.log(resp);
}

module.exports = {
    passiveSearch: passiveSearch,
    activeSearch: activeSearch
};