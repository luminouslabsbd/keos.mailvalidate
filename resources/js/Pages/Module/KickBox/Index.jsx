import { Link, router, usePage } from '@inertiajs/react';
import MainLayout from '../../Layout/Mainlayout';
import React, { useState, Fragment, useEffect } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import DeleteModal from '../../Component/DeleteModal';

function Index() {
    const { allKickBoxData, base_url } = usePage().props;
    const [isDeleteModal,setIsDeleteModal] = useState(false);
    const [deleteId,setDeleteId] = useState(false);

    const handleCreate = () => {
        router.get(`/admin/kickbox/create`);
    };

    const handleEdit = (id) => {
        router.get(`/admin/kickbox/${id}/edit`);
    };
    const handleDelete = (id) => {
        setDeleteId(id);
        setTimeout(() => {
            setIsDeleteModal(true);
        }, 10);

    };

    const handleCheckboxChange = async (id, checked) => {
        try {
            const updatedStatus = checked ? 1 : 0;
            router.post("/admin/kickbox/status", { id, status: updatedStatus });
        } catch (error) {
            console.error('Error updating domain:', error);
        }
    };

    return (
        <>
            <div className="domains-header grid grid-cols-12 gap-4">
                <div className="col-span-12 pt-4">
                    <div className="panel flex items-center overflow-x-auto whitespace-nowrap p-3 ">
                        <div className="rounded-full bg-[#ff6243] p-1.5 text-white ring-2 ring-primary/30 ltr:mr-3 rtl:ml-3 h-[35px] w-[35px] flex items-center justify-center">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5">
                                <path d="M19.0001 9.7041V9C19.0001 5.13401 15.8661 2 12.0001 2C8.13407 2 5.00006 5.13401 5.00006 9V9.7041C5.00006 10.5491 4.74995 11.3752 4.28123 12.0783L3.13263 13.8012C2.08349 15.3749 2.88442 17.5139 4.70913 18.0116C9.48258 19.3134 14.5175 19.3134 19.291 18.0116C21.1157 17.5139 21.9166 15.3749 20.8675 13.8012L19.7189 12.0783C19.2502 11.3752 19.0001 10.5491 19.0001 9.7041Z" stroke="currentColor" strokeWidth="1.5"/>
                                <path opacity="0.5" d="M7.5 19C8.15503 20.7478 9.92246 22 12 22C14.0775 22 15.845 20.7478 16.5 19" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                            </svg>
                        </div>
                        <ul className="flex space-x-2 rtl:space-x-reverse">
                            <li>
                                <Link href={`${base_url}/admin/dashboard`} className="text-[#ff6243] hover:underline">Dashboard</Link>
                            </li>
                            <li className="before:content-['/'] ltr:before:mr-2 rtl:before:ml-2">
                                <span>Kickbox List</span>
                            </li>
                        </ul>
                        <div className='ml-auto'>
                            <a href="#" className='btn btn-info btn-sm' onClick={() => handleCreate()}>+ Add</a>
                        </div>
                    </div>
                </div>
            </div>

            <div className="pt-5">
                <div className="col-span-12 pt-4">
                    <div className="panel">
                        <div className="mb-2">
                            <h5 className="font-bold">Kickbox list</h5>
                        </div>
                        <hr/>

                        <table className="table">
                            <thead>
                                <tr>
                                    <th>SL</th>
                                    <th>Name</th>
                                    <th>Api key</th>
                                    <th>Created By</th>
                                    <th>Status</th>
                                    <th className="!text-right">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {console.log(allKickBoxData)}
                                {allKickBoxData.map((kickbox, index) => (
                                    <tr key={kickbox.id}>
                                        <td>{index + 1}</td>
                                        <td>{kickbox.name}</td>
                                        <td>{kickbox.api_key}</td>
                                        <td>{kickbox.created_by}</td>
                                        <td>
                                            <label className="w-12 h-6 relative">
                                                <input
                                                    type="checkbox"
                                                    className="custom_switch absolute w-full h-full opacity-0 z-10 cursor-pointer peer"
                                                    id={`custom_switch_checkbox${index}`}
                                                    checked={kickbox.status === 1} // Check if status is 1
                                                    onChange={(e) => handleCheckboxChange(kickbox.id, e.target.checked)} // Handle checkbox change
                                                />
                                                <span className="bg-[#ebedf2] dark:bg-dark block h-full rounded-full before:absolute before:left-1 before:bg-white dark:before:bg-white-dark dark:peer-checked:before:bg-white before:bottom-1 before:w-4 before:h-4 before:rounded-full peer-checked:before:left-7 peer-checked:bg-primary before:transition-all before:duration-300"></span>
                                            </label>
                                        </td>
                                        <td className="!tex-right">
                                            <div className="flex justify-end">
                                                <a href="#" className="inline-block px-2 py-1 leading-none border border-blue-500 text-blue-500 rounded-md hover:text-white hover:bg-blue-500 mr-2" title="Edit" onClick={() => handleEdit(kickbox.id)}>
                                                    <i className="las la-edit"></i>Edit
                                                </a>
                                                <a href="#" className="inline-block px-2 py-1 leading-none border border-red-500 text-red-500 rounded-md hover:text-white hover:bg-red-500 mr-2" title="Delete" onClick={() => handleDelete(kickbox.id)}>
                                                    <i className="las la-delete"></i>Delete
                                                </a>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            <DeleteModal
                isDeleteNoteModal={isDeleteModal}
                setIsDeleteNoteModal={setIsDeleteModal}
                fileToDelete={deleteId}
                route={'kickbox'}
            >

            </DeleteModal>

        </>
    );
}
Index.layout = (page) => (
    <MainLayout children={page} title="Kickbox || Kickbox list" />
);
export default Index;