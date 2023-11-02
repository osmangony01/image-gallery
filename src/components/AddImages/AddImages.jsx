import {  useState } from "react";
import { RxCross1 } from "react-icons/rx";

const AddImages = ({ isOpen, handleAddImageModal }) => {
    //const modal = status;
    const [selectedFiles, setSelectedFiles] = useState([]);
    
    // to handle pop modal
    const handleModal = () => {
        handleAddImageModal(false);
    };

    // to handle file upload 
    const handleFileChange = (e) => {
        const files = e.target.files;
        setSelectedFiles([...files]);
    };

    const uploadImages = (data) => {
        
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        
        const data = new FormData();

        [...selectedFiles].forEach((file, i) => {
            data.append(`files`, file, file.name);
        });

        uploadImages(data)
        handleAddImageModal(false);
    };

    return (
        <div>
            {isOpen && (
                <div className="h-screen w-full fixed top-0 left-0 flex justify-center items-center bg-black bg-opacity-20 z-50">
                    <div className="relative bg-white rounded-md shadow-lg w-[450px] text-[15px] mx-auto h-[350px]">
                        <span onClick={(e) => {
                                e.stopPropagation(); 
                                handleModal();
                            }}
                            className="absolute top-[15px] right-[15px] hover:bg-slate-200 p-2 rounded-full"
                        >
                            <RxCross1 color="" size={20} />
                        </span>
                        <div className="p-10">
                            <form onSubmit={handleSubmit} encType="multipart/form-data">
                                <h1 className="text-2xl text-center pt-6 pb-8 font-semibold">
                                    Upload Images
                                </h1>
                                <div className="flex flex-col mb-4 gap-2">
                                    <label>Choose Images</label>
                                    <input type='file'
                                        name='files'
                                        onChange={handleFileChange}
                                        className='border border-slate-400 outline-none w-full cursor-pointer rounded placeholder:text-sm bg-white focus:border-blue-500'
                                        multiple
                                        required
                                    />
                                </div>
                                <div>
                                    <button
                                        type="submit"
                                        className="px-4 py-1.5 bg-purple-500 rounded my-4 font-semibold text-white hover:bg-purple-700"
                                    >
                                        Save
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AddImages;
