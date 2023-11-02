import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import ImageGallery from "../components/ImageGallery/ImageGallery";

const router = createBrowserRouter([{
    
    path: "/",
    element: <App></App>,
    children: [
        {
            path: "/",
            element: <ImageGallery></ImageGallery>
        },
    ]
}]);

export default router;