import React from 'react';
import { Link } from 'react-router-dom';
let ErrorAnimation = require('../../UI/img/404_error.gif');

const Error = () => {
    return (
        <div className='flex-grow flex flex-col items-center mt-10'>
            <h1 className='text-3xl font-normal'>Sorry the page you requested was <span className='font-medium'>not found.</span></h1>
            <Link to='/' className='text-2xl text-blue-500 my-2'>Go Back</Link>
            <img className="max-w-md" src={ErrorAnimation} alt="Error 404" />
        </div>
    )
};

export default Error;