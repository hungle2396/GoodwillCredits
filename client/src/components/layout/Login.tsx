import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { useFetchUserQuery, useUserLoginMutation } from '../../redux/store';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import GoogleImage from "../../UI/img/google.png";

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { refetch: currentUserRefetch } = useFetchUserQuery();
  const [userLogin, { isLoading }] = useUserLoginMutation();

  const navigate = useNavigate();

  const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const credentials = { email, password };
    
      const response = await userLogin(credentials).unwrap();
      
      if (response.user) {
        await currentUserRefetch();
        navigate('/dashboard');
      }
    } catch (error) {
        if ((error as errorMessageProp).status === 401) {
          const errorMessage = (error as errorMessageProp)?.data?.error;
          toast.error(errorMessage);
        } else {
          toast.error('Error logging in.');
        }
    }
  };

  return (
    <div className="flex-grow flex justify-center">
      <div className="container flex flex-col w-96 mt-28">
        <h2 className="text-center text-4xl font-semibold">Log in</h2>
      {/* {registrationError && <div>{toast.error(registrationError)}</div>} */}

        <div className="flex flex-col mt-10">
          <button className="spread_animation flex items-center justify-center gap-3 w-full btn-gradient-border text-primary-purple bg-green-300 py-2 px-8 text-center">
            <a href="/auth/google">Login with Google</a>
            <img className="w-5" src={GoogleImage} alt="google icon" />
          </button>

          <div className="line-grey"></div>

          <form className="form flex flex-col mb-10" onSubmit={handleLogin}>
            <div className="field-group flex flex-col mb-5">
              <label className="label" htmlFor="email">Email</label>
              <input
                className="input"
                type="email"
                id="email"
                name="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            
            <div className="field-group flex flex-col mb-10">
              <label className="label" htmlFor="password">Password</label>
              <input
                className="input"
                type="password"
                id="password"
                name="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            
            <button className={`btn-primary ${isLoading && 'bg-primary-purple-dark'}`} disabled={isLoading}>
              {isLoading ? 'Logging in' : 'Login'}
            </button>
          </form>

          <div>Don't have an account? <a className="ml-1 col text-blue-500" href="/register">Sign up</a></div>
        </div>
      </div>
    </div>
  );
};

export default Login;