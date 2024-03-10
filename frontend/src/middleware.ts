'use client'

import { NextResponse, NextRequest } from 'next/server';
import { cookies } from 'next/headers';

export function middleware(request: NextRequest){

    const token = !!cookies().get('token');
   
    if(token){
        if(request.nextUrl.pathname =='/login' || request.nextUrl.pathname =='/signup'){
            return NextResponse.redirect(new URL('/home', request.url));
        }else{
            return NextResponse.next();
        }
    }else{
        if(request.nextUrl.pathname == '/login' || request.nextUrl.pathname == '/signup'){
            return NextResponse.next();
        }
        return NextResponse.redirect(new URL('/login', request.url));
    }
}

export const config = {
    matcher: ['/', '/profile','/home','/login', '/signup'],
}