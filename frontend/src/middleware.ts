import { NextResponse } from 'next/server'
import { useAuth } from './hooks/useAuth';


const isAuthenticated = useAuth();

export function middleware(request: Request){
    if(!isAuthenticated){
        return NextResponse.redirect(new URL('/login', request.url));
    }
    return NextResponse.next();
}

export const config = {
    matcher: ['/', '/profile','/home'],
}