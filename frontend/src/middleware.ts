import { NextResponse } from 'next/server'

const isAuthenticated: boolean = false;

export function middleware(request: Request){
    if(!isAuthenticated && request.url == "http://localhost:3000/signup"){
        return NextResponse.redirect(new URL("/login", request.url));
    }
}