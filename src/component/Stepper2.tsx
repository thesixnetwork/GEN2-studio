import React from 'react'
import Box from '@mui/material/Box';
import { Link } from 'react-router-dom';
const steps = ['basic data', 'origin collection data', 'origin token attributes', 'onchain collection attributes', 'on-chain token attributes', 'actions'];

interface MyComponentProps {
    ActiveStep : number;
    CurrentState : number;
}

const Stepper2 = (props: MyComponentProps) => {

    const [isFinal,setisFinal] =React.useState(true)
    const totalSteps = () => {
        return steps.length;
    };
    React.useEffect(()=>{
        if (props.ActiveStep == 6){
            setisFinal(false)
        }
        
    },[])

    return (
        <Box sx={{ width: '100%' }} className='flex w-full  justify-between items-end mb-2'>
            <div className='flex w-full '>
                {steps.slice(0,props.CurrentState).map((label, index) => (
                    <Link to={`/newintregation/${index+5}`} key={index} className={`flex justify-center items-center ${index===props.ActiveStep-1 ? ''  : 'text-gray-400'}  cursor-pointer hover:scale-105 duration-500 ml-3`} >
                        <div className={`border ${index===props.ActiveStep-1 ? 'text-[60px] '  : 'border-gray-400 text-[50px] '} w-[35px] h-[60px] flex justify-center items-center`}>{index + 1}</div>
                        <div className='text-center  flex items-center justify-center w-[90px] text-[15px]'>{label}</div>
                    </Link>
                ))}
             
                
            </div>
            {props.ActiveStep !== 6 && <div className='flex justify-center items-center h-full w-[120px] text-[20px]'>{totalSteps() - props.ActiveStep} step left</div>}
            
        </Box>
    )
}

export default Stepper2