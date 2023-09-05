import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {  toast } from 'react-toastify';
import GoogleImage from '../../UI/img/google.png';

import { useFetchUserQuery, useUserRegistrationMutation } from '../../redux/store';

const Register = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('')

    const navigate = useNavigate();
    const { refetch } = useFetchUserQuery();
    const [userRegistration, results] = useUserRegistrationMutation();

    const handleRegister = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        try {
            const credentials = {
                firstName: firstName,
                lastName: lastName,
                email: email,
                password: password
            };

            let response = await userRegistration(credentials).unwrap();

            if ((response as any)?.error?.status > 200) {
                throw new Error((response as any)?.error?.data?.error);
            }

            if (response.user) {
                // Registration succeeded, refetch the most updated user data
                await refetch();
                navigate('/dashboard');
                toast.success('Successfully signed up.');
            }

            
        } catch (error) {
            // Email already exist
            if (typeof error === 'object') {
                toast.error((error as Error).message);
            } else {
                toast.error('Failed To Register.')
            }
        }
    }

    return (
        <div className='flex-grow flex justify-center'>
            <div className='form__container flex flex-col w-96 mt-28'>
                <h2 className='text-center text-4xl font-semibold'>Sign up</h2>

                <div className='flex flex-col mt-10'>
                    <button className='spread_animation flex items-center justify-center gap-3 w-full btn-gradient-border text-primary-purple bg-green-300 py-2 px-8 text-center'>
                        <a href='/auth/google'>Sign up with Google</a>
                        <img className='google_img-icon w-5' src={GoogleImage} alt='google icon' />
                    </button>

                    <div className='line-grey'></div>

                    <form className='form flex flex-col mb-10' onSubmit={handleRegister}>
                        <div className='field-group flex flex-col mb-5'>
                            <label className='label' htmlFor='first_name'>First Name</label>
                            <input 
                                className='input'
                                id='first_name'
                                type='text' 
                                placeholder='Enter First Name'
                                value={firstName}
                                onChange={((e) => setFirstName(e.target.value))}
                                required
                            />
                        </div>
                    

                        <div className='field-group flex flex-col mb-5'>
                            <label className='label' htmlFor='last_name'>Last Name</label>
                            <input 
                                className='input'
                                id='last_name'
                                type='text' 
                                placeholder='Enter Last Name'
                                value={lastName}
                                onChange={((e) => setLastName(e.target.value))}
                                required
                            />
                        </div>
                        

                        <div className='field-group flex flex-col mb-5'>
                            <label className='label' htmlFor='email'>Email</label>
                            <input className='input'
                            type='email' 
                            placeholder='Enter Email'
                            value={email}
                            onChange={((e) => setEmail(e.target.value))}
                            required
                            />
                        </div>
                        

                        <div className='field-group flex flex-col mb-10'>
                            <label className='label' htmlFor='password'>Password</label>
                            <input 
                                className='input'
                                id='password'
                                type='password'
                                placeholder='Enter Password'
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                minLength={5}
                                required
                            />
                        </div>
                    

                        <button className='btn-primary' disabled={results.isLoading}>{results.isLoading ? 'Registering' : 'Sign up'}</button>
                    </form>
                </div>
                

                <div>Already have an account? <a className='ml-1 col text-blue-500' href='/login'>Login</a></div>
            </div>
        </div>
    )
};

export default Register;