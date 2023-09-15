import React from 'react'

interface MyComponentProps {
    Title: string;
    DeTail: string;
}

export default function Box(props: MyComponentProps) {
    return (
        <div className='w-[266px] h-auto border-[1px] border-white rounded-xl mt-[20px] flex flex-col items-center py-[10px] px-1 z-10'>
            <p className='text-[24px] font-bold text-white text-center'>{props.Title}</p>
            <p className='text-[16px] w-[216px] text-white pt-[10px]'>&emsp;{props.DeTail}</p>
        </div>
    )
}