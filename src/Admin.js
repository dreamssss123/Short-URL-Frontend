import React, { useEffect, useState } from 'react';
import Header from "./components/Header";
// import Button from '@mui/material/Button';
import { Link, useNavigate, useLocation } from "react-router-dom";

export default function App() {
// console.log(process.env.REACT_APP_BACKEND_URL);
  const navigate = useNavigate();
  const location = useLocation();
  const [quotes, setQuotes] = useState([]);
  const [flashMessage, setFlashMessage] = useState(null);

  useEffect(() => {
    if (location.state && location.state.message) {
      setFlashMessage({
        message: location.state.message,
        type: location.state.type || 'info',
      });
    }
    fetchData();

  }, [location]);

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
              console.log(data);
              if( data.error=='Unauthorized' ){
                window.location = '/login';
              }
              if( data.role!=1 ){
                navigate('/');
              }
          });

          const resz = await fetch(process.env.REACT_APP_BACKEND_URL+'/api/url/list', {
              method: 'GET',
              headers: {
                  'Content-Type': 'application/json',
                  'Authorization': 'bearer '+ localStorage.getItem('token'),
              },
          })
          .then(res => res.json())
          .then(data => {
              console.log(data);
              if( data.status===true && data.datas ){
                setQuotes(data.datas);
              }
          });

        } catch (err) {
        
        }
    }

  const closeFlashMess = (e) => {
    setFlashMessage(null);
  }

  const deleteUrl = (event) => {
      event.preventDefault();
      // const data = new FormData(event.currentTarget);
      // console.log(event.currentTarget.getAttribute('data-id'));

      if (window.confirm("Conform Delete") == true) {
          fetch(process.env.REACT_APP_BACKEND_URL+'/api/url/delete/'+event.currentTarget.getAttribute('data-id'), {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json',
                  'Authorization': 'bearer '+ localStorage.getItem('token'),
              },
          })
          .then(res => res.json())
          .then(data => {
            // console.log(data);
            fetchData();
          });
      }
  }

  const stylesome = {
    display: 'inline-block',
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
    width: '250px'
  };

  return (
    <div>
      <Header />
      
      <div className='container mx-auto'>

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


          <h1 className='text-center mt-7 text-3xl font-bold underline'>รายการ</h1>

          <div className='text-right w-[1300px] mx-auto'>
              <Link to='/add' className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">Add +</Link>
          </div>

          <div className='mt-5 border-[0.5px] border-black w-[1300px] mx-auto'>
            
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-200 dark:bg-red-700 dark:text-gray-400">
                  <tr>
                      <th scope="col" className="px-6 py-3">URL</th>
                      <th scope="col" className="px-6 py-3">Short URL</th>
                      <th scope="col" className="px-6 py-3">Created By</th>
                      <th scope="col" className="px-6 py-3">Created Date</th>
                      <th scope="col" className="px-6 py-3">Updated By</th>
                      <th scope="col" className="px-6 py-3">Updated Date</th>
                      <th className='w-[12%]'></th>
                  </tr>
              </thead>
              <tbody>
                {quotes.length > 0 ? (
                  <>
                    {quotes.map((item, id) => (
                      <tr key={id} zz-dd={id} className=" bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200">
                          <td scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white" style={stylesome} title={item.destination_url}>
                              {item.destination_url}
                          </td>
                          <td className="px-6 py-4">
                              {process.env.REACT_APP_BACKEND_URL+'/short/'+item.url_key}
                          </td>
                          <td className="px-6 py-4">
                              {item.create_name}
                          </td>
                          <td className="px-6 py-4">
                              {item.created_at2}
                          </td>
                          <td className="px-6 py-4">
                              {item.update_name}
                          </td>
                          <td className="px-6 py-4">
                              {item.updated_at2}
                          </td>
                          <td>
                            <Link to={`/edit/${item.id}`} className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded">Edit</Link>
                            &nbsp; &nbsp;
                            <button type="button" onClick={deleteUrl} data-id={item.id} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">Delete</button>
                          </td>
                      </tr>
                    ))}
                  </>
                ) : (
                    <tr>
                      <td className="text-center text-3xl mb-4 py-5" colSpan="6">No URL</td>
                    </tr>
                )}
              </tbody>
            </table>
          </div>

      </div>
    </div>
  );
}

