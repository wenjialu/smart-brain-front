
import React from "react";
import './FaceRecognition.css';


//it will show an image below the .. after press the button
const FaceRecognition = ({ imageUrl, box }) => {
    return (
      <div className='center ma'>
  
      <div className='absolute mt2'>
        {/* 下面这行是关键的代码，通过src展示url对应的图片 */} {/* width， height固定图片大小 */}
        <img id='inputimage' alt='' src={imageUrl} width='500px' heigh='auto'/>
        {/* 标示人脸 by box */}
        <div className='bounding-box' style={{top: box.topRow, right: box.rightCol, bottom: box.bottomRow, left: box.leftCol}}></div>
      </div>
    </div>
    );
  }


export default FaceRecognition;



