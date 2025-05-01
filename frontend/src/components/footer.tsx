const Footer = () => {
return(
    <div className="flex mt-8 md:mt-16 flex justify-around px-8 md:px-24 space-x-4 text-sm py-8 md:py-14 overflow-hidden">
        <p className="text-gray-800 hover:underline hover:cursor-pointer">© Auriel James 2024.</p> 
        <p className="text-gray-800 hover:underline hover:cursor-pointer hidden md:block">The Apple and Google Play logos are trademarks of their respective owners.</p>
        <p className="text-gray-800 hover:underline hover:cursor-pointer  hidden md:block">Privacy Policy</p>
        <p className="text-gray-800 hover:underline hover:cursor-pointer hidden md:block">Cookie Policy</p>
        <p className="text-gray-800 hover:underline hover:cursor-pointer">Terms</p>
        <p className="text-gray-800 hover:underline hover:cursor-pointer hidden md:block">English (US)</p>
        <p className="text-gray-800 hover:underline hover:cursor-pointer">From Meta</p>
    </div>
)
}

export default Footer;