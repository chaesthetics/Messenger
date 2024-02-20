import axios from "axios";
import { useState } from "react";

const baseURL = 'http://127.0.0.1:8000';

export const signUp = async(firstname: string, lastname: string, email: string, password: string): Promise<{message: string}> => {
    try{
        const response = await axios.post(`${baseURL}/api/register`);
        const {message} = response.data;
        console.log("message: ", response.data);
        return {message};
    }catch(error: any){
        const message = typeof error === 'string' ? error : error?.response?.data.message || 'An error occured'; 
        return {message};
    }
}