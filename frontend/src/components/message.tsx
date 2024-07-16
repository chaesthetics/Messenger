import Image from 'next/image';

const Message = (props:any) => {
    const message = props.message;
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));

    if(message.sender_id === userInfo.id){
        return <div className="flex justify-end pb-4 px-3 space-x-2">
        <p className="max-w-[640px] text-[14px] break-words bg-[#be123c] text-white rounded-xl p-2">
            {message.content}
        </p>
    </div>
    }
    return <div className="flex pb-4 px-3 space-x-2">
        <div className="flex items-end pb-1">
            <Image 
                src={message.user?.avatar}
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
}

export default Message;