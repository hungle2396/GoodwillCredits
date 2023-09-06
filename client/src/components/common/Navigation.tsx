import React from 'react';
import { Link } from 'react-router-dom';
import { ReactComponent as EventIcon } from '../../UI/img/calendar.svg';
import { ReactComponent as PeopleIcon } from '../../UI/img/group.svg';
import { ReactComponent as LogsIcon } from '../../UI/img/history.svg';

const Navigation = ({ isActive }: any) => {

    const active = 'bg-primary-purple-light-2 rounded-md text-primary-purple fill-primary-purple';

    return (
        <nav className='
            flex
            p-3 bg-slate-100
            rounded-md
            lg:basis-1/4 
            text-sm 
            font-semibold 
            gap-2
        '>
            <Link 
                to={'/dashboard'}
                className={`
                    flex 
                    items-center 
                    py-3 px-3 lg:pr-20
                    gap-2 
                    ${isActive === 'events' ? active : ''}`}
            >
                <EventIcon className='w-5 h-5'/>
                Events
            </Link>

            <Link
                to={'/people'}
                className={`
                    flex 
                    items-center 
                    p-3 lg:pr-20
                    gap-2
                    ${isActive === 'people' ? active : ''}`}
            >
                <PeopleIcon className='w-5 h-5' />
                People
            </Link>

            <Link 
                // to={'/logs'}
                to={'#'}
                className={`
                    flex items-center gap-2 p-3 lg:pr-20
                    ${isActive === 'logs' ? active : ''}`}
            >
                <LogsIcon className='w-5 h-5' />
                Logs
            </Link>
        </nav>
    )
};

export default Navigation;