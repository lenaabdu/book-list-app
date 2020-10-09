import axios from 'axios'
//const url = 'http://localhost:3004/'
const url = 'https://book-list-api.herokuapp.com/'

export class ApiClient {

    apiCall(method, url, data) {
        return axios({
            method,
            url,
            data
        })
    }

    getbooks() {
        return this.apiCall('get', `${url}books`)
    }

    addbook(title, author, read, uri) {
        return this.apiCall('post', `${url}book/create`, { title, author, read, uri })
    }

    removebook(id) {
        return this.apiCall('delete', `${url}book/${id}`)
    }

    updatebook(id, title, author, read, uri) {
        return this.apiCall('put', `${url}book/${id}`, { title, author, read, uri })
    }
}