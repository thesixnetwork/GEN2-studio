import React from 'react'

interface MyComponentProps {
    Title: string;
    DeTail: string;
    Height : number;
    Width : number;
    TitleSize : number ;
}

export default function WhiteBox(props: MyComponentProps) {
    return (
        <div className={`w-[${props.Width}px] h-[${props.Height}px]  border-[1px] border-white rounded-xl mt-[20px] flex flex-col items-center p-[10px] z-10`}>
            <p className={`text-[${props.TitleSize}px] font-bold text-white text-center`}>{props.Title}</p>
            <p className='text-[16px]text-white pt-[10px]'>&emsp;{props.DeTail}</p>
        </div>
    )
}