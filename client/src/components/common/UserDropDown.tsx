import React, { useRef } from 'react';
import CuteDog from "../../UI/img/cute_dog.jpg";
import { useFetchUserQuery } from "../../redux/store";

const UserDropDown = () => {
    const { data } = useFetchUserQuery();
    const dropDownRef = useRef<HTMLDivElement>(null);
    
    const handleClickInside = (event: React.MouseEvent) => {
        event.stopPropagation();
    };

    return (
        <div 
            className="w-80 text-black absolute top-[4rem] right-0 flex flex-col py-5 px-5 shadow-box rounded-md bg-white z-50"
            ref={dropDownRef}
            onClick={handleClickInside}
        >
            <div className="profile--container flex flex-col items-center justify-center gap-2">
                <img className="profile--img w-20 h-20 rounded-full" src={CuteDog} alt="profile" />

                <h2 className="profile--name profile--name rounded-full font-semibold">{data.first_name} {data.last_name}</h2>
            </div>
            
            <div className="line-grey"></div>

            <div className="profile--container">
                <ul className="flex justify-center">
                    {/* <li><a className="btn-normal" href="/usersetting">Setting</a></li> */}
                    <li><a className="btn-normal" href="/api/logout">Log out</a></li>
                </ul>
            </div>
        </div>
    )
};

export default UserDropDown;