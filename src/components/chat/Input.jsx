import React from "react";
import { useState } from "react";
import "./ChatComponents.css";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import SendIcon from "@mui/icons-material/Send";
import { storage } from "../../firebase";
import { ref, uploadBytes } from "firebase/storage";
import { v4 } from "uuid";

const Input = () => {
  const [fileUpload, setFileUpload] = useState(null);

  const upload = () => {
    if (fileUpload == null)
      return;
    const fileRef = ref(storage, `images/${v4()}/${fileUpload.name}`);
    uploadBytes(fileRef, fileUpload).then(() => {
      console.log("File uploaded");
    })
  };

  return (
    <div className="input">
      <textarea placeholder="Type a message"></textarea>
      <div className="input_btn">
        <input type="file" id="file" data-testid="input"
           onChange={(event) => {setFileUpload(event.target.files[0]);}}
           style={{display: 'none'}}
        />
        <label htmlFor="file">
          <AddCircleOutlineOutlinedIcon className="addIcon" sx={{fontSize: '30px', color: 'white'}}/>
        </label>
        <SendIcon className="sendIcon" onClick={upload} sx={{fontSize: '30px', color: 'white'}}/>
      </div>
    </div>
  );
};

export default Input;
