

import { createContext, useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import axiosInstance from './routes/axiosInstance';
export const ContextAPI = createContext(null);

const App = () => {
    const [images, setImages] = useState([])
    //const [loading, setLoading] = useState(false);
    const [reload, setReload] = useState(false);
    
    const fetchImages = async () => {
        // const response = await fetch('http://localhost:5000/images')
        const response = await axiosInstance.get('/images');

        // const data = await response.json();
        const data = response.data;
        if (data) {
            setImages(data);
            setReload(true);
        }
    }

    useEffect(() => {
        fetchImages();
    }, [reload])

    const info = {
        images,
        reload,
        setImages,
        setReload
    }
    console.log(images)
    return (
        <ContextAPI.Provider value={info}>
            <div>
                <Outlet></Outlet>
            </div>
        </ContextAPI.Provider>
    );
};

export default App;