import axios from "axios";

axios.interceptors.request.use(function(config){
    const token = localStorage.getItem("token")
    if(token){
        const parse =JSON.parse(token) ;
        config.headers.Authorization = `Bearer ${parse}`

    }

return config
});