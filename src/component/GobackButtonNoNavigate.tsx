import React from 'react'
import Goblackbutton from '../pic/Back.png'
import { Tooltip } from '@mui/material'
// interface MyComponentProps {
//     BackPage: string;
// }

export default function GobackButton() {
    return (
        <Tooltip title="Go back">
            <img width="50px" height="50px" src={Goblackbutton} className=' hover:cursor-pointer hover:scale-125 duration-500 hover:opacity-70'></img>
        </Tooltip>
    )
}