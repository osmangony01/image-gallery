import { useState } from "react";
import { FaRegImage, } from "react-icons/fa6";
import AddImages from "../AddImages/AddImages";

const ImageGallery = () => {

    const [isOpenAddImageModal, setIsOpenAddImageModal] = useState(false);

    // to handle add-images pop-up modal
    const handleAddImageModal = (status) => {
        setIsOpenAddImageModal(status)
    }

    return (
        <div>
            <div className=' flex justify-center items-center rounded-lg p-4 border-dotted border-2 border-slate-400 flex-col hover:bg-slate-100 cursor-pointer' onClick={() => handleAddImageModal(true)}>
                <div className=''><FaRegImage></FaRegImage></div>
                <p className='text-center pt-3'>Add Images</p>
                {
                    <AddImages isOpen={isOpenAddImageModal} handleAddImageModal={handleAddImageModal}></AddImages>
                }
            </div>
        </div>
    );
};

export default ImageGallery;