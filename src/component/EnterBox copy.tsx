import React, { useEffect } from 'react'
import { TypeAnimation } from 'react-type-animation';
import DoubleArrowIcon from '@mui/icons-material/DoubleArrow';
import InputText from './InputText';
import EastIcon from '@mui/icons-material/East';
import NormalButton from './NormalButton';
import { styled } from '@mui/material';
import ClearIcon from "@mui/icons-material/Clear";

interface MyComponentProps {
    Height: number;
    Width: number;
    detailsText: string;
    ML: number;
    MT: number;

}


export default function EnterBox(props: MyComponentProps) {

    const [showI, setshowI] = React.useState(false)
    const [showII, setshowII] = React.useState(false)

    const Delete = styled(ClearIcon)({
        borderRadius: "16px",
        transition: "color 0.3s, border 0.3s",
        border: "2px solid white",
        cursor: "pointer",
    });

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            setshowI(true)
        }, 2300);

    }, [])
    return (
        <div style={{ width: `${props.Width}px`, height: `${props.Height}px`, marginLeft: `${props.ML}px`, marginTop: `${props.MT}px` }}
            className='flex-col p-3 border border-white bg-transparent  rounded-xl  flex  justify-start items-start  shadow-md '>
            <div className='w-full flex justify-end items-end'>
                <Delete
                    className=" hover:border-red-600 hover:text-red-600"

                />
            </div>

            <TypeAnimation
                className='  text-white font-bold'
                sequence={[
                    `Name:\nDescription:\nParameters:\nWhen:\nThem: +`,
                    1000,
                    ``,
                ]}
                speed={50}
                style={{ whiteSpace: 'pre-line', fontSize: '15px', }}
                repeat={Infinity}
                preRenderFirstString={false}

            />



        </div>
    )
}