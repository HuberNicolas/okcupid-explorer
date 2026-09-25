import react from "react"
import axios from "axios"

export default function Service({method, url, data, params}){
    method = method | "GET"
    const baseURL = window.location.hostname ? "localhost" : "http://localhost:5000/" | window.location.hostname
    function requestEndpoint(method, url, data, params){
        axios({
            method: method | this.method,
            url: baseURL + url,
            data: data | {},
            params: params | {}
        });
    }

    function setFilter(data){
        requestEndpoint("POST", "filter", data)
    }

}

