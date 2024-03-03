'use client'
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import { useRouter } from 'next/navigation';
import { usePathname } from 'next/navigation';


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
        localStorage.setItem('token', token);
        return {status, message, token};
    }catch(error: any){
        const status = typeof error === 'number' ? error : error?.response?.data.status || 500;
        const message = typeof error === 'string' ? error : error?.response?.data.message || 'An error occured';
        const token = null;
        return {status, message, token};
    }
}

export const getToken = (): string | null => {
    return localStorage.getItem('token');
  };
  

export const useAuth = () => {
    const router = useRouter();
    const currentPath = usePathname();

    const [isAuthenticated, setIsAuthenticated] = useState(false);
    
    useEffect(()=>{
        const checkAuthentication = async () => {
            const isAuthenticated = !!getToken(); // Convert the token value to a boolean
            if (!isAuthenticated && !(currentPath == '/auth/login' || currentPath == '/auth/signup')) {
              router.push('/auth/login');
            }
            setIsAuthenticated(isAuthenticated); // Update the state with the authentication status
        };
      
        checkAuthentication();
    }, [router, currentPath]);

    return { isAuthenticated };
};