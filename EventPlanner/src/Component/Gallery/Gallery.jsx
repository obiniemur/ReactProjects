import "react-photo-view/dist/react-photo-view.css";
import {PhotoProvider, PhotoView} from "react-photo-view";
import {useLoaderData} from "react-router-dom";

const Gallery = () => {
  const imageData = useLoaderData();
  return (
    <div className="max-w-5xl mx-auto">
        <PhotoProvider>
        
      <div className="foo grid grid-cols-2 gap-2">
        {imageData.map((item, index) => (
          <PhotoView key={index} src={item.image}>
            <img src={item.image} alt="" />
          </PhotoView>
        ))}
      </div>
    </PhotoProvider>
    </div>
  );
};

export default Gallery;
