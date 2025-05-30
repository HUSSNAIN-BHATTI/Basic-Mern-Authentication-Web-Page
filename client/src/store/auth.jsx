import { createContext ,useContext, useEffect, useState } from "react";

export const AuthContext = createContext();

 export const AuthProvider = ({children})=> {
    const [token,setToken] = useState(localStorage.getItem("token"));
    const [user , setUser] = useState("");
    const [isloading , setIsLoading] = useState(true);
    const [services , setServices] = useState("");
    const AuthorizationToken = `${token}`;

    const storetokenInLS =(serverToken) =>{
        setToken(serverToken);        
        return localStorage.setItem("token",serverToken);
    };

    let isLoggedIn = !!token;

    const clearForm =()=>{
         setForm({
      username: "",
      email: "",
      message: "",
    });
        
    };
    

    const LogoutUser =()=>{
        setToken("");
        return localStorage.removeItem("token");
    };

    const userAuthentication = async ()=>{
    try {
        setIsLoading(true);
        const response = await fetch(`http://localhost:3000/api/auth/user`,{
            method:'GET',
            headers: {
                Authorization: AuthorizationToken,
            },
        });
        if(response.ok){
            const data= await response.json();
            console.log("curent user", data.userData);
            setUser(data.userData);
            setIsLoading(false);
        }   
        else{
            setIsLoading(false);
        }
    }
    catch (error)
    {
        console.error("error fetching user");
    }
};

const getServices = async ()=>{
    try {
        const response = await fetch(`http://localhost:3000/api/data/service`,{
            method:'GET',
        });
        if(response.ok) {
            const data = await response.json();
            console.log(data.msg);
            setServices(data.msg);
        }
        
    } catch (error) {
        console.log(`services frontend errror ${error}`);
        
        
    }
}

    //jwt authentication cuurent user data
useEffect(()=>{
    getServices();
    userAuthentication();    
},[]);

    return (<AuthContext.Provider value={{isLoggedIn,LogoutUser,storetokenInLS,user, services ,AuthorizationToken,isloading}}>
        {children}
    </AuthContext.Provider>
);
};







export const useAuth = () => {
    const authContextValue= useContext(AuthContext);
    if(!authContextValue){
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return authContextValue;
};