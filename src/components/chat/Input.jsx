import React from "react";
import "./ChatComponents.css";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import SendIcon from "@mui/icons-material/Send";
const Input = () => {
  return (
    <div className="input">
      <textarea placeholder="Type a message"></textarea>
      <div className="input_btn">
        <input type="file" id="file" style={{display: 'none'}} />
        <label htmlFor="file">
          <AddCircleOutlineOutlinedIcon sx={{fontSize: '30px', color: 'white'}}/>
        </label>
        <SendIcon sx={{fontSize: '30px', color: 'white'}}/>
      </div>
      
    </div>
  );
};

export default Input;
