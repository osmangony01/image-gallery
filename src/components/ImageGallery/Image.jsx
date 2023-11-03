import  { useEffect, useState } from 'react';

const Image = (imgData) => {
    const [image, setImage] = useState('');

    // get image from the backend
    const getImage = async (img) => {
        try {
            const result = await fetch(`http://localhost:5000/image?img=${img}`) 
            const data = await result.blob();
            const url = window.URL.createObjectURL(data)
            setImage(url)
        }
        catch (error) {
            console.log('error')
        }
    }

    useEffect(() => {
        const { img } = imgData;
        getImage(img);
    }, [])
    
    return (
        <img src={image} alt='img' className="w-full h-full max-w-full rounded-lg object-contain color:transparent" />
    );
};

export default Image;