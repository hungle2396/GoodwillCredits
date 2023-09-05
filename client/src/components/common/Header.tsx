import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { useFetchUserQuery } from "../../redux/store";
import { useLocation } from "react-router-dom";
import UserDropDown from "./UserDropDown";
import CuteDog from "../../UI/img/cute_dog.jpg";

const Header = () => {
    const { data, isFetching } = useFetchUserQuery();
    const location = useLocation();

    const [isDropDownOpen, setIsDropDownOpen] = useState(false);
    const dropDownRef = useRef<HTMLDivElement>(null);

    const handleDropDownOpen = () => {
        setIsDropDownOpen((prevState) => !prevState);
    }

    const handleDropDownOutside = (event: MouseEvent) => {
        if (dropDownRef.current && !dropDownRef.current.contains(event.target as Node)) {
            setIsDropDownOpen(false);
        }
    }

    useEffect(() => {
        document.addEventListener('click', handleDropDownOutside);

        return () => {
            document.removeEventListener('click', handleDropDownOutside);
        }
    }, []);

    const renderContent = () => {
        switch (data) {
            // Still fetching data 
            case undefined:
                return null;
            case null:
                return (
                    <ul className="
                        flex gap-5
                        sm:text-sm md:text-base
                    ">
                        {/* <li>
                            <a className="btn-normal" href="/about">
                                About
                            </a>
                        </li>

                        <li>
                            <a className="btn-normal" href="/contact">
                                Contact
                            </a>
                        </li> */}

                        {/* Render only register link if we are not in the register route */}
                        {location.pathname !== "/register" && (
                            <li>
                            <a className="
                                btn-primary-sm md:btn-primary
                            " href="/register">
                                Sign up
                            </a>
                        </li>
                        )}
                        
                        <li>
                            <a className="btn-normal" href="/login">Login</a>
                        </li>
                        
                        {/* <li >
                            <a className="text-white ml-3" href="/auth/google">Login with Google</a>
                        </li> */}
                    </ul>
                )
            default:
                return (
                    <div 
                        className="user_profile--container flex items-center gap-4 relative"
                        onClick={handleDropDownOpen}
                        ref={dropDownRef}
                    >
                        <img className="w-10 h-10 rounded-full" src={CuteDog} alt="dog" />
                        
                        <p className="font-medium">{data.firstName}</p>

                        {isDropDownOpen && <UserDropDown />}
                    </div>
                )
        }
    };

    return (
        <header>
            <div className="
                header flex
                mx-5 
                justify-between items-center 
                h-full border-transparent border-bottom
                text-sm
            ">
                <Link to={data ? '/dashboard' : '/'} className="
                    btn-normal
                    font-medium text-base md:text-xl
                    
                ">Goodwill Credits</Link>
                {renderContent()}
            </div>
        </header>
    )
}

export default Header;