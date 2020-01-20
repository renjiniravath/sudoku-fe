import axios from 'axios';
import Promise from 'bluebird';

const API_ROOT = "http://api-root.in"

export default function fetch(options) {
    return new Promise((resolve, reject) => {
        axios({
            url: API_ROOT + options.url,
            method: options.method,
            params: options.params,
            data: options.body,
        }).then((response) => {
            resolve(response.data)
        }).catch((e) => {
            reject(e);
        })
    })
}