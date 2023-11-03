import { useContext, useEffect, useRef, useState } from "react";
import { FaRegImage, } from "react-icons/fa6";
import AddImages from "../AddImages/AddImages";
import { ContextAPI } from "../../App";
import Image from "./Image";

const ImageGallery = () => {

    const { images, reload, setReload } = useContext(ContextAPI);
    const [allImage, setAllImage] = useState([]);
    const [isOpenAddImageModal, setIsOpenAddImageModal] = useState(false);
    const itemDrag = useRef();
    const itemDragOver = useRef();

    // to handle add-images pop-up modal
    const handleAddImageModal = (status) => {
        setIsOpenAddImageModal(status)
    }

    // sort the images or re-ordering when the user perform drag and drop
    const handleImageSort = () => {
        let items = [...allImage];
        let dragItems = items.splice(itemDrag.current, 1)[0];

        items.splice(itemDragOver.current, 0, dragItems);

        itemDrag.current = null;
        itemDragOver.current = null;

        setAllImage(items);
    };

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
                                <div
                                    key={item._id}
                                    draggable={true}
                                    onDragStart={(e) => (itemDrag.current = index)}
                                    onDragEnter={(e) => (itemDragOver.current = index)}
                                    onDragEnd={handleImageSort}
                                    onDragOver={(e) => e.preventDefault()}
                                    className={`border ${index == 0 && 'card-large'}`}
                                   
                                >
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