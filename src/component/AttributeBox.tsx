import React from 'react'
import Delete from "../pic/Group 27.png";
import ClearIcon from "@mui/icons-material/Clear";
import { styled } from '@mui/material';


interface MyComponentProps {
    Title: string;
    DeTail: string;
    
}

export default function AttributeBox(props: MyComponentProps) {
    const Delete = styled(ClearIcon)({
        borderRadius: "16px",
        transition: "color 0.3s, border 0.3s",
        border: "2px solid white",
        cursor: "pointer",
    
      });

    return (
        <div className="w-[267px] h-[187px] bg-transparent border-solid border  border-white-600 rounded-xl px-3 pt-5 pb-5 ">
           
        </div>
    )
}