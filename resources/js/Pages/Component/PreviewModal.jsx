import { Dialog, Transition } from '@headlessui/react';
import { Fragment} from 'react';
import ReactJson from 'react-json-view';
function PreviewModal({modal2,setModal2,children,modalTitle}) {
    return (
        <>
            <Transition appear show={modal2} as={Fragment}>
                <Dialog as="div" open={modal2} onClose={() => setModal2(false)}>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0" />
                    </Transition.Child>
                    <div className="fixed inset-0 bg-[black]/60 z-[999] overflow-y-auto">
                        <div className="flex items-center justify-center min-h-screen px-4">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 scale-95"
                                enterTo="opacity-100 scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 scale-100"
                                leaveTo="opacity-0 scale-95"
                            >
                                <Dialog.Panel
                                    as="div"
                                    className="panel border-0 p-0 rounded-lg overflow-hidden w-full max-w-lg my-8 text-black dark:text-white-dark"
                                >
                                    <div className="flex bg-[#faecec] dark:bg-[#121c2c] items-center justify-between px-5 py-3">
                                        <h5 className="font-bold text-lg">
                                            {modalTitle}
                                        </h5>
                                        <button
                                            type="button"
                                            className="text-white-dark hover:text-dark"
                                            onClick={() => setModal2(false)}
                                        >
                                        </button>
                                    </div>
                                    <div className="p-5">
                                    <ReactJson src={children} theme="rjv" indentWidth={2} collapsed={false} />
                                        <div className="flex justify-end items-center mt-8">
                                            <button
                                                type="button"
                                                className="btn btn-outline-danger"
                                                onClick={() => setModal2(false)}
                                            >
                                                Discard
                                            </button>
                                            <button
                                                type="button"
                                                className="btn btn-primary ltr:ml-4 rtl:mr-4"
                                                onClick={() => setModal2(false)}
                                            >
                                                Save
                                            </button>
                                        </div>
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </>
    );
}

export default PreviewModal;
