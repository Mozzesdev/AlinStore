import { useState } from "react";

const PreviewImg = ({ firstImg, secundImg, thirdImg, quarterImg }) => {
  const [preview, setPreview] = useState(null);

  const reader = new FileReader();
  if (firstImg) {
    reader.readAsDataURL(firstImg);
    reader.onload = () => {
      setPreview(reader.result);
    };
  }
  
  return (
    <>
      <div className="loadImgFile">
        {preview ? (
          <img className="imgPreview" src={preview} alt="" />
        ) : (
          <div className="spinner" />
        )}
      </div>
    </>
  );
};

export default PreviewImg;
