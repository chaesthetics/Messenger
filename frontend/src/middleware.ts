'use client'
import { NextResponse } from 'next/server';
import { useEffect } from 'react'; 
import useAuth from './hooks/useAuth';

export function middleware(request: Request){
    const {isAuthenticated} = useAuth();
    console.log("Authenticated ba? ",isAuthenticated);
    if(!isAuthenticated){
        return NextResponse.redirect(new URL('/login', request.url));
    }
    return NextResponse.next();
}

export const config = {
    matcher: ['/', '/profile','/home'],
}