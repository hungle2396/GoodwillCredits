import React from 'react';
import { Link } from 'react-router-dom';

const Navigation = ({ isActive }: any) => {

    // const handleLinkClick = (link: string) => {
    //     setActiveLink(link);
    // };

    const active = 'border-transparent border-b-primary-purple border-2 text-primary-purple font-medium mt-0.5 border-t-0';

    return (
        <nav className='flex justify-center text-xl font-normal border border-transparent border-b-secondary-grey-light'>
            <Link 
                to={'/dashboard'}
                className={`px-16 py-2 ${isActive === 'events' ? active : ''}`}
                // onClick={() => handleLinkClick('events')}
            >Events</Link>

            <Link
                to={'/people'}
                className={`px-16 py-2 ${isActive === 'people' ? active : ''}`}
                // onClick={() => handleLinkClick('people')}
            >People</Link>

            <Link 
                to={'/logs'}
                className={`px-16 py-2 ${isActive === 'logs' ? active : ''}`}
                // onClick={() => handleLinkClick('logs')}
            >Logs</Link>
        </nav>
    )
};

export default Navigation;