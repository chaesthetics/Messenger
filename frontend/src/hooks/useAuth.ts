import axios from "axios";
import { useState } from "react";

const baseURL = 'http://127.0.0.1:8000';

export const signUp = async(firstname: string, lastname: string, email: string, password: string): Promise<{message: string, status: number}> => {
    try{
        const response = await axios.post(`${baseURL}/api/register`, {firstname, lastname, email, password});
        const {message, status} = response.data;
        return { message, status };
    }catch(error: any){
        const message = typeof error === 'string' ? error : error?.response?.data.message || 'An error occured'; 
        const status = error?.response?.data.status || 500;
        return { message, status };
    }
}

// export const useAuth = () => {
//     if(localStorage.getItem("token") !== null)
// }