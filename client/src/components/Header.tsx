import { Link } from "react-router-dom";
import { useFetchUserQuery } from "../redux/store";
import { useLocation } from "react-router-dom";

const Header = () => {
    console.log("In the header component");
    const { data, isFetching } = useFetchUserQuery();
    const location = useLocation();


    console.log("location: ", location);

    console.log(data);
    const renderContent = () => {
        switch (data) {
            // Still fetching data 
            case undefined:
                return null;
            case null:
                return (
                    <ul className="flex gap-5">
                        <li>
                            <a className="btn-normal" href="/about">
                                About
                            </a>
                        </li>

                        <li>
                            <a className="btn-normal" href="/contact">
                                Contact
                            </a>
                        </li>

                        {/* Render only register link if we are not in the register route */}
                        {location.pathname !== "/register" && (
                            <li>
                            <a className="btn-primary" href="/register">
                                Register
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
                    <a className="text-white" href="/api/logout">Log out</a>
                )
        }
    };

    return (
        <header className="h-14">
            <div className="flex justify-between items-center h-full mx-10 border-bottom">
                <Link to={data ? '/dashboard' : '/'} className="text-lg btn-normal">Goodwill Credit</Link>
                {renderContent()}
            </div>
        </header>
    )
}

export default Header;