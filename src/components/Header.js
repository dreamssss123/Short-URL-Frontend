// import React from 'react'

function Header() {

    const logoutHandle = (event) => {
        event.preventDefault();

        fetch(process.env.REACT_APP_BACKEND_URL+'/api/auth/logout', {
            method: 'DELETE',
            headers: {
                // 'Content-Type': 'application/json',
                'Authorization': 'bearer '+ localStorage.getItem('token'),
            },
        })
        // .then(res => res.json())
        .then(data => {
            console.log(data);
            localStorage.removeItem("token");
            localStorage.removeItem("id");
            localStorage.removeItem("name");
            localStorage.removeItem("email");
            window.location = '/login';
        });
    }

  return (
    <div className='bg-black'>
        <div className='container mx-auto grid grid-cols-6 text-white py-5'>

            {localStorage.getItem('email')!=null && localStorage.getItem('email')!='' ? (
                <>
                    <div className='col-span-3 text-4xl'>TEST WEB</div>
                    <div className='pt-2 col-span-3 text-right'>
                        <span>Name: </span>  <span className='font-bold'>{localStorage.getItem('name')} &nbsp; | &nbsp; </span>
                        <a onClick={logoutHandle} className='cursor-pointer'>Logout</a>
                    </div>
                </>
            ) : (
                <>
                    <div className='col-span-6 text-4xl text-center'>TEST WEB</div>
                </>
            )}

            


        </div>
    </div>
  )
}

export default Header