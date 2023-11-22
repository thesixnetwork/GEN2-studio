import React from 'react'
import Goblackbutton from '../pic/Back.png'
import {useNavigate } from 'react-router-dom'
import { Tooltip } from '@mui/material'
import Swal from 'sweetalert2';
interface MyComponentProps {
    BackPage: string;
    goBackCondition: boolean;
}

export default function GobackButton(props: MyComponentProps) {

    const navigate = useNavigate();

    const goback = () => {
   
        if (props.goBackCondition) {
            navigate(`${props.BackPage}`)
        } else {
            Swal.fire({
                title: 'Are you sure to go back ?',
                text: "Your draft is't save",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#7A8ED7',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, go back '
            }).then((result) => {
                if (result.isConfirmed) {
                    navigate(`${props.BackPage}`)
                }
            })
        }
    }

    return (
        <Tooltip title="Go back" className='justify-center items-center '>
            <img onClick={goback} width="50px" height="50px" src={Goblackbutton} className='hover:scale-125 duration-500 hover:opacity-70 cursor-pointer'></img>
        </Tooltip>

    )
}