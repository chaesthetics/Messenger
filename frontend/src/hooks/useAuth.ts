'use server'
import { cookies } from 'next/headers'
import axios from "axios";

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

export const signIn = async(email: string, password: string) : Promise<{status: number, message: string, token: string | null}> => {
    try{
        const response = await axios.post(`${baseURL}/api/signin`, {email, password});
        const {status, message, token} = response.data;
        cookies().set('token', token);
        return {status, message, token};
    }catch(error: any){
        const status = typeof error === 'number' ? error : error?.response?.data.status || 500;
        const message = typeof error === 'string' ? error : error?.response?.data.message || 'An error occured';
        const token = null;
        return {status, message, token};
    }
}

export const logOut = () => {
    cookies().delete('token');
}

export const getAllUser = async()=> {
    try{
        const response = await axios.get(`${baseURL}/api/getUsers`);
        return response.data.data;
    }catch(error:any){
        const data = typeof error=== 'string' ? error : error?.response?.data.message || 'An error occured';
        return {data};
    }
}