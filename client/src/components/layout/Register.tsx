import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import GoogleImage from "../../UI/img/google.png";
import { useFetchUserQuery, useUserRegistrationMutation } from '../../redux/store';

const Register = () => {
    console.log("In Register Component");
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('')
    const [registrationError, setRegistrationError] = useState('');

    const navigate = useNavigate();
    const { data } = useFetchUserQuery();
    const { refetch } = useFetchUserQuery();
    const [userRegistration, { isLoading }] = useUserRegistrationMutation();

    // Redirect the user if the user already logged in
    // useEffect(() => {
    //     if (data) {
    //       navigate('/dashboard');
    //     }
    // }, [data, navigate]);

    const handleRegister = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        try {
            const credentials = {
                first_name: firstName,
                last_name: lastName,
                email: email,
                password: password
            };

            const response = await userRegistration(credentials).unwrap();

            console.log(response);

            if (response.user) {
                // Registration successed, refetch the most updated user data
                await refetch();
                navigate('/dashboard');
            } else {
                // Registration failed, display error message
                setRegistrationError(data.error);
            }
        } catch (error) {
            console.error('Error registering user:', error);
            setRegistrationError('An error occurred during registration.');
        }
    }

    return (
        <div className="flex-grow flex justify-center">
            <div className="form__container flex flex-col w-96 mt-28">
                <h2 className="text-center text-4xl font-semibold">Sign up</h2>
                {/* Registration error message */}
                {registrationError && <div>{registrationError}</div>}

                <div className="flex flex-col mt-10">
                    <button className="spread_animation flex items-center justify-center gap-3 w-full btn-gradient-border text-primary-purple bg-green-300 py-2 px-8 text-center">
                        <a href="/auth/google">Sign up with Google</a>
                        <img className="google_img-icon w-5" src={GoogleImage} alt="google icon" />
                    </button>

                    <div className="line-grey"></div>

                    <form className="form flex flex-col mb-10" onSubmit={handleRegister}>
                        <div className="field-group flex flex-col mb-5">
                            <label className="label" htmlFor="first_name">First Name</label>
                            <input className="input"
                                type="text" 
                                placeholder="Enter First Name"
                                value={firstName}
                                onChange={((e) => setFirstName(e.target.value))}
                                required
                            />
                        </div>
                    

                        <div className="field-group flex flex-col mb-5">
                            <label className="label" htmlFor="last_name">Last Name</label>
                            <input className="input"
                                type="text" 
                                placeholder="Enter Last Name"
                                value={lastName}
                                onChange={((e) => setLastName(e.target.value))}
                                required
                            />
                        </div>
                        

                        <div className="field-group flex flex-col mb-5">
                            <label className="label" htmlFor="email">Email</label>
                            <input className="input"
                            type="email" 
                            placeholder="Enter Email"
                            value={email}
                            onChange={((e) => setEmail(e.target.value))}
                            required
                            />
                        </div>
                        

                        <div className="field-group flex flex-col mb-10">
                            <label className="label" htmlFor="password">Password</label>
                            <input className="input "
                                type="password"
                                placeholder="Enter Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                    

                        <button className="btn-primary" disabled={isLoading}>{isLoading ? 'Registering' : 'Sign up'}</button>
                    </form>
                </div>
                

                <div>Already have an account? <a className="ml-1 col text-blue-500" href="/login">Login</a></div>
            </div>
        </div>
    )
};

export default Register;