import React from 'react'

interface MyComponentProps {
    Height:number;
    Width: number;
    detailsText:string;
    ML:number;
    MT:number;
    Rotate:number ;
  }

export default function RedAleart(props :MyComponentProps) {
  return (
    <div style={{rotate:`${props.Rotate}deg`, width: `${props.Width}px`,height: `${props.Height}px`,marginLeft:`${props.ML}px`,marginTop:`${props.MT}px`  }}
     className='bg-transparent border border-red-600 text-red-600 rounded-full 
     absolute flex justify-center items-center'>
        <p className='text-[16px]'>{props.detailsText}</p>
    </div>
  )
}