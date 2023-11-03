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
    const [selectedImage, setSelectedImage] = useState([]);
    const [selectedImageCount, setSelectedImageCount] = useState(0);

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

    // handel to select the images when user click the checkbox and count the selected images
    const handleCheckboxChange = (id) => {

        const exists = selectedImage.some(item => item._id === id);
        console.log(exists);
        if (exists) {
            const filterImg = selectedImage.filter(item => item._id != id)
            if (filterImg) {
                let count = filterImg.length;
                setSelectedImageCount(count)
            } else {
                setSelectedImageCount(0)
            }
            setSelectedImage([...filterImg]);
        } else {
            const newData = [...selectedImage, { _id: id }];
            if (newData) {
                let count = newData.length;
                setSelectedImageCount(count)
            } else {
                setSelectedImageCount(0)
            }
            setSelectedImage(newData);
        }
    }

    // to delete the selected images
    const deleteSelectedImages = async (selectedImage) => {

        const res = await axiosInstance.delete("/delete-images", {
            data: selectedImage,
            headers: { 'Content-Type': 'application/json' }
        });

        const resData = res.data;
        if (resData.ok) {
            console.log('deleted successful');
            setReload(!reload);
        }
        else {
            console.log('deleted failed');
        }
    }

    // filtering selected images from allImages to deleting
    const handleDeleteFiles = () => {
        const matchingIds = selectedImage.map(obj2 => obj2._id);
        const filteredIds = allImage.filter(obj1 => matchingIds.includes(obj1._id));
        deleteSelectedImages(filteredIds)
    }

    useEffect(() => {
        console.log('render')
        setAllImage(images);
    }, [images])

    return (
        <div>
            <div className="flex justify-between px-6 py-3">
                <span className="text-xl font-semibold">
                    {
                        selectedImageCount == 0 ? <span>Gallery</span> : <span>
                            <input type="checkbox" checked className="w-[15px] h-[15px]" />
                            <span className="pl-3">{selectedImageCount} Files Selected</span>
                        </span>
                    }
                </span>
                {
                    selectedImageCount != 0 && <button  onClick={handleDeleteFiles}>
                        <span className="text-red-400 font-semibold text-base hover:text-red-500">Delete files</span>
                    </button>
                }
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
                                    className={`group relative border border-slate-300 rounded-lg cursor-pointer before:rounded-lg before:absolute  before:h-full before:w-full ${index == 0 && 'card-large'} 
                                    ${selectedImage.some(selectedItem => selectedItem._id === item._id)
                                            ? "opacity-100" : "hover:before:bg-black/50"
                                        }`}
                                >
                                    <input
                                        type="checkbox"
                                        onChange={() => handleCheckboxChange(item._id)}
                                        className={`absolute top-4 left-4 h-5 w-5 cursor-pointer accent-blue-500 group-hover:opacity-100 transition-opacity delay-100 duration-100 ease-linear  ${selectedImage.some(selectedItem => selectedItem._id === item._id)
                                            ? "opacity-100"
                                            : "opacity-0"
                                            }`}
                                    />
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