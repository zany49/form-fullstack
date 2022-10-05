import {useState, createContext, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/router";



const UserContext = createContext();

const UserProvider=({ children })=>{
    const[state,setState] = useState({
        user:{},
        token:"",
    });

    useEffect(()=>{
    setState(JSON.parse(window.localStorage.getItem("auth"))); 
     
    },[])

    const router = useRouter();


    const token = state && state.token ? state.token : "" ;
    axios.defaults.baseURL = "http://localhost:8000/form";
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

 
    //to force logout in expiring of jwt
    axios.interceptors.response.use(
        function(response) {
            return response;
        
    }, 
    function(error){

        let response= error.response;
        if(response.status === 401 && response.config && !response.config.__isRetryRequest){
            setState(null);
            window.localStorage.removeItem("auth");
            router.push("/login");
        }
    
}

    );



    return(
        <UserContext.Provider value={[state , setState]}>
        {children}
        </UserContext.Provider>
    )


}

export {UserContext, UserProvider}