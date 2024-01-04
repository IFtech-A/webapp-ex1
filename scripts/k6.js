import http from 'k6/http'
import {check} from 'k6'

export const options = {
    thresholds: {
        http_req_failed: ['rate<=0.5']
    }
}

export default function() {
    const url = 'http://localhost:3000/1/-2'

    const res = http.post(url)

    check(res, {
        'response code was 200': (res) => res.status == 200,
    })
}