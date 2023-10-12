import React from 'react'
import Box from '@mui/material/Box';
import { Link } from 'react-router-dom';
const steps = ['basic data', 'origin collection data', 'origin token attributes', 'onchain collection attributes', 'on-chain token attributes', 'actions'];


interface MyComponentProps {

    ActiveStep : number;

}
const Stepper2 = (props: MyComponentProps) => {

    const [activeStep, setActiveStep] = React.useState(props.ActiveStep);
    const [isFinal,setisFinal] =React.useState(true)
    const totalSteps = () => {
        return steps.length;
    };
    React.useEffect(()=>{
        if (activeStep == 6){
            setisFinal(false)
        }
        
    },[])

    return (
        <Box sx={{ width: '100%' }} className='flex w-full  justify-between items-end mb-2'>
            <div className='flex w-full '>
                {steps.slice(0, activeStep-1).map((label, index) => (
                    <Link to={`/newintregation/${index+5}`} className='flex justify-center items-center text-gray-400 cursor-pointer hover:scale-105 duration-500 ml-3' >
                        <div className='border border-gray-400 text-[50px] w-[35px] h-[60px] flex justify-center items-center'>{index + 1}</div>
                        <div className='text-center  flex items-center justify-center w-[90px] text-[15px]'>{label}</div>
                    </Link>
                ))}
                <div className='flex cursor-pointer hover:scale-105 duration-500 ml-3'>
                    <div className='border text-[60px] w-[40px] text-center'>{activeStep}</div>
                    <div className='text-center ml-2  flex items-center justify-center w-[90px] text-[20px] font-bold'>{steps[activeStep-1]}</div>
                </div>
            </div>
            {activeStep !== 6 && <div className='flex justify-center items-center h-full w-[120px] text-[20px]'>{totalSteps() - activeStep} step left</div>}
            
        </Box>
    )
}

export default Stepper2