import { Box } from '@mantine/core';
import { Link, router, usePage } from '@inertiajs/react';
import MainLayout from '../../Layout/Mainlayout';
import React, { useState, Fragment, useEffect } from 'react';
import PreviewModal from '../../Component/PreviewModal';
import { DataTable } from 'mantine-datatable';
import axios from 'axios';

import Swal from 'sweetalert2';
function EmailList() {

    const { emailList, base_url } = usePage().props;
    const [isEmailList,setEmailList] = useState(emailList);
    const [modal2, setModal2] = useState(false);
    const [modalBody, setModalBody] =useState(false);
    const [modalTitle, setModalTitle] = useState(false);

    const [page, setPage] = useState(1);
    const PAGE_SIZES = [10, 20, 30, 50, 100];
    const [pageSize, setPageSize] = useState(PAGE_SIZES[0]);
    const initialRecords = isEmailList.slice(0, pageSize);
    const [recordsData, setRecordsData] = useState(initialRecords);

    const handleView = (response) =>{
        setModal2(true);
        setModalTitle("API RESPONSE")
        setModalBody(response)
    }
    const handleCheckboxChange = async (id, checked) => {
        try {
            const updatedStatus = checked ? 1 : 0;
            showAlert(id,updatedStatus)
        } catch (error) {
            console.error('Error updating project:', error);
        }
    };
    const showAlert = async (id,updatedStatus) => {

            Swal.fire({
                icon: 'warning',
                title: 'Are you sure?',
                text: "You won't be able to update this!",
                showCancelButton: true,
                confirmButtonText: 'Update',
                padding: '2em',
                customClass: 'sweet-alerts',
            }).then((result) => {
                if (result.value) {
                    // router.post("/admin/project/email-status", { id, status: updatedStatus });
                    axios.post("/admin/project/email-status", { id, status: updatedStatus })
                    .then(response => {
                        setEmailList(response.data);
                    })
                    .catch(error => {
                        console.error('Error updating email list:', error);
                    });

                }
            });

    }



    useEffect(() => {
        setPage(1);
    }, [pageSize]);

    useEffect(() => {
        const from = (page - 1) * pageSize;
        const to = from + pageSize;
        setRecordsData(isEmailList.slice(from, to));
    }, [page, pageSize,isEmailList]);


    return (
        <>
        <div>
            <div className="panel flex items-center overflow-x-auto whitespace-nowrap p-3 text-primary">
                <div className="rounded-full bg-primary p-1.5 text-white ring-2 ring-primary/30 ltr:mr-3 rtl:ml-3">

                </div>

            </div>
            <div className="panel mt-6">
                <h5 className="font-semibold text-lg dark:text-white-light mb-5">Basic</h5>
                <div className="datatables">
                    <DataTable
                        noRecordsText="No results match your search query"
                        highlightOnHover
                        className="whitespace-nowrap table-hover"
                        records={recordsData}
                        columns={[
                            { accessor: 'id', title: 'ID' },
                            { accessor: 'email' },
                            { accessor: 'project_id', title: 'Project Code' },
                            {
                                accessor: 'comments',
                                title: 'Comment',
                                ellipsis:true,
                                width:500,
                                render:({comments})=>(
                                    <div>
                                        <p>
                                            {comments}
                                        </p>
                                    </div>
                                )
                            },
                            {
                                accessor: 'system_status',
                                title: 'Email Status',
                                render: ({system_status}) => system_status ===1 ? <span className="badge bg-success">Good Email</span>:<span className="badge bg-danger">Bad Email</span>,

                            },
                            {
                                accessor: 'system_status+id',
                                title: 'Status',
                                render: ({system_status,id}) =>
                                    <label className="w-12 h-6 relative">
                                        <input
                                            type="checkbox"
                                            className={"custom_switch absolute w-full h-full opacity-0 z-10 peer " + (system_status===1 ? null :"cursor-pointer")}
                                            id={`custom_switch_checkbox${id}`}
                                            checked={system_status === 1} // Check if status is 1
                                            onChange={system_status !== 1 ? (e) => handleCheckboxChange(id, e.target.checked) : null} // Conditionally set onChange based on email.system_status
                                            disabled={system_status === 1}
                                        />
                                        <span className="bg-[#ebedf2] dark:bg-dark block h-full rounded-full before:absolute before:left-1 before:bg-white dark:before:bg-white-dark dark:peer-checked:before:bg-white before:bottom-1 before:w-4 before:h-4 before:rounded-full peer-checked:before:left-7 peer-checked:bg-primary before:transition-all before:duration-300"></span>

                                    </label>
                            },
                            {
                                accessor: 'payload',
                                title: 'Status',
                                render: ({payload}) =>
                                <div className="flex justify-end">
                                    <a href="#" className="inline-block px-2 py-1 leading-none border border-blue-500 text-blue-500 rounded-md hover:text-white hover:bg-blue-500 mr-2" title="Edit" onClick={() => handleView(payload)}>
                                        <i className="las la-edit"></i>View
                                    </a>
                                </div>

                            },
                        ]}
                        totalRecords={isEmailList.length}
                        recordsPerPage={pageSize}
                        page={page}
                        onPageChange={(p) => setPage(p)}
                        // recordsPerPageOptions={PAGE_SIZES}
                        onRecordsPerPageChange={setPageSize}
                        minHeight={200}
                        paginationText={({ from, to, totalRecords }) => `Showing  ${from} to ${to} of ${totalRecords} entries`}
                    />
                </div>
            </div>
        </div>


        <PreviewModal modal2={modal2} setModal2={setModal2} modalTitle={modalTitle}>
                {JSON.parse(modalBody)}
        </PreviewModal>

</>
    );
}
EmailList.layout = (page) => (
    <MainLayout children={page} title="Project || Project list" />
);
export default EmailList;