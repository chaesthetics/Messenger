'use client'
import Image from 'next/image';

const Message = (props:any) => {
    const message = props.message;
    const userId = props.userId;

    if(message.sender_id === userId){
        return <div className="flex justify-end pb-4 px-3 space-x-2">
        <p className="max-w-[640px] text-[14px] break-words bg-[#be123c] text-white rounded-xl p-2">
            {message.content}
        </p>
    </div>
    }
    return <div className="flex pb-4 px-3 space-x-2">
        <div className="flex items-end pb-1">
            <Image 
                src={message.user?.avatar ? message.user?.avatar : "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxAODhANDw0PEA0QDg8ODw0NDhAQDw0OFREXFhURExMYHSkhGBonGxMTITEhJjUrLi4uFx8zODMtOSgwLisBCgoKDQ0NDg0NDisZFRkrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrK//AABEIAOEA4QMBIgACEQEDEQH/xAAbAAEAAgMBAQAAAAAAAAAAAAAABQYCAwQBB//EADkQAQACAQEDCAgFBAIDAAAAAAABAgMRBSFRBAYSMUFScdETYWKBkZKxwRUiMqHhM3KCokKTI0Nz/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAH/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwD7iAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA8mdGGfLFKze06ViNZlVtpbTvmnT9OPspx9duIJvlO2sVNYiZvPsdXxcVucM9mGPff8AhBiom45wz24Y9158nXyfbmK263SpPtRrX4wrIKvNLxMRMTExPVMTrEslO5Dy6+GdazrXtpPVPlK1ck5TXLSL1ndPZ21nhKDeAAAAAAAAAAAAAAAAAAAADTyvN6PHa/drM+/sBAbf5b07+iifyU6/Xf8AjzRL2Z1nWeud8zxl4qAAAADu2Ryz0OSNZ/JfStvVws4QF7HHsjP6TBS09cR0Z8Y3OxFAAAAAAAAAAAAAAAAAAEbzgvpyeY71qx++v2SSJ5yf0Y/+lfpIK0AqAAAAAALDzZv+S9eF4n4x/CaQXNjqy+NPunUUAAAAAAAAAAAAAAAAAAcG3MfS5Pf1aW+E7/21d7HJSLRNZ6piYnwkFGGzlGGcd7UnrrMx4x2S1qgAAAAD2tZmYiI1mZiIjjMgsfNzFphtbvXn4RGnml2nkeH0eOuPu1iPGe2fi3IoAAAAAAAAAAAAAAAAAAACH29s+bx6Wka2rGlojrtXj4wri9oXaexYvM3xaRbrmk7qzPGOEgrw2ZsNsc6XrNZ9cfSe1rVAGWOk2nStZtPCsayDFN7A5BOvp7Ruj+nE9s957s7Yk7r5ursxxv1/un7J6I03Ir0AAAAAAAAAAAAAAAAAAAAYZMkVjWZiIjrmZ0iPejuUbcxV3V1vPsxpHxkEoK5l2/kn9NKV8dbT9nPO2s/fiPClQWm9YmNJiJjhO+HLbZuGevFT3Rp9EB+M5+/HyV8j8Zz9+Pkr5An67MwR/wCqvv3/AFdOPHWsaVrFY4ViIhV/xnP34+SvkfjOfvx8lfIFrFUjbOfvx8lfJux7fyx+qtLR4TE/UFlEPg2/jndetqev9UeaTwZ65I1paLR6pBtAAAAAAAAAAAAAAB5IPdURtDbVaa1x6Xv1dL/hWfu4tr7Wm8zjxzpTqtaP+fhPD6ogG7lHKb5Z6V7TaeE9UeEdjSCoAAAAAAAAMsWS1J6VbTW3GJ0liAneQbd6q5v+yI+seScpeLRExMTE74mN8Sozt2btG2CdN845n81OHrjhKKtw14csXrFqzrWY1iWwAAAAAAAAAABDc4OW9GvoazvtGtp4U4e9Myp208vTz5Le1NY8I3fYHKAqAAAAAAAAAAAAAAJbYHLOhf0Uz+S87vZv/KyqLW0xMWjriYmPGF4xX6VYt2TET8YRWQAAAAAAAAAMMt+jW1uFZn4Qo+uu/tneuG1r9Hk+SfZ6Px3fdT1AAQAAAAAAAAAAAAAAW/ZGTpYMc+z0fhu+yoLPzdvrg04XtH0n7oqUAAAAAAAAABHbfnTk9vXNI/2ifsqq0c4f6E/31VdUAAAAAAAAAAAAAAAAFi5sz/47x7ev+seSurDzY/Rk/uj6AmgEUAAAAAAABxbYxTfBkiOuIi0f4zr9lRXuVd2nsaazN8Ua165xx118OMeoEMAqAAAAAAAAAAAAAACzc3cXRw9LvXmfdGkfaUPs3Zts8674xx124+qvGVqxY4rWK1jSIjSI4QiswAAAAAAAAAAAcfLNm482+1dLd+u638oblOwcld9LReOE/lt5LKApGbBem69LV8YnT4ta9TGu5y5dm4b9eKuvGsdGf2BTxZcmwMU9Vr198TH7w5783e7m+an8qiCEvbm/k7L458elH2YTsLNxxz/lPkCLEn+B5vY+efJ7Gwc3HH80+QIsS9eb+TtvSPDpT9m/Hzd72X5aecggRZ8WwsMdfSt420j9nZh5Hjp+nHWJ46b/AIoqrcn2dlyfppMR3rflj9+v3Jnkewq10nJPTnuxur/KYAeVrERpEaRHVEdUPQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABiAD//2Q=="}  
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