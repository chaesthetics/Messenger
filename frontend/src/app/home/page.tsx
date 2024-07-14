'use client'
import React, { use, useEffect, useState } from "react";
import SideBar from "@/components/sidebar";
import Image from 'next/image';
import Message from "@/components/message";
import { getConversations, getMessages, createMessage } from "@/hooks/useAuth";

export default function homepage(){

    const [chatList, setChatList] = useState([]);
    const [convoBar, setConvoBar] = useState([<></>]);
    const [selectedConvo, setSelectedConvo] = useState({});
    const [messages, setMessage] = useState([]);
    const [userId, setUserId] = useState(0)
    const [selectedConvo_Id, setselectedConvo_Id] = useState(0);

    const initialConversation = async() => {
        const userinfo = JSON.parse(localStorage.getItem('userInfo') as string);
        setUserId(userinfo.id);
        const convoData = await getConversations(userinfo.id);
        const messagesData = await getMessages(1);
        setMessage(messagesData);
        setChatList(convoData);
        setSelectedConvo(convoData[0]);
        setselectedConvo_Id(convoData[0]?.id ?? 1);
    }

    useEffect(()=>{
        initialConversation();
    },  []);

    const handleConvoSelection = async(selectedChat: any) => {
        setSelectedConvo(selectedChat);
        const selectedConvoId = selectedChat.id;
        setselectedConvo_Id(selectedConvoId);
        const messagesData = await getMessages(selectedConvoId);
        setMessage(messagesData);
    }
    const handleActiveConvo = (convoId:any) => {
        const convos = document.getElementsByClassName("conversations");
        const len = convos.length;
        for(var i=0 ; i<len; i++){
            convos[i].style.backgroundColor="white";
        }
        document.getElementById(convoId).style.backgroundColor = "rgb(243 244 246)";
    }
  
    useEffect(()=>{
        const conversationBar = chatList.map((chat, index)=>{
            return <div onClick={()=>handleConvoSelection(chat)} onPointerDown={()=>handleActiveConvo(chat.id)} key={chat.id} id={chat.id} className="conversations flex mt-2 w-[370px] py-2 px-3 hover:bg-gray-100 hover:cursor-pointer duration-300 transition-300 animation-300 rounded-md space-x-4 items-center">
            <Image 
                src={chat?.chatwith?.avatar===null ? "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxAODhANDw0PEA0QDg8ODw0NDhAQDw0OFREXFhURExMYHSkhGBonGxMTITEhJjUrLi4uFx8zODMtOSgwLisBCgoKDQ0NDg0NDisZFRkrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrK//AABEIAOEA4QMBIgACEQEDEQH/xAAbAAEAAgMBAQAAAAAAAAAAAAAABQYCAwQBB//EADkQAQACAQEDCAgFBAIDAAAAAAABAgMRBSFRBAYSMUFScdETYWKBkZKxwRUiMqHhM3KCokKTI0Nz/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAH/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwD7iAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA8mdGGfLFKze06ViNZlVtpbTvmnT9OPspx9duIJvlO2sVNYiZvPsdXxcVucM9mGPff8AhBiom45wz24Y9158nXyfbmK263SpPtRrX4wrIKvNLxMRMTExPVMTrEslO5Dy6+GdazrXtpPVPlK1ck5TXLSL1ndPZ21nhKDeAAAAAAAAAAAAAAAAAAAADTyvN6PHa/drM+/sBAbf5b07+iifyU6/Xf8AjzRL2Z1nWeud8zxl4qAAAADu2Ryz0OSNZ/JfStvVws4QF7HHsjP6TBS09cR0Z8Y3OxFAAAAAAAAAAAAAAAAAAEbzgvpyeY71qx++v2SSJ5yf0Y/+lfpIK0AqAAAAAALDzZv+S9eF4n4x/CaQXNjqy+NPunUUAAAAAAAAAAAAAAAAAAcG3MfS5Pf1aW+E7/21d7HJSLRNZ6piYnwkFGGzlGGcd7UnrrMx4x2S1qgAAAAD2tZmYiI1mZiIjjMgsfNzFphtbvXn4RGnml2nkeH0eOuPu1iPGe2fi3IoAAAAAAAAAAAAAAAAAAACH29s+bx6Wka2rGlojrtXj4wri9oXaexYvM3xaRbrmk7qzPGOEgrw2ZsNsc6XrNZ9cfSe1rVAGWOk2nStZtPCsayDFN7A5BOvp7Ruj+nE9s957s7Yk7r5ursxxv1/un7J6I03Ir0AAAAAAAAAAAAAAAAAAAAYZMkVjWZiIjrmZ0iPejuUbcxV3V1vPsxpHxkEoK5l2/kn9NKV8dbT9nPO2s/fiPClQWm9YmNJiJjhO+HLbZuGevFT3Rp9EB+M5+/HyV8j8Zz9+Pkr5An67MwR/wCqvv3/AFdOPHWsaVrFY4ViIhV/xnP34+SvkfjOfvx8lfIFrFUjbOfvx8lfJux7fyx+qtLR4TE/UFlEPg2/jndetqev9UeaTwZ65I1paLR6pBtAAAAAAAAAAAAAAB5IPdURtDbVaa1x6Xv1dL/hWfu4tr7Wm8zjxzpTqtaP+fhPD6ogG7lHKb5Z6V7TaeE9UeEdjSCoAAAAAAAAMsWS1J6VbTW3GJ0liAneQbd6q5v+yI+seScpeLRExMTE74mN8Sozt2btG2CdN845n81OHrjhKKtw14csXrFqzrWY1iWwAAAAAAAAAABDc4OW9GvoazvtGtp4U4e9Myp208vTz5Le1NY8I3fYHKAqAAAAAAAAAAAAAAJbYHLOhf0Uz+S87vZv/KyqLW0xMWjriYmPGF4xX6VYt2TET8YRWQAAAAAAAAAMMt+jW1uFZn4Qo+uu/tneuG1r9Hk+Sf36Px3fdT1AAQAAAAAAAAAAAAAAW/ZGTpYMc+z0fhu+yoLPzdvrg04XtH0n7oqUAAAAAAAAABHbfnTk9vXNI/2ifsqq0c4f6E/31VdUAAAAAAAAAAAAAAAAFi5sz/47x7ev+seSurDzY/Rk/uj6AmgEUAAAAAAABxbYxTfBkiOuIi0f4zr9lRXuVd2nsaazN8Ua165xx118OMeoEMAqAAAAAAAAAAAAAACzc3cXRw9LvXmfdGkfaUPs3Zts8674xx124+qvGVqxY4rWK1jSIjSI4QiswAAAAAAAAAAAcfLNm482+1dLd+u638oblOwcld9LReOE/lt5LKApGbBem69LV8YnT4ta9TGu5y5dm4b9eKuvGsdGf2BTxZcmwMU9Vr198TH7w5783e7m+an8qiCEvbm/k7L458elH2YTsLNxxz/lPkCLEn+B5vY+efJ7Gwc3HH80+QIsS9eb+TtvSPDpT9m/Hzd72X5aecggRZ8WwsMdfSt420j9nZh5Hjp+nHWJ46b/AIoqrcn2dlyfppMR3rflj9+v3Jnkewq10nJPTnuxur/KYAeVrERpEaRHVEdUPQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABiAD//2Q==" : chat?.chatwith?.avatar}
                width={50}
                height={50}
                alt="profile"
                className="w-[50px] h-[50px] object-cover rounded-full items-center"
            />
            <div className="space-y-1 mt-1">
                <p className="text-black font-light h-[12px] leading-3">{`${chat?.chatwith?.firstname} ${chat?.chatwith?.lastname}`}</p>
                <div className="flex space-x-1"><p className="text-xs font-semibold">Start a conversation</p><p className="text-xs font-light text-gray-600">1min ago</p></div>
            </div>
        </div>
        });
        setConvoBar(conversationBar);
    }, [chatList]);
        
    const [prechat, setPreChat] = useState<string>("");

    const handlePrechat = (event:any) => {
        setPreChat(event.target.value);
    }

    const handleChat = async(event: React.FormEvent) => {
        event.preventDefault();
        const preChatMessage = await createMessage(selectedConvo.id, userId, prechat).then(async()=>{
            const messagesData = await getMessages(selectedConvo_Id);
            setMessage(messagesData);
        });
        console.log(preChatMessage);
        setPreChat("");
    }
    
    return(
        <div className="h-screen w-screen grid grid-cols-12 overflow-hidden">
            <div className="grid grid-cols-7 sideBar col-span-4 border-r-[1px] border-gray-200">
                <SideBar />
                <div className="w-full h-screen col-span-6 overflow-y-scroll pb-2">
                    <div className="sticky top-0 bg-white">
                    <div className="flex justify-between px-6 py-2 items-center">
                        <p className="font-bold text-2xl">Chats</p>
                        <div className="bg-gray-100 rounded-full px-2 py-2">
                            <svg viewBox="6 6 24 24" fill="currentColor" width="20" height="20" className="" overflow="visible"><path d="M17.305 16.57a1.998 1.998 0 0 0-.347.467l-1.546 2.87a.5.5 0 0 0 .678.677l2.87-1.545c.171-.093.328-.21.466-.347l8.631-8.631a1.5 1.5 0 1 0-2.121-2.122l-8.631 8.632z"></path><path d="M18 10.5a1 1 0 0 0 1-1V9a1 1 0 0 0-1-1h-6a4 4 0 0 0-4 4v12a4 4 0 0 0 4 4h12a4 4 0 0 0 4-4v-6a1 1 0 0 0-1-1h-.5a1 1 0 0 0-1 1v6a1.5 1.5 0 0 1-1.5 1.5H12a1.5 1.5 0 0 1-1.5-1.5V12a1.5 1.5 0 0 1 1.5-1.5h6z"></path></svg>
                        </div>
                    </div>
                    <div className="flex justify-center w-full items-center relative">
                        <input className="bg-gray-100 w-11/12 placeholder-black text-sm font-light text-gray-600 py-2 px-12 rounded-full focus:outline-none"
                        placeholder="Search Messenger"
                        />
                        <svg xmlns="http://www.w3.org/2000/svg" fill="gray" viewBox="0 0 512 512" className="w-5 h-5 absolute left-8"><path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z"/></svg>
                    </div>
                    </div>
                    <div className="flex flex-col w-full items-center">
                        {convoBar}
                    </div>
                </div>
            </div>
            <div className="mainBar col-span-8 w-full h-screen flex flex-col">
                <div className="flex h-[60px] min-h-[60px] border-b-[1px] bg-white shadow-sm px-2 items-center justify-between">
                    <div className="flex space-x-2 items-center hover:bg-gray-100 px-2 py-2 hover:cursor-pointer transition-200 duration-300 animation-300 rounded-md">
                        <Image 
                            src={selectedConvo?.chatwith?.avatar===null ? "data:image/jpeg;base64,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" : selectedConvo?.chatwith?.avatar}
                            width={35}
                            height={35}
                            alt="profile"
                            className="w-[35px] h-[35px] object-cover rounded-full items-center"
                        />
                        <p className="text-sm font-semibold text-neutral-700 ">{`${selectedConvo?.chatwith?.firstname} ${selectedConvo?.chatwith?.lastname}`}</p>
                    </div>
                    <div className="flex items-center space-x-6">
                        <div className="flex hover:bg-gray-200 hover:cursor-pointer transition-200 duration-300 animation-300 rounded-full h-[34px] w-[34px] items-center justify-center">
                            <svg viewBox="6 6 24 24" fill="#be123c" width="20" height="20" className="x19dipnz x1lliihq x1k90msu x2h7rmj x1qfuztq" overflow="visible"><path d="M25.753 28.2c1.07-.357 1.816-1.275 2.423-2.225a2.05 2.05 0 0 0 .037-2.151 4.998 4.998 0 0 0-.723-.963 11.594 11.594 0 0 0-2.888-2.112c-.58-.299-1.272-.212-1.808.159l-2.098 1.452a.472.472 0 0 1-.437.055 11.557 11.557 0 0 1-4.045-2.63 11.554 11.554 0 0 1-2.63-4.044.472.472 0 0 1 .056-.437l1.453-2.098c.37-.536.457-1.228.158-1.807A11.587 11.587 0 0 0 13.14 8.51a4.995 4.995 0 0 0-.963-.723 2.05 2.05 0 0 0-2.15.037c-.951.607-1.87 1.353-2.225 2.424-1.174 3.527 1.187 8.461 5.338 12.613 4.152 4.151 9.086 6.512 12.614 5.338z"></path></svg>
                        </div>
                        <div className="flex hover:bg-gray-200 hover:cursor-pointer transition-200 duration-300 animation-300 rounded-full h-[34px] w-[34px] items-center justify-center">
                            <svg viewBox="6 6 24 24" fill="#be123c" width="20" height="20" className="x19dipnz x1lliihq x1k90msu x2h7rmj x1qfuztq" overflow="visible"><path d="M9 9.5a4 4 0 0 0-4 4v9a4 4 0 0 0 4 4h10a4 4 0 0 0 4-4v-9a4 4 0 0 0-4-4H9zM25.829 21.532l3.723 1.861A1 1 0 0 0 31 22.5V13.5a1 1 0 0 0-1.448-.894l-3.723 1.861A1.5 1.5 0 0 0 25 15.81v4.38a1.5 1.5 0 0 0 .829 1.342z"></path></svg>
                        </div>
                        <div className="flex hover:bg-gray-200 hover:cursor-pointer transition-200 duration-300 animation-300 rounded-full h-[34px] w-[34px] items-center justify-center">
                            <svg fill="#be123c" height="28px" role="presentation" viewBox="0 0 36 36" width="28px"><path d="M12.5 18C12.5 19.2426 11.4926 20.25 10.25 20.25C9.00736 20.25 8 19.2426 8 18C8 16.7574 9.00736 15.75 10.25 15.75C11.4926 15.75 12.5 16.7574 12.5 18Z" fill="var(--mwp-header-button-color)"></path><path d="M20.25 18C20.25 19.2426 19.2426 20.25 18 20.25C16.7574 20.25 15.75 19.2426 15.75 18C15.75 16.7574 16.7574 15.75 18 15.75C19.2426 15.75 20.25 16.7574 20.25 18Z" fill="var(--mwp-header-button-color)"></path><path d="M25.75 20.25C26.9926 20.25 28 19.2426 28 18C28 16.7574 26.9926 15.75 25.75 15.75C24.5074 15.75 23.5 16.7574 23.5 18C23.5 19.2426 24.5074 20.25 25.75 20.25Z" fill="var(--mwp-header-button-color)"></path></svg>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col h-full justify-between">
                    <div className="flex w-full justify-between pt-12 flex-col h-full overflow-y-scroll scroll-smooth pb-14">
                        <div className="flex items-center mt-10 flex-col pb-10">
                            <Image 
                                src={selectedConvo?.chatwith?.avatar===null ? "data:image/jpeg;base64,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" : selectedConvo?.chatwith?.avatar}
                                width={60}
                                height={60}
                                alt="profile"
                                className="w-[60px] h-[60px] object-cover rounded-full items-center hover:cursor-pointer"
                            />
                            <p className="hover:cursor-pointer text-lg font-semibold pt-1">{`${selectedConvo?.chatwith?.firstname} ${selectedConvo?.chatwith?.lastname}`}</p>
                            <p className="hover:cursor-pointer hover:underline text-xs text-gray-700 leading-5">Facebook</p>
                            <p className="hover:cursor-pointer hover:underline text-xs text-gray-700 leading-5">You're friends on Facebook</p>
                            <p className="hover:cursor-pointer hover:underline text-xs text-gray-700 leading-5">Lives in Makati City</p>
                            <p className="text-xs font-semibold text-gray-700 mt-16">You can now message and call each other and see info like Active Status and when</p>
                            <p className="text-xs font-semibold text-gray-700">you've read messages.</p>
                        </div>
                        {/* <div className="flex pb-16 px-3 space-x-2">
                            <div className="flex items-end pb-1">
                                <Image 
                                    src={"data:image/jpeg;base64,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"}
                                    width={28}
                                    height={28}
                                    alt="profile"
                                    className=" w-[28px] h-[28px] object-contain rounded-full hover:cursor-pointer"
                                />
                            </div>
                            <p className="max-w-[640px] text-[14px] break-words bg-gray-100 rounded-xl p-2">
                            If you’re wondering how we automatically generated the 50–950 shades of each color, bad news — color is complicated and to get the absolute best results we picked all of Tailwind’s default colors by hand, meticulously balancing them by eye and testing them in real designs to make sure we were happy with them.

                            If you are creating your own custom color palette and don’t feel confident doing it by hand, UI Colors is a great tool that can give you a good starting point based on any custom color.

                            Two other useful tools we recommend for building your own palettes are Palettte and ColorBox — they won’t do the work for you but their interfaces are well-designed for doing this sort of work.
                            You can also use variant modifiers to target media queries like responsive breakpoints, dark mode, prefers-reduced-motion, and more. For example, use md:break-all to apply the break-all utility at only medium screen sizes and above.
                            </p>
                        </div> */}

                        {
                            messages.map((message)=>{
                               return <div className="px-2 pb-1"><Message message={message}/></div>
                            })
                        }
                    </div>
                    <form onSubmit={handleChat} className="sticky bottom-0 h-[54px] flex justify-between items-center bg-white px-2 pl-4 pr-6">
                        <div className="flex items-center space-x-2 w-full">
                            <div className="flex hover:bg-gray-200 hover:cursor-pointer transition-200 duration-300 animation-300 rounded-full h-[34px] w-[34px] items-center justify-center">
                                <svg className="x1lliihq x1rdy4ex xcud41i x4vbgl9 x139jcc6 x1k90msu x11xpdln x1qfuztq xsrhx6k x7p49u4" fill="#be123c" height="30px" viewBox="0 0 36 36" width="30px"><path clip-rule="evenodd" d="M18 29c6.075 0 11-4.925 11-11S24.075 7 18 7 7 11.925 7 18s4.925 11 11 11zm-1-16a1 1 0 112 0v3.75c0 .138.112.25.25.25H23a1 1 0 110 2h-3.75a.25.25 0 00-.25.25V23a1 1 0 11-2 0v-3.75a.25.25 0 00-.25-.25H13a1 1 0 110-2h3.75a.25.25 0 00.25-.25V13z" fill="var(--chat-composer-button-color)" fill-rule="evenodd"></path></svg>
                            </div>
                            <div className="flex hover:bg-gray-200 hover:cursor-pointer transition-200 duration-300 animation-300 rounded-full h-[34px] w-[34px] items-center justify-center">
                                <svg className="x1lliihq x1rdy4ex xcud41i x4vbgl9 x139jcc6 xsrhx6k" fill="#be123c" height="30px" viewBox="0 0 36 36" width="30px"><path d="M13.5 16.5a2 2 0 100-4 2 2 0 000 4z" fill="var(--chat-composer-button-color)"></path><path clip-rule="evenodd" d="M7 12v12a4 4 0 004 4h14a4 4 0 004-4V12a4 4 0 00-4-4H11a4 4 0 00-4 4zm18-1.5H11A1.5 1.5 0 009.5 12v9.546a.25.25 0 00.375.217L15 18.803a6 6 0 016 0l5.125 2.96a.25.25 0 00.375-.217V12a1.5 1.5 0 00-1.5-1.5z" fill="var(--chat-composer-button-color)" fill-rule="evenodd"></path></svg>
                            </div>
                            <div className="flex hover:bg-gray-200 hover:cursor-pointer transition-200 duration-300 animation-300 rounded-full h-[34px] w-[34px] items-center justify-center">
                                <svg className="x1lliihq x1rdy4ex xcud41i x4vbgl9 x139jcc6 xsrhx6k" fill="#be123c" height="30px" viewBox="0 0 36 36" width="30px"><path d="M8 12a4 4 0 014-4h12a4 4 0 014 4v5a1 1 0 01-1 1h-3a6 6 0 00-6 6v3a1 1 0 01-1 1h-5a4 4 0 01-4-4V12z" fill="var(--chat-composer-button-color)"></path><path d="M20 27c0 .89 1.077 1.33 1.707.7l5.993-5.993c.63-.63.19-1.707-.7-1.707h-3a4 4 0 00-4 4v3z" fill="var(--chat-composer-button-color)"></path></svg>
                            </div>
                            <div className="flex hover:bg-gray-200 hover:cursor-pointer transition-200 duration-300 animation-300 rounded-full h-[34px] w-[34px] items-center justify-center">
                                <svg className="x1lliihq x1rdy4ex xcud41i x4vbgl9 x139jcc6 xsrhx6k" fill="#be123c" height="30px" viewBox="0 0 36 36" width="30px"><path clip-rule="evenodd" d="M6 11a4 4 0 014-4h8c1.067 0 2.035.417 2.753 1.098.517.491 1.151.902 1.866.902H26a4 4 0 014 4v12a4 4 0 01-4 4h-8a3.986 3.986 0 01-2.752-1.098c-.518-.491-1.152-.902-1.866-.902H10a4 4 0 01-4-4V11zm7.865 4.908a1.948 1.948 0 00-1.321-.456c-.461.02-.918.214-1.295.576-.378.363-.65.873-.754 1.457a2.927 2.927 0 00.209 1.708c.236.52.611.915 1.046 1.14a1.87 1.87 0 001.36.152c.454-.122.88-.419 1.195-.868.098-.14.183-.291.253-.451.068-.154-.052-.316-.22-.316H12.85a.85.85 0 010-1.7h2.8c.47 0 .85.38.85.85a4.53 4.53 0 01-.803 2.593c-.527.75-1.277 1.3-2.144 1.534a3.57 3.57 0 01-2.586-.285c-.8-.414-1.43-1.107-1.811-1.947a4.628 4.628 0 01-.335-2.706 4.357 4.357 0 011.25-2.388 3.697 3.697 0 012.398-1.048 3.647 3.647 0 012.472.838.85.85 0 01-1.076 1.317zM22.7 19.6a.25.25 0 01.25-.25h2.75a.85.85 0 000-1.7h-2.75a.25.25 0 01-.25-.25v-1.45a.25.25 0 01.25-.25h3.2a.85.85 0 100-1.7h-4.3a.85.85 0 00-.85.85v6.3a.85.85 0 001.7 0V19.6zm-3.35-4.75a.85.85 0 00-1.7 0v6.3a.85.85 0 001.7 0v-6.3z" fill="var(--chat-composer-button-color)" fill-rule="evenodd"></path></svg>
                            </div>
                            <div className="w-full">
                                <input onChange={handlePrechat} id="preChat" value={prechat} autocomplete="off" className="bg-gray-100 w-[670px] py-[8px] text-md text-neutral-900 font-light focus:outline-none rounded-full px-4"
                                placeholder="Aa"
                                />
                            </div>
                        </div>
                        <div className="flex hover:bg-gray-200 hover:cursor-pointer transition-200 duration-300 animation-300 rounded-full h-[34px] w-[34px] items-center justify-center">
                            <svg aria-hidden="true" fill="#be123c" className="xsrhx6k" height="20" viewBox="0 0 22 23" width="20"><path d="M10.987 0c1.104 0 3.67.726 3.67 5.149 0 1.232-.123 2.001-.209 2.534a16.11 16.11 0 00-.048.314l-.001.005a.36.36 0 00.362.406c4.399 0 6.748 1.164 6.748 2.353 0 .533-.2 1.02-.527 1.395a.11.11 0 00.023.163 2.13 2.13 0 01.992 1.79c0 .86-.477 1.598-1.215 1.943a.11.11 0 00-.046.157c.207.328.329.713.329 1.128 0 .946-.547 1.741-1.406 2.029a.109.109 0 00-.068.137c.061.184.098.38.098.584 0 1.056-1.776 1.913-5.95 1.913-3.05 0-5.154-.545-5.963-.936-.595-.288-1.276-.81-1.276-2.34v-6.086c0-1.72.958-2.87 1.911-4.014C9.357 7.49 10.3 6.36 10.3 4.681c0-1.34-.091-2.19-.159-2.817-.039-.368-.07-.66-.07-.928 0-.527.385-.934.917-.936zM3.5 11h-2C.5 11 0 13.686 0 17s.5 6 1.5 6h2a1 1 0 001-1V12a1 1 0 00-1-1z" fill="var(--chat-composer-button-color)"></path></svg>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

