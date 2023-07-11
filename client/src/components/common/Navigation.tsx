import React from 'react';
import { Link } from 'react-router-dom';
import { ReactComponent as EventIcon } from '../../UI/img/calendar.svg';
import { ReactComponent as PeopleIcon } from '../../UI/img/group.svg';
import { ReactComponent as LogsIcon } from '../../UI/img/history.svg';

const Navigation = ({ isActive }: any) => {

    const active = 'bg-purple-light-1 rounded-md text-primary-purple fill-primary-purple';

    return (
        <nav className='flex basis-1/4 flex-col text-lg font-semibold gap-2'>
            <Link 
                to={'/dashboard'}
                className={`
                    flex items-center gap-2 py-3 rounded-md
                    ${isActive === 'events' ? active : ''}`}
            >
                <EventIcon className='w-5 h-5 ml-5'/>
                Events
            </Link>

            <Link
                to={'/people'}
                className={`
                    flex items-center gap-2 py-3 rounded-md
                    ${isActive === 'people' ? active : ''}`}
            >
                <PeopleIcon className='w-5 h-5 ml-5' />
                People
            </Link>

            <Link 
                to={'/logs'}
                className={`
                    flex items-center gap-2 py-3 rounded-md
                    ${isActive === 'logs' ? active : ''}`}
            >
                <LogsIcon className='w-5 h-5 ml-5' />
                Logs
            </Link>
        </nav>
    )
};

export default Navigation;