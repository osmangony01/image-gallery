import { useContext, useState } from "react";
import { RxCross1 } from "react-icons/rx";
import axiosInstance from "../../routes/axiosInstance";
import { ContextAPI } from "../../App";
import { Oval } from "react-loader-spinner";
import { storage } from "../../firebase/firebase.config";
import { ref, getDownloadURL, uploadBytes, } from "firebase/storage";
import { v4 } from "uuid";

const AddImages = ({ isOpen, handleAddImageModal }) => {
    
    const { reload, setReload } = useContext(ContextAPI);
    const [selectedFiles, setSelectedFiles] = useState([]);
    const [loading, setLoading] = useState(false)

    // to handle pop modal
    const handleModal = () => {
        setLoading(false);
        setSelectedFiles([]);
        handleAddImageModal(false);
    }

    // handle file changes
    const handleFileChange = (e) => {
        const files = e.target.files;
        setSelectedFiles([...files]);
    }

    // this method handle for uploading images, here i upload images in firebase storage
    const handleReadWriteFiles = async (files) => {
        const urls = []; // it is used for take all file url after uploading

        // Create an array of Promises for each file's URL retrieval
        const uploadPromises = [...files].map(async (file) => {
            const filename = v4() + '-' + file.name.toLocaleLowerCase().split(" ").join("-"); // to create a unique filename for images
            const imageRef = ref(storage, `images/${filename}`);

            try {
                await uploadBytes(imageRef, file);
                const url = await getDownloadURL(imageRef); // after uploading, this method download the url
                urls.push(url);
                //console.log('Fetched URL:', url);
            } catch (error) {
                console.error("Error uploading or getting download URL: ", error);
            }
        });

        // Wait for all the Promises to resolve
        await Promise.all(uploadPromises);

        return urls;
    };

    // It is handle to save file urls in mongodb database
    const uploadImages = async (imgData) => {
        try {
            const res = await axiosInstance.post("/upload-images", { imgData });
            const data = res.data;
            if (data.ok) {
                console.log('Upload successful');
                setLoading(false)
                setReload(!reload);
                handleAddImageModal(false);
            }
            else {
                console.log('Upload failed!!');
            }
        }
        catch (error) {
            console.error('Network error:', error);
        }
    }

    // handle submit form
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const imgUrls = await handleReadWriteFiles(selectedFiles)
        //console.log(imgUrls)
        uploadImages(imgUrls)
    }

    return (
        <div>
            {isOpen && (
                <div className="h-screen w-full fixed top-0 left-0 flex justify-center items-center bg-black bg-opacity-20 z-50">
                    <div className="relative bg-white rounded-md shadow-lg w-[450px] text-[15px] mx-auto h-[350px]">
                        <span onClick={(e) => {
                            e.stopPropagation();
                            handleModal();
                        }}
                            className="absolute top-[15px] right-[15px] hover:bg-slate-200 p-2 rounded-full">
                            <RxCross1 color="" size={20} />
                        </span>
                        <div className="p-10">
                            <form onSubmit={handleSubmit} encType="multipart/form-data">
                                <h1 className="text-2xl text-center pt-6 pb-8 font-semibold">Upload Images</h1>
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
                                <div className="">
                                    <button type="submit" disabled={loading ? true : false} className={`flex px-4 py-1.5 bg-purple-500 rounded my-4 font-semibold text-white  mt-8 ${loading ? 'cursor-not-allowed' : 'hover:bg-purple-700'}`}>
                                        <span className="pr-2">Upload</span>
                                        {
                                            loading && <Oval height={20} width={20} color="#fff" wrapperStyle={{}} strokeWidth={5} wrapperClass="" visible={true} ariaLabel='oval-loading' secondaryColor="#fff" strokeWidthSecondary={5} />
                                        }
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
