import React from 'react'

interface MyComponentProps {
  Height: number;
  Width: number;
  heaDer: string;
  detailsText: string;
  ML: number;
  MT: number;
  BG: number;
}

export default function AlertCard(props: MyComponentProps) {
  const [BgColor, setBgColor] = React.useState("")
  function getColor() {
    if (props.BG === 1) {
      setBgColor("#565E7A")
      console.log(BgColor)
    }
  }
  React.useEffect(()=>{
    getColor()
  })


  return (
    <div style={{ width: `${props.Width}px`, height: `${props.Height}px`, marginLeft: `${props.ML}px`, marginTop: `${props.MT}px`, backgroundColor:`${BgColor}` }} className='border border-white rounded-2xl p-5 absolute'>
      <h1 className='text-[20px] font-bold'>{props.heaDer}</h1>
      <p className='text-[16px]'>{props.detailsText}</p>
    </div>
  )
}