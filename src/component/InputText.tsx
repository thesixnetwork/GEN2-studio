import React from 'react'

interface MyComponentProps {
    Height: number;
    Width: number;
    Placeholder: string;

}

export default function InputText(props:MyComponentProps) {
    return (
        <input
            type="text"
            className={`bg-transparent text-[14px] border-[1px] border-transparent focus:border-[#D9D9D9DD] placeholder-gray-300 border-dashed p-1 focus:outline-none focus:scale-105 duration-1000 w-[350px] h-[${props.Height}px]`}
            placeholder={props.Placeholder}
        />
    )
}