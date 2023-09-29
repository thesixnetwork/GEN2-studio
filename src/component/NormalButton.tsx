import { Button, Tooltip } from '@mui/material';
import React from 'react'
import { Link } from 'react-router-dom';

interface MyComponentProps {
    BorderRadius: number;
    FontSize: number;
    TextTitle: string;
}

export default function NormalButton(props: MyComponentProps) {
    return (
        <Tooltip title={props.TextTitle}>
            <div className={` border text-[${props.FontSize}px]  cursor-pointer hover:scale-125  hover:bg-slate-200 hover:text-[#262f50] hover:border-none flex justify-center items-center  duration-500  px-3`}>
                {props.TextTitle}
            </div>

        </Tooltip>

    )
}