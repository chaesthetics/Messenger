'use server'
import { cookies } from 'next/headers'
import axios from "axios";

const baseURL = process.env.NEXT_PUBLIC_API_URL;

export const signUp = async(firstname: string, lastname: string, email: string, password: string): Promise<{message: string, status: number}> => {
    try{
        const data = {
            "firstname": firstname,
            "lastname": lastname,
            "email": email,
            "password": password,
        }
        const response = await axios.post(`${baseURL}/api/register`, data);
        const {message, status} = response.data;
    
        return { message, status };
    }catch(error: any){
        const message = typeof error === 'string' ? error : error?.response?.data.message || 'An error occured'; 
        const status = error?.response?.data.status || 500;
        return { message, status };
    }
}

export const signIn = async(email: string, password: string) : Promise<{status: number, message: string, token: string | null, userData: Object | null}> => {
    try{
        const response = await axios.post(`${baseURL}/api/signin`, {email, password});
        const {status, message, token, userData} = response.data;
        cookies().set('token', token);
        cookies().set('userId', userData.id);
        
        return {status, message, token, userData};
    }catch(error: any){
        const status = typeof error === 'number' ? error : error?.response?.data.status || 500;
        const message = typeof error === 'string' ? error : error?.response?.data.message || 'An error occured';
        const token = null;
        const userData = null;

        return {status, message, token, userData};
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

export const getConversations = async(userinfo_id: number) => {
    try{
        const response = await axios.get(`${baseURL}/api/getConversations/${userinfo_id}`);
        return response.data.conversations;
    }catch(error:any){
        return error;
    }
}

export const getMessages = async(conversation_id: number) => {
    try{
        const response = await axios.get(`${baseURL}/api/getMessages/${conversation_id}`);
        return response.data.messages;
    }catch(error:any){
        return error;
    }
}

export const createMessage = async(conversation_id: any, sender_id: number, content: string) => {
    try{
        const response = await axios.post(`${baseURL}/api/createMessage`, {
            "conversation_id" : conversation_id,
            "sender_id" : sender_id,
            "content" : content
        })
        return response.data;
    }catch(error:any){
        return error;
    }
}

export const searchUsers = async(userName: string) => {
    try{
        const response = await axios.get(`${baseURL}/api/searchUser`, {
            params: {
                userName: userName
            }
        });

        return response.data.users;
    } catch(error:any){
        console.log(error);
        return [];
    }
}