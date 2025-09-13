import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import Header from "./components/Header";
import { Link, useLocation } from 'react-router-dom';

export default function SignInSide() {
  
  const navigate = useNavigate();
  const location = useLocation();
  const [alertz, setAlertz] = useState(false);
  const [flashMessage, setFlashMessage] = useState(null);


  useEffect(() => {
    if (location.state && location.state.message) {
      setFlashMessage({
        message: location.state.message,
        type: location.state.type || 'info',
      });
    }
  }, [location]);


  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    const jsonData = {
        email: data.get('email'),
        password: data.get('password')
    };
    // console.log(jsonData);

    fetch(process.env.REACT_APP_BACKEND_URL+'/api/auth/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(jsonData),
    })
    .then(res => res.json())
    .then(data => {
        console.log(data);
        if( data.user && data.access_token && data.access_token!='' ){
            // // alert('login success');
            localStorage.setItem('token', data.access_token);
            localStorage.setItem('id', data.user.id);
            localStorage.setItem('email', data.user.email);
            localStorage.setItem('name', data.user.name);

            if( data.user.role==1 ){
                navigate('/admin');
            }else{
                navigate('/');
            }
            
        }else{
            // alert('Login Failed');
            setAlertz(true);
        }
    })
    .catch((error) => {
        // console.error('Error: ', error);
        console.log(error);
        // alert('Error');
        setAlertz(true);
    });
  }

  const closeAlert = (e) => {
    setAlertz(false);
  }
  const closeFlashMess = (e) => {
    setFlashMessage(null);
  }

  const h1z = {textAlign: 'center', padding: '10px'};
  const login_box = {textAlign: 'center'};

  return (
    <div>
        <Header />

        <div style={login_box}>

            {flashMessage && (
            <div className="grid grid-cols-1 justify-items-center mt-5">
                <div id="alert-4" className="flex items-center p-4 mb-4 text-green-800 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400" role="alert">
                    <svg className="shrink-0 w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z"/>
                    </svg>
                    <span className="sr-only">Info</span>
                    <div className="ms-3 text-sm font-medium">
                        {flashMessage.message}
                    </div>
                    <button type="button" onClick={closeFlashMess} className="ms-auto -mx-1.5 -my-1.5 bg-green-50 text-green-500 rounded-lg focus:ring-2 focus:ring-green-400 p-1.5 hover:bg-green-200 inline-flex items-center justify-center h-8 w-8 dark:bg-gray-800 dark:text-yellow-300 dark:hover:bg-gray-700" data-dismiss-target="#alert-4" aria-label="Close">
                        <span className="sr-only">Close</span>
                        <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                        </svg>
                    </button>
                </div>
            </div>
            )}

            {alertz===true && (
            <div className="grid grid-cols-1 justify-items-center mt-5">
                <div id="alert-4" className="flex items-center p-4 mb-4 text-yellow-800 rounded-lg bg-yellow-50 dark:bg-gray-800 dark:text-yellow-300" role="alert">
                    <svg className="shrink-0 w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z"/>
                    </svg>
                    <span className="sr-only">Info</span>
                    <div className="ms-3 text-sm font-medium">
                        Login Failed.
                    </div>
                    <button type="button" onClick={closeAlert} className="ms-auto -mx-1.5 -my-1.5 bg-yellow-50 text-yellow-500 rounded-lg focus:ring-2 focus:ring-yellow-400 p-1.5 hover:bg-yellow-200 inline-flex items-center justify-center h-8 w-8 dark:bg-gray-800 dark:text-yellow-300 dark:hover:bg-gray-700" data-dismiss-target="#alert-4" aria-label="Close">
                        <span className="sr-only">Close</span>
                        <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                        </svg>
                    </button>
                </div>
            </div>
            )}

            <h1 className='text-center mt-7 text-3xl font-bold underline mb-5'>Login</h1>
            <form onSubmit={handleSubmit}>
                <input type='email' name='email' placeholder="Email" className="border-2 border-black pt-1 pb-1 pl-3 pr-3" />
                <br /><br />
                <input type='password' name='password' placeholder="Password" className="border-2 border-black pt-1 pb-1 pl-3 pr-3" />
                <br /><br />
                <button typee="button" className="border-2 border-black pt-1 pb-1 pl-5 pr-5">Login</button>
            </form>
            <br />
            <Link to="/register" className="text-blue-500 underline">Register &#129034;</Link>
            
        </div>
    </div>
  );
}