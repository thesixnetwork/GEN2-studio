import React from 'react'
import { Button } from '@mui/material'
import Conectwalet from './Connectwallet'
import logo1 from '../pic/Chain/SIX Protocol Icon.png'
import logo2 from '../pic/Chain/Ethereum Icon.png'
import logo3 from '../pic/Chain/Klaytn Icon.png'
import logo4 from '../pic/Chain/bnb-bnb-logo 1.png'
import Stepper2 from './Stepper2'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';
import Darkbg from './Alert/Darkbg'
import AlertCard from './Alert/AlertCard'
import RedAleart from './Alert/RedAleart'

const NewIntregation6 = () => {

    const navigate = useNavigate();
    const [ml, setml] = useState(0)
    const [isSelection, setisSelection] = useState(false)
    const [isError, setisError] = useState(false)
    const handleml = (event: any) => {
        const id = event.target.id;
        console.log(id);
        setml(110 * id)
        setisSelection(true)
        setisError(false)
        document.getElementById
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (isSelection){
            navigate('/newintregation/7');
            console.log('navigate')
        }
        else {
            setisError(true)
        }

    }
    return (
        <div className='w-full flex justify-center ' >
            <div className='w-full h-full fixed  flex justify-center items-center bg-gradient-24  from-white to-[#7A8ED7]'>
                <div className='w-[1280px] h-[832px] bg-gradient-24 to-gray-700 from-gray-300 rounded-2xl flex justify-between p-4 shadow-lg shadow-black/20 dark:shadow-black/40'>
                    <div className='w-full h-full px-[20px]'>
                        <div>
                            <div className='flex flex-rows justify-between'>
                                <Stepper2 ActiveStep={2}></Stepper2>
                            </div>
                            <div className='w-[931px] h-[1px] bg-[#D9D9D9]'></div>
                        </div>
                        <form onSubmit={handleSubmit} className=' flex flex-col justify-between items-center mt-[20px] h-5/6 py-[30px] '>
                            <div className='w-[758px] h-[121px] border-[1px] border-white rounded-xl p-2 flex  items-center justify-center px-[20px] z-10 '>
                                <p className='font-bold text-[20px] '>Origin Chain</p> 
                                <div className='flex justify-between w-[400px] ml-[60px]'>
                                    {isSelection && <div className='absolute border w-[90px] h-[90px] mt-[-9px] duration-300' style={{ marginLeft: `${-7 + ml}px` }}></div>}
                                    <img id='0' onClick={handleml} className='cursor-pointer z-10 w-[77px] h-[66px] hover:scale-125 duration-500' alt="Logo" src={logo1}></img>
                                    <img id='1' onClick={handleml} className='cursor-pointer z-10 w-[38px] h-[68px] hover:scale-125 duration-500' alt="Logffffo" src={logo2}></img>
                                    <img id='2' onClick={handleml} className='cursor-pointer z-10 w-[54px] h-[61px] hover:scale-125 duration-500' src={logo3}></img>
                                    <img id='3' onClick={handleml} className='cursor-pointer z-10 w-[60px] h-[62px] hover:scale-125 duration-500' src={logo4}></img>
                                </div>
                                <div className='w-[15px] h-[15px] bg-[#D9D9D9] rounded-full absolute ml-[710px] mb-[90px]'></div>
                            </div>
                            <div className='w-[758px] h-[121px] border-[1px] border-white rounded-xl p-2 flex  items-center justify-between px-[20px] '>
                                <p className='font-bold text-[20px] '>Origin Contract Address</p>
                                <input type="text" placeholder="0x898bb3b662419e79366046C625A213B83fB4809B" className='bg-transparent text-[16px] border-[1px] border-[#D9D9D9DD] border-dashed p-1  focus:outline-none focus:scale-105 duration-1000 w-[429px] '></input>
                                <div className='w-[15px] h-[15px]  bg-transparent border rounded-full absolute ml-[710px] mb-[90px]'></div>
                            </div>
                            <div className='w-[758px] h-[141px] border-[1px] border-white rounded-xl p-2 flex flex-col items-start justify-center px-5 '>
                                <p className='font-bold text-[24px] mr-10'>Origin Base URI</p>
                                <input type="text" placeholder="https://ipfs.whalegate.sixprotocol.com/ipfs/Qmd9FJGWveLd1g6yZTDDNjxruVppyDtaUzrA2pkb2XAf8R/" className='placeholder-gray-300 placeholder:text-[12px] bg-transparent text-[24px] border-[1px] border-[#D9D9D9DD] border-dashed p-1  focus:outline-none focus:scale-[102%] duration-1000 w-full h-[62px]  '></input>
                                <div className='w-[15px] h-[15px]  bg-transparent border rounded-full absolute ml-[710px] mb-[90px]'></div>
                            </div>
                            <Button onClick={handleSubmit} variant="outlined" className='hover:scale-105 duration-500'
                                style={{
                                    borderRadius: 0,
                                    color: 'white',
                                    borderColor: 'white',
                                    padding: "2px 36px",
                                    fontSize: "48px",
                                }}>NEXT
                            </Button>
                        </form>
                    </div>
                    <div className='w-2/6 h-5/6 flex flex-col items-end  '>
                        <Conectwalet></Conectwalet>
                        <div className='w-[266px] h-[414px] border-[1px] border-white rounded-xl mt-[30px] flex flex-col items-center py-[10px]  '>
                            <p className='text-[24px] w-[231px] font-bold text-white'>Origin Chain</p>
                            <p className='text-[14px] w-[216px]  text-white pt-[10px]'>A Chain that your NFT was or going to be published.</p>
                        </div>
                        <div className='w-[266px] h-[240px] border-[1px] border-white rounded-xl mt-[30px] flex flex-col items-center py-[15px]'>
                            <p className='text-[24px] w-[231px] font-bold text-white'>Origin Contract Address</p>
                            <p className='text-[14px] w-[216px]  text-white pt-[20px]'>A deployed contract address of your NFT (aka ERC721), this is not required now in draft version. But it will be required before you deploy on testnet and mainnet</p>
                        </div>
                        <div className='w-[266px] h-[240px] border-[1px] border-white rounded-xl mt-[30px] flex flex-col items-center py-[15px]'>
                            <p className='text-[24px] w-[231px] font-bold text-white'>Origin Base URI</p>
                            <p className='text-[14px] w-[216px]  text-white pt-[20px]'>An existing endpoint URL you use as NFT metadata. This is not required in case you plan to create all attributes in Gen 2</p>
                        </div>
                    </div>
                </div>
                {isError &&
                    <div className='absolute duration-500' onClick={() => { setisError(false); }}>
                        <Darkbg ></Darkbg>
                        <AlertCard ML={320} MT={-250} Width={266} Height={140} heaDer="Required" detailsText="Origin Chain is required. Please choose one of the supported Chain"  ></AlertCard>
                        <RedAleart Height={20} Width={120} Rotate={90} ML={195} MT={-187} detailsText="not available" ></RedAleart> : <div></div>
                    </div>
                }
            </div>
        </div>

    )
}

export default NewIntregation6