import React from 'react'
import WhiteBox from '../WhiteBox'

type Props = {}

export default function Test3({}: Props) {
  return (
    <div className='w-full h-full absolute bg-gray-800'>
      <WhiteBox 
      Title='What is your level of programming experience?'
      DeTail='The user interface of the page will be tailored to your programming experience. Based on your selection, whether you are a beginner, intermediate, or a developer, we will customize the interface to provide you with the most suitable tools and features that align with your level of experience.'
      Height={500}
      ></WhiteBox>
    </div>
  )
}