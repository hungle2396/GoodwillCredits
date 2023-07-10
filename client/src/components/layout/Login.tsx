import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { useFetchUserQuery, useUserLoginMutation } from '../../redux/store';
import GoogleImage from "../../UI/img/google.png";

const Login = () => {
  console.log("In Login Component");
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [registrationError, setRegistrationError] = useState('');
  const { data, refetch, error } = useFetchUserQuery();
  const [userLogin, { isLoading }] = useUserLoginMutation();

  const navigate = useNavigate();
  
  // If the user already authenticated
  // Redirect the user to dashboard route

  // useEffect(() => {
  //   if (data) {
  //     navigate('/dashboard');
  //   } else {
  //     console.error(error);
  //   }
  // }, [data, navigate, error]);

  const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      console.log("In the try handleLogin function");
      const credentials = { email, password };
      console.log('credentials: ', credentials);

      console.log("before user login");
      const response = await userLogin(credentials).unwrap();
      console.log('response: ', response);

      if (response.user) {
        await refetch();
        navigate('/dashboard');
      } else {
        // Registration failed, display error message
          setRegistrationError(response.message);
      }
      
    } catch (error) {
        console.error('Error Logging in user:', error);
        setRegistrationError('An error occurred during login.');
    }
  };

  return (
    
    <div className="flex-grow flex justify-center">
      <div className="container flex flex-col w-96 mt-28">
        <h2 className="text-center text-4xl font-semibold">Log in</h2>
      {registrationError && <div>{registrationError}</div>}

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
            
            <button className="btn-primary" disabled={isLoading}>
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