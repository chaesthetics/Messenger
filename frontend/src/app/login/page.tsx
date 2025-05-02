'use client'
import { useState, useEffect } from "react";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import Link from "next/link";
import { signIn } from "@/hooks/useAuth";
import { useRouter } from 'next/navigation';
import FullPageLoader from "../components/fullpageloader";

const logInPage = () => {
    const router = useRouter();
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    
    const [alertMessage, setAlertMessage] = useState<string>("");
    const [status, setStatus] = useState<number>(0);
    const [isToastOpen, setIsToastOpen] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const onEmailChange = (event:any) => setEmail(event.target.value); 
    const onPasswordChange = (event: any) => setPassword(event.target.value);

    useEffect(()=> {
        const timer = setTimeout(() => {
            setIsToastOpen(false);
        }, 5000);

        return () => clearTimeout(timer);
    }, [isToastOpen]);

    const handleSignIn = async(event: React.FormEvent) => {
        setIsLoading(true);
        event.preventDefault();

        const {status, message, token, userData} = await signIn(email, password);
        setAlertMessage(message);
        setStatus(status);
        setIsToastOpen(true);
        localStorage.setItem('userInfo', JSON.stringify(userData));
        if(token){
            router.push('/home');
        }
        setIsLoading(false);
    }
    return (
        <main className="w-screen h-screen overflow-x-hidden overflow-y-auto">
            <Navbar />
            {
                isLoading && <FullPageLoader />
            }   
            {
                isToastOpen && (
                    status === 200 ? 
                    <div className="absolute bg-blue-100 bg-opacity-90 border border-blue-400 text-blue-700 px-4 py-3 rounded right-2 md:right-6 top-[100px] md:top-[120px]" role="alert">
                    <strong className="font-semibold text-sm pr-6">{alertMessage}</strong>
                    <span className="absolute top-0 bottom-0 right-0 px-4 py-3" onClick={() => setIsToastOpen(false)}>
                        <svg className="fill-current h-6 w-6 text-blue-500" role="button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                        <title>Close</title>
                        <path d="M14.348 5.652a1 1 0 10-1.414-1.414L10 7.172 7.066 4.238a1 1 0 00-1.414 1.414L8.586 8.586l-2.934 2.934a1 1 0 101.414 1.414L10 10.828l2.934 2.934a1 1 0 001.414-1.414L11.414 8.586l2.934-2.934z"/>
                        </svg>
                    </span>
                    </div>
                    :
                    <div className="absolute bg-red-100 bg-opacity-90 border border-red-400 text-red-700 px-4 py-3 rounded right-2 md:right-6 top-[100px] md:top-[120px]" role="alert">
                    <strong className="font-semibold text-sm pr-6">{alertMessage}</strong>
                    <span className="absolute top-0 bottom-0 right-0 px-4 py-3" onClick={() => setIsToastOpen(false)}>
                        <svg className="fill-current h-6 w-6 text-red-500" role="button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                        <title>Close</title>
                        <path d="M14.348 5.652a1 1 0 10-1.414-1.414L10 7.172 7.066 4.238a1 1 0 00-1.414 1.414L8.586 8.586l-2.934 2.934a1 1 0 101.414 1.414L10 10.828l2.934 2.934a1 1 0 001.414-1.414L11.414 8.586l2.934-2.934z"/>
                        </svg>
                    </span>
                    </div>
                )
            }
            <div className="grid grid-cols-4 md:grid-cols-8 w-full">
                <div className="col-span-4 flex flex-col items-center w-full h-full md:px-16 py-4 md:py-10 space-y-4 md:space-y-2">
                    <div className="text-center md:text-start">
                        <p className="tracking-normal hover:tracking-wide hover:ml-[-4px] animation-300 duration-300 bg-gradient-to-r from-red-900 via-blue-900 to-violet-900 inline-block text-transparent bg-clip-text font-semibold text-[60px] md:text-[80px] leading-[70px] md:leading-[100px]">Hang out</p>
                        <p className="tracking-normal hover:tracking-wide hover:ml-[-4px] animation-300 duration-300 bg-gradient-to-r from-red-900 via-blue-900 to-violet-900 inline-block text-transparent bg-clip-text font-semibold text-[60px] md:text-[80px] leading-[70px] md:leading-[100px]">anytime, </p>
                        <p className="tracking-normal hover:tracking-wide hover:ml-[-4px] animation-300 duration-300 bg-gradient-to-r from-red-900 via-blue-900 to-violet-900 inline-block text-transparent bg-clip-text font-semibold text-[60px] md:text-[80px] leading-[70px] md:leading-[100px]">anywhere</p>
                    </div>
                    <div className="text-lg text-gray-600 px-10 md:px-0">
                        <p>Messenger makes it easy and fun to stay close to your favorite people.</p>
                    </div>
                    <form onSubmit={handleSignIn} className="w-full flex justify-center md:justify-start">
                    <div className="flex flex-col space-y-4 w-5/6 md:w-4/6 px-2 mt-[10px]">
                        <input className="bg-gray-100 text-lg font-light rounded-lg px-4 py-1 focus:outline-none focus:ring-1" 
                            placeholder="Email or phone number" 
                            type="text"
                            onChange={onEmailChange}
                            value={email}
                        />
                        <input className="bg-gray-100 text-lg font-light rounded-lg px-4 py-1 focus:outline-none focus:ring-1"
                            placeholder="Password" 
                            type="password"
                            onChange={onPasswordChange}
                            value={password}
                        />
                        <div className="flex mt-[20px] items-center justify-between">
                            <button className="px-6 py-3 rounded-full bg-blue-900 text-md text-white font-bold hover:bg-violet-900"
                                onClick={handleSignIn}
                            >Log in</button>
                            <Link href="/signup" className="text-md font-semibold text-blue-800 hover:underline hover:cursor-pointer">Create an account?</Link>
                        </div>
                    </div>
                    </form>
                </div>
                <div className="col-span-4 px-16 py-12 items-center flex justify-center h-full mr-10 hidden md:block">
                    <img src={'/default.jpg'} alt="alt" className="w-full shadow-2xl rounded-xl"/>
                </div>
            </div>
            <Footer />
        </main>
    )
}

export default logInPage;