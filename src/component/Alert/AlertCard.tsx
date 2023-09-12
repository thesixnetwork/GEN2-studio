import React from 'react'

interface MyComponentProps {
    Height:number;
    Width: number;
    heaDer: string;
    detailsText:string;
    ML:number;
    MT:number;
  }

export default function AlertCard(props: MyComponentProps) {
  return (
    <div style={{ width: `${props.Width}px`,height: `${props.Height}px`,marginLeft:`${props.ML}px`,marginTop:`${props.MT}px`  }} className='bg-[#565E7A] border border-white rounded-2xl p-5 absolute'>
        <h1 className='text-[20px] font-bold'>{props.heaDer}</h1>
        <p className='text-[16px]'>{props.detailsText}</p>
    </div>
  )
}