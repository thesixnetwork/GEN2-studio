import { Tooltip } from '@mui/material'
import React from 'react'

type Props = {}

export default function Help({ }: Props) {
  return (
    <Tooltip title='Help'>
      <div className='text-[50px] cursor-pointer hover:scale-150 hover:text-[#262f50] duration-500'>?</div>
    </Tooltip>

  )
}