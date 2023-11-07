import React from 'react'

interface MyComponentProps {
    Title: string;
}

function WhiteBoxState2(props: MyComponentProps) {
  return (
    <div className='border'>
        <p>{props.Title}</p>
    </div>
  )
}

export default WhiteBoxState2