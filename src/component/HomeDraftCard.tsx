import React from 'react'
import { Link } from 'react-router-dom'
import logo9 from '../pic/SCR-25660710-nkmd 1.png'


interface MyComponentProps {
    CollectionName: string;
    CollectionImage: string;
}

export default function HomeDraftCard(props: MyComponentProps) {
    return (
        <div className='w-[197px] h-[232px]  flex flex-col justify-center items-center ml-5 cursor-pointer'>
            <div className=' w-[197px] h-[232px]   flex  items-end hover:scale-105 duration-500 shadow-lg shadow-black/20 dark:shadow-black/40'>
                <img src={props.CollectionImage} className='border-[#D9D9D9] border-[0.5px] rounded-2xl  '></img>
            </div>
            <p className='text-white text-sm font-bold mt-3  hover:text-[#7A8ED7] duration-500 '>{props.CollectionName}</p>
        </div>
    )
}