import React from 'react'
import Goblackbutton from '../pic/Back.png'
import { Link } from 'react-router-dom'
import { Tooltip } from '@mui/material'
interface MyComponentProps {
    BackPage: string;

}

export default function GobackButton(props: MyComponentProps) {
    return (
        <Tooltip title="Go back">
            <Link to={`${props.BackPage}`}>
                <img width="50px" height="50px" src={Goblackbutton} className='hover:scale-125 duration-500 hover:opacity-70'></img>
            </Link>
        </Tooltip>

    )
}