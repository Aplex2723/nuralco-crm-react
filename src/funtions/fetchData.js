import { SERVER } from "./config";
const axios = require('axios').default

export default function fetchData(url, method, data = '', headers) {
    return axios({
        method,
        url: `${SERVER}${url}`,
        data,
        headers
    }).then(response => response.data)

}