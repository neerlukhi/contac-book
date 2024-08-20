import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

// token : eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjE3MTkwMjkzMjYwNjktMzc0NDM5NzM1IiwiaWF0IjoxNzE5MDI5MzI2LCJleHAiOjE3MTkyMDIxMjZ9.HogNbFnZaOGocdfSRYnT1_I8FxULE2ultb6C5Zd2G-k
export default function Add() {
    const navigate = useNavigate();
    const [data, SetData] = useState({
        firstName: '',
        lastName: '',
        mobileNo: '',
        email: '',
        nickName: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        SetData({ ...data, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log(data)

        axios.post('https://service.apikeeda.com/api/v1/contact-book', {
            "firstName": data.firstName,
            "lastName": data.lastName,
            "mobileNo": data.mobileNo,
            "email": data.email,
            "nickName": data.nickName
        },
            {
                headers: {
                    'x-apikeeda-key' : 'x1722838815097nry136664569pv',
                }
            }
        )

            .then(function (response) {
                console.log(response);
                toast.success('contact added', {
                    position: "bottom-right",
                    // className: 'foo-bar',
                    pauseOnHover: true,
                    autoClose: 1500,
                })
                navigate('/viewcon');
            })
    }


    return (
        <>
            <div class="bg-white py-6 sm:py-8 lg:py-12">
                <div class="mx-auto max-w-screen-2xl px-4 md:px-8">
                    <form onSubmit={handleSubmit} class="mx-auto grid max-w-screen-md gap-4 sm:grid-cols-2">
                        <div>
                            <label for="first-name" class="mb-2 inline-block text-sm text-gray-800 sm:text-base">First name</label>
                            <input value={data.firstName} onChange={handleChange} name="firstName" class="w-full rounded border bg-gray-50 px-3 py-2 text-gray-800 outline-none ring-indigo-300 transition duration-100 focus:ring" />
                        </div>

                        <div>
                            <label for="last-name" class="mb-2 inline-block text-sm text-gray-800 sm:text-base">Last name</label>
                            <input value={data.lastName} onChange={handleChange} name="lastName" class="w-full rounded border bg-gray-50 px-3 py-2 text-gray-800 outline-none ring-indigo-300 transition duration-100 focus:ring" />
                        </div>

                        <div class="sm:col-span-2">
                            <label for="company" class="mb-2 inline-block text-sm text-gray-800 sm:text-base">mobileNo</label>
                            <input required value={data.mobileNo} onChange={handleChange} name="mobileNo" class="w-full rounded border bg-gray-50 px-3 py-2 text-gray-800 outline-none ring-indigo-300 transition duration-100 focus:ring" />
                        </div>

                        <div class="sm:col-span-2">
                            <label for="email" class="mb-2 inline-block text-sm text-gray-800 sm:text-base">Email</label>
                            <input required value={data.email} type='email' onChange={handleChange} name="email" class="w-full rounded border bg-gray-50 px-3 py-2 text-gray-800 outline-none ring-indigo-300 transition duration-100 focus:ring" />
                        </div>

                        <div class="sm:col-span-2">
                            <label for="subject" class="mb-2 inline-block text-sm text-gray-800 sm:text-base">nickName</label>
                            <input value={data.nickName} onChange={handleChange} name="nickName" class="w-full rounded border bg-gray-50 px-3 py-2 text-gray-800 outline-none ring-indigo-300 transition duration-100 focus:ring" />
                        </div>



                        <div class="flex items-center justify-between sm:col-span-2">
                            <button type='submit' class="inline-block rounded-lg bg-indigo-500 px-8 py-3 text-center text-sm font-semibold text-white outline-none ring-indigo-300 transition duration-100 hover:bg-indigo-600 focus-visible:ring active:bg-indigo-700 md:text-base">Add</button>
                        </div>


                    </form>

                </div>
            </div>
        </>
    )
}
