import { Tooltip } from '@mui/material'
import React from 'react'

type Props = {}

export default function Help({ }: Props) {
  return (
    <Tooltip title='Help'>
      <div className=" w-[50px] h-[50px] rounded-full bg-transparent  hover:bg-slate-200 flex justify-center items-center text-[50px] cursor-pointer hover:scale-150 hover:text-[#262f50] duration-500">?</div>
    </Tooltip>

  )
}