import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

export default function Dashboard() {

  const [data, SetData] = useState([]);

  const token = 'x1722838815097nry136664569pv';

  useEffect(() => {
    axios.get('https://service.apikeeda.com/api/v1/contact-book',
      {
        headers: { 'x-apikeeda-key' : 'x1722838815097nry136664569pv' }
      }
    )
      .then(function (response) {
        // console.log(response.data);
        SetData(response.data.data)
      })

  }, [])

  return (
    <>
      <Link to={'/viewcon'}>
        <div className=' bg-[#0d1b2a] flex flex-col justify-center items-center w-[300px] h-[250px]'>
          <h1 className='text-white m-0 text-[24px]'>Total contact</h1>
          <p className='text-white text-[22px] mt-2'>{ data.length}</p>
        </div>
      </Link>

    </>
  )
}