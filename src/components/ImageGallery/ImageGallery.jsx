import { useContext, useEffect, useState } from "react";
import { FaRegImage, } from "react-icons/fa6";
import AddImages from "../AddImages/AddImages";
import { ContextAPI } from "../../App";
import Image from "./Image";

const ImageGallery = () => {
    const { images, reload, setReload } = useContext(ContextAPI);
    const [allImage, setAllImage] = useState([]);

    const [isOpenAddImageModal, setIsOpenAddImageModal] = useState(false);

    // to handle add-images pop-up modal
    const handleAddImageModal = (status) => {
        setIsOpenAddImageModal(status)
    }

    useEffect(() => {
        console.log('render')
        setAllImage(images);
    }, [images])

    return (
        <div>
            <div className="flex justify-between px-6 py-3">
                <span className="text-xl font-semibold">
                    <span>Gallery</span>
                </span>
            </div>
            <hr />
            <div className="p-6">
                <div className="grid-container">
                    {
                        allImage?.map((item, index) => {
                            return (
                                <div>
                                    <Image img={item.image}></Image>
                                </div>
                            )
                        })
                    }

                    <div className=' flex justify-center items-center rounded-lg p-4 border-dotted border-2 border-slate-400 flex-col hover:bg-slate-100 cursor-pointer' onClick={() => handleAddImageModal(true)}>
                        <div className=''><FaRegImage></FaRegImage></div>
                        <p className='text-center pt-3'>Add Images</p>
                        {
                            <AddImages isOpen={isOpenAddImageModal} handleAddImageModal={handleAddImageModal}></AddImages>
                        }
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ImageGallery;