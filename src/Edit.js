import React, { useEffect, useState } from 'react'
import Header from "./components/Header";
import { useParams, useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

function Edit() {
    const navigate = useNavigate();
    const { id } = useParams();
    const [quote, setQuotes] = useState('');
    const [alertz, setAlertz] = useState(false);
    
      useEffect(() => {
        const fetchData = async () => {
            try {
              const token = localStorage.getItem('token');
                fetch(process.env.REACT_APP_BACKEND_URL+'/api/auth/user', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'bearer '+ token,
                    },
                })
                .then(res => res.json())
                .then(data => {
                    // console.log('Success:', data);
                    if( data.error=='Unauthorized' ){
                        window.location = '/login';
                    }
                    if( data.role!=1 ){
                        navigate('/');
                    }
                });
    
            await fetch(process.env.REACT_APP_BACKEND_URL+'/api/url/find/'+id, {
                  method: 'GET',
                  headers: {
                      'Content-Type': 'application/json',
                      'Authorization': 'bearer '+ localStorage.getItem('token'),
                  },
            })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                if( data.status===true && data.data ){
                    setQuotes(data.data.destination_url);
                }
            });
    
            } catch (err) {
            
            }
        }
        fetchData();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const data = new FormData(e.currentTarget);
        
        await fetch(process.env.REACT_APP_BACKEND_URL+'/api/url/update/'+id, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'bearer '+ localStorage.getItem('token'),
            },
            body: JSON.stringify({textz: data.get('textz')}),
        })
        .then(res => res.json())
        .then(data => {
            console.log(data);
            if( data.status===true ){
                navigate('/admin', { state: { message: 'Edit Success', type: 'success' } });
            }else{
                setAlertz(true);
            }
        });
    }

    const handleChange = (event) => {
        setQuotes(event.target.value);
    };
    const closeAlert = (e) => {
        setAlertz(false);
    }

    const login_box = {textAlign: 'center'};
    const input_textz = {width: '400px'};

    return (
        <div style={login_box}>
            <Header />

            {alertz===true && (
            <div className="grid grid-cols-1 justify-items-center mt-5">
                <div id="alert-4" className="flex items-center p-4 mb-4 text-yellow-800 rounded-lg bg-yellow-50 dark:bg-gray-800 dark:text-yellow-300" role="alert">
                    <svg className="shrink-0 w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z"/>
                    </svg>
                    <span className="sr-only">Info</span>
                    <div className="ms-3 text-sm font-medium">
                        รูปแบบ URL ไม่ถูกต้อง
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

            <div className='container mx-auto'>
                <h1 className='text-center mt-7 text-3xl font-bold underline mb-5'>Edit</h1>
                <form onSubmit={handleSubmit}>
                    <input type='text' name='textz' value={quote} onChange={handleChange} className="border-2 border-black pt-1 pb-1 pl-3 pr-3" style={input_textz} />
                    <button typee="button" className="border-2 border-black pt-1 pb-1 pl-5 pr-5">Update</button>
                </form>

                <br />
                <Link to="/admin" className="border-2 border-black py-0 px-5 hover:bg-blue-300 inline-block">Back</Link>
            </div>
        </div>
    )
}

export default Edit