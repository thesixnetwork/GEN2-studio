import React from 'react'
import Conectwalet from '../component/Connectwallet'
import Stepper2 from '../component/Stepper2';
import Darkbg from '../component/Alert/Darkbg';


export default function Newintregation9() {
    const [isShow, setIsShow] = React.useState(false);
  return (
    <div className='w-full flex justify-center ' >
            <div className='w-full h-full fixed  flex justify-center items-center bg-gradient-24  from-white to-[#7A8ED7]'>
                <div className='w-[1280px] h-[832px] bg-gradient-24 to-gray-700 from-gray-300 rounded-2xl flex justify-between p-4 shadow-lg shadow-black/20 dark:shadow-black/40'>
                    <div className='w-full h-full px-[20px]'>
                        <div>
                            <Stepper2 ActiveStep={5}></Stepper2>
                            <div className='w-[931px] h-[1px] bg-[#D9D9D9]'></div>
                        </div>
                        
                    </div>
                    <div className='w-2/6 h-5/6 flex flex-col items-end  '>
                        <Conectwalet></Conectwalet>
                        <div className='w-[266px] h-[414px] border-[1px] border-white rounded-xl mt-[30px] flex flex-col items-center py-[10px] z-10' >
                            <p className='text-[24px] w-[231px] font-bold text-white text-center'>Origin Token Attributes</p>
                            <p className='text-[16px] w-[216px]  text-white pt-[15px]'>&emsp;Mostly NFT token will need attributes of it called metadata. Origin attributes is the static type of metadata. And it cannot be change ( but it can be override by token attributes we will discuss next step ).</p>
                            <p className='text-[16px] w-[216px]  text-white pt-[15px]'>&emsp; You can edit value of attributes by double click the value and change to your proper design.</p>
                        </div>
                        <div onClick={() => { setIsShow(!isShow) }} className='absolute text-[50px] mt-[750px] ml-[1150px] cursor-pointer hover:scale-150 hover:text-[#262f50] duration-500'>?</div>
                    </div>
                </div>
                {isShow ?
                    <div className='absolute duration-500' onClick={() => { setIsShow(!isShow) }}>
                        <Darkbg ></Darkbg>
                    </div>
                    :
                    <div></div>

                }
            </div>
        </div>
  )
}