'use server'
import { NextResponse } from 'next/server';
import { cookies } from 'next/headers'

export function middleware(request: Request){

    const token = cookies().get('token');

    if(!token){
        return NextResponse.redirect(new URL('/login', request.url));
    }
    return NextResponse.next();
}

export const config = {
    matcher: ['/', '/profile','/home'],
}