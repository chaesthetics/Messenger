import React from "react";
import SideBar from "@/components/sidebar";
export default function homepage(){
    return(
        <div className="h-screen w-screen grid grid-cols-12">
            <div className="grid grid-cols-7 sideBar col-span-4 border-r-[1px] border-gray-200">
                <SideBar />
                
            </div>
            <div className="mainBar col-span-8 items-center justify-center h-full w-full">Messages</div>
        </div>
    )
}

