import React from 'react'

interface MyComponentProps {
  Height: number;
  Width: number;
  detailsText: string;
  ML: number;
  MT: number;
  Rotate: number;
}

export default function RedAleart(props: MyComponentProps) {
  return (
    <div style={{ rotate: `${props.Rotate}deg`, width: `${props.Width}px`, height: `${props.Height}px`, marginLeft: `${props.ML}px`, marginTop: `${props.MT}px` }}
      className=' border text-red-500 border-red-500 bg-slate-200 rounded-full 
     absolute flex justify-center items-center  shadow-md '>
      <p className='text-[16px] text-bold  '>{props.detailsText}</p>
    </div>
  )
}