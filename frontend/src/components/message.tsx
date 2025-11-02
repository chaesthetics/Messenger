'use client'
import Image from 'next/image';
import { useEffect, useRef } from 'react';

const Message = (props: any) => {
    const message = props.message;
    const userId = props.userId;
    const messagesEndRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [message]);

    if(message.sender_id === userId){
        return (
            <div className="flex justify-end pb-4 px-3 space-x-2" ref={messagesEndRef}>
                <p className="max-w-[640px] text-[14px] break-words bg-[#be123c] text-white rounded-xl p-2">
                    {message.content}
                </p>
            </div>
        );
    }

    return (
        <div className="flex pb-4 px-3 space-x-2" ref={messagesEndRef}>
            <div className="flex items-end pb-1">
                <Image 
                    src={message.user?.avatar ? message.user?.avatar : "data:Image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/..."}  
                    width={28}
                    height={28}
                    alt="profile"
                    className=" w-[28px] h-[28px] object-cover rounded-full hover:cursor-pointer"
                />
            </div>
            <p className="max-w-[640px] text-[14px] break-words bg-gray-100 rounded-xl p-2">
                {message.content}
            </p>
        </div>
    );
}

export default Message;
