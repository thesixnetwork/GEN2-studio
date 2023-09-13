import React from 'react'
import Goblackbutton from '../pic/Back.png'
import { Link } from 'react-router-dom'

interface MyComponentProps {
    BackPage: string;
    
}

export default function GobackButton(props: MyComponentProps) {
    return (
        <Link to={`${props.BackPage}`}>
            <img width="90px" height="90px" src={Goblackbutton} className='hover:scale-125 duration-500 hover:opacity-70'></img>
        </Link>
    )
}