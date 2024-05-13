import { Link, router, usePage } from '@inertiajs/react';
import React, { useState } from 'react'
import MainLayout from '../../Layout/Mainlayout';
import { useForm } from "react-hook-form"

function Create() {
    const [inputValue, setInputValue] = useState("");
    const { register: addRegister, handleSubmit: handleAddSubmit, formState: addFormState, reset: addReset } = useForm();
    const { base_url } = usePage().props;
    const onSubmit = (data) => {
        router.post("/admin/kickbox/store", data);
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
                                <span>Kickbox Create</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            <div className="pt-5">
                <div className="col-span-12 pt-4">
                    <div className="panel">
                        <div className="mb-2">
                            <h5 className="mb-2 font-bold">Add New Kickbox</h5>
                            <hr/>
                        </div>
                        <form onSubmit={handleAddSubmit(onSubmit)} method="post">
                            <label className="font-normal">Name<span className="text-red-500">*</span></label>
                            <input type="text" {...addRegister("name", { required: "name is required" })} className="form-input" placeholder="Enter your name"/>
                            {addFormState.errors.name && <p className="text-red-500" role="alert">{addFormState.errors.name.message}</p>}

                            <label className="font-normal">Api Key<span className="text-red-500">*</span></label>
                            <input type="text" {...addRegister("api_key", { required: "Api key is required" })} className="form-input" placeholder="Enter your api key"/>
                            {addFormState.errors.api_key && <p className="text-red-500" role="alert">{addFormState.errors.api_key.message}</p>}

                            <button type="submit" className="btn btn-success mt-6">Submit</button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}
Create.layout = (page) => (
    <MainLayout children={page} title="Kickbox || Kickbox create" />
);
export default Create;