import React from "react";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import Link from "next/link";

const logInPage = () => {
    return (
        <div>
            <Navbar />
            <div className="grid grid-cols-8 w-full">
                <div className="col-span-4 px-16 py-10 space-y-8">
                    <div>
                        <p className="bg-gradient-to-r from-red-900 via-blue-900 to-violet-900 inline-block text-transparent bg-clip-text font-semibold text-[80px] leading-none">Hang out</p>
                        <p className="bg-gradient-to-r from-red-900 via-blue-900 to-violet-900 inline-block text-transparent bg-clip-text font-semibold text-[80px] leading-none">anytime, </p>
                        <p className="bg-gradient-to-r from-red-900 via-blue-900 to-violet-900 inline-block text-transparent bg-clip-text font-semibold text-[80px] leading-none">anywhere</p>
                    </div>
                    <div className="text-lg text-gray-600 px-1">
                        <p>Messenger makes it easy and fun to stay close to your</p>
                        <p>favorite people.</p>
                    </div>
                    <div className="LoginForm flex flex-col space-y-3 w-4/6 px-2 mt-[10px]">
                        <input className="bg-gray-100 text-lg font-light rounded-lg px-4 py-1 focus:outline-none focus:ring-1" placeholder="Email or phone number" type="text"/>
                        <input className="bg-gray-100 text-lg font-light rounded-lg px-4 py-1 focus:outline-none focus:ring-1" placeholder="Password" type="password"/>
                        <div className="flex mt-[20px] items-center justify-between">
                            <button className="px-6 py-3 rounded-full bg-blue-900 text-md text-white font-bold hover:bg-violet-900">Log in</button>
                            <Link href="/signup" className="text-md font-semibold text-blue-800 hover:underline hover:cursor-pointer">Create an account?</Link>
                        </div>
                    </div>
                </div>
                <div className="col-span-4 px-16 py-10 items-center flex justiy-center h-[500px] mr-10">
                    <img src={'/default.jpg'} alt="alt" className="w-full shadow-2xl rounded-xl"/>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default logInPage;