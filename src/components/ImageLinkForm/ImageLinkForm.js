
import React from "react";
import "./ImageLinkForm.css";

function ImageLinkForm({onInputChange, onButtonSubmit}) {
    return (
        <div>
            <p className="f3">
                {"This magic brain will detact faces in your pictures! Try it."}
            </p>
            <div className="center">
                {/* 下面这个加center button就在右边，不加就在下面 */}
                <div className="form center pa4 br3  shawdow-5">

                    <input className="f4 pa2 w-70 center" type="text" onChange={onInputChange}/>
                    <button className="w-30 grow f4 link ph3 pv2 dib white bg-light-purple" 
                    onClick = {onButtonSubmit}>Detect</button>
                    
                </div>
            </div>
        </div>

    );
  }


export default ImageLinkForm;