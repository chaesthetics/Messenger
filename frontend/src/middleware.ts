import { NextResponse } from 'next/server'

const isAuthenticated: boolean = false;

export function middleware(request: Request){
    if(!isAuthenticated){
        return NextResponse.redirect(new URL('/login', request.url));
    }
    return NextResponse.next();
}

export const config = {
    matcher: ['/', '/profile'],
}