'use client'
import { useState } from 'react'
import Link from "next/link";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { signUp } from '@/hooks/useAuth';
import { useRouter } from 'next/navigation'



export default function SignUp(){
    const router = useRouter();
    const [firstname, setFirstname] = useState<string>("");
    const [lastname, setLastname] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [confirmPassword, setConfirmPassword] = useState<string>("");
    const [birthdate, setBirthDate] = useState<string>("");

    const handleFirstnameChange = (event: any) => setFirstname(event.target.value);
    const handleLastnameChange = (event: any) => setLastname(event.target.value);
    const handleEmailChange = (event: any) => setEmail(event.target.value);
    const handlePasswordChange = (event: any) => setPassword(event.target.value);
    const handleConfirmPasswordChange = (event: any) => setConfirmPassword(event.target.value);
    const handleBirthdateChange = (event: any) => setBirthDate(event.target.value);

    const [alertMessage, setAlertMessage] = useState<string>("");

    const handleSignUp = async(event: React.FormEvent) => {
        event.preventDefault();
        if(password === confirmPassword){
            const { message, status } = await signUp(firstname, lastname, email, password);
            setAlertMessage(message);
            if(status){
                router.push('/login');
            }
        }else{
            setAlertMessage("Password Does not Match");
        }
    }
return(
    <div>
        <Navbar />
        <div className="flex w-full">
            <div className="px-20 py-10 space-y-8">
                <div className="">
                    <p className="bg-gradient-to-r from-red-900 via-blue-900 to-violet-900 inline-block text-transparent bg-clip-text font-bold text-[80px]">Sign Up!</p>
                </div>
                <div className="text-lg text-gray-600 px-1">
                    <p>Messenger makes it easy and fun to stay close to your</p>
                    <p>favorite people.</p>
                </div>
                <form onSubmit={handleSignUp}>
                    <div className="flex justify-center LoginForm flex flex-col space-y-4 w-[500px] px-2 mt-[10px]">
                        <div className="flex space-x-2 w-full">
                            <input className="w-5/6 bg-gray-100 text-lg font-light rounded-lg px-4 py-1 focus:outline-none focus:ring-1" 
                                placeholder="Firstname" 
                                type="text"
                                onChange={handleFirstnameChange}
                                value={firstname}
                            />
                            <input className="w-5/6 bg-gray-100 text-lg font-light rounded-lg px-4 py-1 focus:outline-none focus:ring-1" 
                                placeholder="Lastname" 
                                type="text"
                                onChange={handleLastnameChange}
                                value={lastname}
                            />
                        </div>
                        <input className="bg-gray-100 text-lg font-light rounded-lg px-4 py-1 focus:outline-none focus:ring-1" 
                            placeholder="Email or phone number" 
                            type="text"
                            onChange={handleEmailChange}
                            value={email}
                        />
                        <div className="flex space-x-2 w-full">
                            <input className="w-5/6 bg-gray-100 text-lg font-light rounded-lg px-4 py-1 focus:outline-none focus:ring-1" 
                                placeholder="Password" 
                                type="password"
                                onChange={handlePasswordChange}
                                value={password}
                            />
                            <input className="w-5/6 bg-gray-100 text-lg font-light rounded-lg px-4 py-1 focus:outline-none focus:ring-1" 
                                placeholder="Confirm password" 
                                type="password"
                                onChange={handleConfirmPasswordChange}
                                value={confirmPassword}
                            />
                        </div>
                        <input className="bg-gray-100 text-lg font-light rounded-lg px-4 py-1 focus:outline-none focus:ring-1"
                            type="date"
                            onChange={handleBirthdateChange}
                            value={birthdate}
                        />
                        <div className="flex mt-[20px] items-center justify-between">
                            <button className="px-6 py-3 rounded-full bg-blue-900 text-md text-white font-bold hover:bg-violet-900"
                                onClick={handleSignUp}
                            >
                                Sign Up
                            </button>
                            <Link href="/login" className="text-md font-semibold text-blue-800 hover:underline hover:cursor-pointer">Already have an account?</Link>
                        </div>
                    </div>
                </form>
            </div>
            <div className="flex justify-center items-center w-full">
                {/* <img src={'/default.jpg'} alt="alt" className="w-full shadow-2xl rounded-xl"/> */}
                <svg xmlns="http://www.w3.org/2000/svg" width="200" height="200" className="bi bi-messenger fill-blue-950" viewBox="0 0 16 16"> <path d="M0 7.76C0 3.301 3.493 0 8 0s8 3.301 8 7.76-3.493 7.76-8 7.76c-.81 0-1.586-.107-2.316-.307a.639.639 0 0 0-.427.03l-1.588.702a.64.64 0 0 1-.898-.566l-.044-1.423a.639.639 0 0 0-.215-.456C.956 12.108 0 10.092 0 7.76zm5.546-1.459-2.35 3.728c-.225.358.214.761.551.506l2.525-1.916a.48.48 0 0 1 .578-.002l1.869 1.402a1.2 1.2 0 0 0 1.735-.32l2.35-3.728c.226-.358-.214-.761-.551-.506L9.728 7.381a.48.48 0 0 1-.578.002L7.281 5.98a1.2 1.2 0 0 0-1.735.32z"/> </svg>
            </div>
        </div>
        <Footer />
    </div>
    )
}
