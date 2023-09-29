import React from 'react'

interface MyComponentProps {
    
    TextTitle: string;
}

export default function Node1(props: MyComponentProps) {
  return (
    <div className=' text-[24px] text-[#00000075] w-[100px] h-[35px] bg-[#D9D9D9] border-[#00000075] border-2 rounded-xl flex justify-center items-center'>
                {props.TextTitle}
    </div>
  )
}