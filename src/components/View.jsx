import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { toast } from 'react-toastify';
import { IoMdTrash } from "react-icons/io";

export default function View() {

    const [search, setSearch] = useState('');
    const [data, setData] = useState(null);
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        mobileNo: '',
        email: '',
        nickName: ''
    });

    const token = 'x1722838815097nry136664569pv'

    useEffect(() => {
        axios.get('https://service.apikeeda.com/api/v1/contact-book', {
            headers: { 'x-apikeeda-key' : token }
        })
            .then(response => {
                setData(response.data.data);
            })
            .catch(error => {
                console.error("There was an error fetching the data!", error);
            });
    }, []);

    const handleDelete = (item) => {
        axios.delete(`https://service.apikeeda.com/api/v1/contact-book/${item._id}`,
            {
                headers: { 'x-apikeeda-key' : token }
            }
        )
            .then(response => {
                // Update the local state to remove the deleted item
                setData(data.filter(contact => contact._id !== item._id));
                toast.success('contact deleted', {
                    position: "bottom-right",
                    // className: 'foo-bar',
                    pauseOnHover: true,
                    autoClose: 1500,
                })
            })
            .catch(error => {
                console.error("There was an error deleting the item!", error);
            });
    };

    const handleEdit = (contact) => {
        setFormData(contact); // Populate form data with contact details
        handleShow(); // Show the modal
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSaveChanges = (e) => {
        e.preventDefault();
        axios.patch(`https://service.apikeeda.com/api/v1/contact-book/${formData._id}`, formData, {
            headers: { 'x-apikeeda-key' : token }
        })
            .then(response => {
                console.log('Contact updated successfully:', response.data);
                // setData(
                //   data.map((item) => {
                //     item._id === formData._id ? response.data.data : contact
                //   })
                // )
                setData(data.map(contact => contact._id === formData._id ? response.data.data : contact));
                handleClose();
                // toast('contact updated', {
                //     position: "top",
                //     autoClose: 150,
                //     pauseOnHover: true,
                //     // transition: Bounce,
                // });
            })
            .catch(error => {
                console.error("There was an error updating the item!", error);
            });
    };

    useEffect(() => {
        if (search) {
            axios.get(`https://service.apikeeda.com/api/v1/contact-book/search?search=${search}`, {
                headers: { 'x-apikeeda-key' : token }
            })
                .then(response => {
                    setData(response.data.data);
                })
                .catch(error => {
                    console.error("There was an error searching the data!", error);
                });
        } else {
            axios.get('https://service.apikeeda.com/api/v1/contact-book', {
                headers: { 'x-apikeeda-key' : token }
            })
                .then(response => {
                    setData(response.data.data);
                })
                .catch(error => {
                    console.error("There was an error fetching the data!", error);
                });
        }
    }, [search]);

    const tostii = () => {
        toast.success('contact updated', {
            position: "bottom-right",
            // className: 'foo-bar',
            pauseOnHover: true,
            autoClose: 1800,
        })
    }

    return (
        <>
            <div className="container mx-auto">
                <div className='flex py-4 align-items-center'>
                    <input
                        onChange={(e) => setSearch(e.target.value)}
                        value={search}
                        type="text"
                        placeholder='Search contact'
                        className='bg-[#0d1b2a] rounded-md flex justify-end px-3 py-2 w-[400px] text-white'
                    />
                </div>

                <table className="min-w-full border-collapse block md:table">
                    <thead className="block md:table-header-group">
                        <tr className="border border-gray-300 md:border-none block md:table-row absolute -top-full md:top-auto -left-full md:left-auto md:relative">
                            <th className="bg-gray-100 p-2 text-gray-700 font-bold md:border md:border-gray-300 text-left block md:table-cell">Name</th>
                            <th className="bg-gray-100 p-2 text-gray-700 font-bold md:border md:border-gray-300 text-left block md:table-cell">Mobile No</th>
                            <th className="bg-gray-100 p-2 text-gray-700 font-bold md:border md:border-gray-300 text-left block md:table-cell">Edit</th>
                            <th className="bg-gray-100 p-2 text-gray-700 font-bold md:border md:border-gray-300 text-left block md:table-cell">Remove</th>
                        </tr>
                    </thead>
                    <tbody className="block md:table-row-group">
                        {
                            data != null && data.map((item, index) => (
                                <tr key={index} className="bg-white border border-gray-300 md:border-none block md:table-row">
                                    <td className="p-2 md:border md:border-gray-300 text-left block md:table-cell">{item.firstName}</td>
                                    <td className="p-2 md:border md:border-gray-300 text-left block md:table-cell d-flex justify-center">{item.mobileNo}</td>
                                    <td className="p-2 md:border md:border-gray-300 text-left block md:table-cell">
                                        <a onClick={() => handleEdit(item)} href="#" className="text-blue-500 hover:text-blue-700 d-flex justify-center">Edit</a>
                                    </td>
                                    <td className="p-2 md:border md:border-gray-300 text-left block md:table-cell">
                                        <a href="#" className="text-red-500 red hover:text-red-700 d-flex justify-center" onClick={() => handleDelete(item)}>Delete</a>
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Update Contacts Info</Modal.Title>
                    </Modal.Header>
                    <Modal.Title className='d-flex justify-center mt-4'>ADD NEW CONTACT</Modal.Title>
                    <Modal.Body>
                        <form onSubmit={handleSaveChanges}>
                            <div className="col mt-3">
                                <input type="text" name="firstName" className="form-control" value={formData.firstName} onChange={handleChange} placeholder="First Name" required />
                            </div>
                            <div className="col mt-3">
                                <input type="text" name="lastName" className="form-control" value={formData.lastName} onChange={handleChange} placeholder="Last Name" required />
                            </div>
                            <div className="col mt-3">
                                <input type="tel" name="mobileNo" className="form-control" value={formData.mobileNo} onChange={handleChange} placeholder="Mobile Number" required />
                            </div>
                            <div className="col mt-3">
                                <input type="email" name="email" className="form-control" value={formData.email} onChange={handleChange} placeholder="Email" required />
                            </div>
                            <div className="col mt-3">
                                <input type="text" name="nickName" className="form-control" value={formData.nickName} onChange={handleChange} placeholder="Nick Name" required />
                            </div>
                            <div className="col-5 mt-4 mx-auto">
                                <button type="submit" onClick={tostii} className='form-control btn btn-dark'>Save Changes</button>
                            </div>
                        </form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Close
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>
        </>
    );
}
