import React from 'react'
import Conectwalet from '../component/Connectwallet'
import Stepper2 from '../component/Stepper2';
import Darkbg from '../component/Alert/Darkbg';
import Box from '../component/Box';


export default function Newintregation8() {
    const [isShow, setIsShow] = React.useState(false);
  return (
    <div className='w-full flex justify-center ' >
            <div className='w-full h-full fixed  flex justify-center items-center bg-gradient-24  from-white to-[#7A8ED7]'>
                <div className='w-[1280px] h-[832px] bg-gradient-24 to-gray-700 from-gray-300 rounded-2xl flex justify-between p-4 shadow-lg shadow-black/20 dark:shadow-black/40'>
                    <div className='w-full h-full px-[20px]'>
                        <div>
                            <Stepper2 ActiveStep={4}></Stepper2>
                            <div className='w-[931px] h-[1px] bg-[#D9D9D9]'></div>
                        </div>
                                                
                    
                    </div>
                    <div className='w-2/6 h-5/6 flex flex-col items-end  '>
                        <Conectwalet></Conectwalet>
                        
                        <Box Title='Onchain Collection Attributes' DeTail='Onchain Collection attributes is the dynamic type of metadata which represent the global attribute of the schema. And every NFT Metadata will include these attributes and its value by default.

These attributes can change base on action that we performed.&thinsp;

If the name key of the Onchain attribute matches, the module will prioritize the Onchain attribute over the Origin Attribute.
 
  You can edit/add/ remove value of attributes by double click the value/ click + button and click x button  and change to your proper design.'></Box>
                        <div onClick={() => { setIsShow(!isShow) }} className='absolute text-[50px] mt-[750px] ml-[1150px] cursor-pointer hover:scale-150 hover:text-[#262f50] duration-500'>?</div>
                    </div>
                </div>
                {isShow &&
                    <div className='absolute duration-500' onClick={() => { setIsShow(!isShow) }}>
                        <Darkbg ></Darkbg>
                    </div>            
                }
            </div>
        </div>
  )
}