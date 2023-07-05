import React from 'react';
import { Link } from 'react-router-dom';

const Navigation = ({ isActive }: any) => {

    const active = 'border-transparent border-b-primary-purple text-primary-purple font-medium mt-0.5 border-t-0';

    return (
        <nav className='flex justify-center text-xl font-normal border border-transparent border-b-secondary-grey-light'>
            <Link 
                to={'/dashboard'}
                className={`px-16 py-2 border-2 border-transparent ${isActive === 'events' ? active : ''}`}
            >Events</Link>

            <Link
                to={'/people'}
                className={`px-16 py-2 border-2 border-transparent ${isActive === 'people' ? active : ''}`}
            >People</Link>

            <Link 
                to={'/logs'}
                className={`px-16 py-2 border-2 border-transparent ${isActive === 'logs' ? active : ''}`}
            >Logs</Link>
        </nav>
    )
};

export default Navigation;