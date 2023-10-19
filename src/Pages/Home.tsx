import React, { useEffect } from 'react'
import logo1 from '../pic/Keplr_Icon 1.png'
import logo2 from '../pic/Copy.png'
import logo3 from '../pic/Share.png'
import logo4 from '../pic/SIX_Token_Icon 1.png'
import logo5 from '../pic/X.png'
import logo6 from '../pic/NFTBrowsItemFrame.png'
import logo7 from '../pic/Buakaw_Collection 1.png'
import logo8 from '../pic/Ethereum-icon-purple 1.png'
import logo9 from '../pic/SCR-25660710-nkmd 1.png'
import logo10 from '../pic/klaytn-klay-logo 1.png'
import Conectwalet from '../component/Connectwallet'
import { Link, useNavigate } from 'react-router-dom'
import WhiteBox from '../component/WhiteBox'
import axios from 'axios'
import { getAccessTokenFromLocalStorage } from '../helpers/AuthService'
import HomeDraftCard from '../component/HomeDraftCard'

const Home = () => {
    const [listDraft, setlistDraft] = React.useState([]);

    const getOriginAttributFromContract = async () => {
        const apiUrl = `https://six-gen2-studio-nest-backend-api-traffic-gateway-1w6bfx2j.ts.gateway.dev/schema/list_draft`;
        const params = {};

        const headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${getAccessTokenFromLocalStorage()}`,
        }

        try {
            const response = await axios.get(apiUrl, {
                params: params,
                headers: headers,
            });

            setlistDraft(response.data.data.sesstion);
            console.log("Response:", response.data);
        } catch (error) {
            console.error('Error:', error);
        }
    }

    useEffect(() => {
        getOriginAttributFromContract();
    }, []);

    useEffect(() => {
        console.log("Listdraft:", listDraft);
    }, [listDraft]);
    const navigate = useNavigate()


    return (
        <div className='w-full flex justify-center ' >
            <div className='w-full h-full fixed  flex justify-center items-center bg-gradient-24  from-white to-[#7A8ED7]'>
                <div className='w-[1280px] h-[832px] bg-gradient-24 to-gray-700 from-gray-300 rounded-2xl flex p-4  shadow-lg shadow-black/20 dark:shadow-black/40'>
                    <div className='h-full w-4/6 flex flex-col pl-[50px] pt-[50px] relative'>
                        <p className='text-[#FFFFFF] text-3xl mb-1'>Draft</p>
                        <div className='w-[891px] h-[1px] bg-[#D9D9D9]'></div>
                        <div className='flex mt-2 items-center  w-[1100px] h-[400px] overflow-scroll '>
                            <HomeDraftCard CollectionName={"New Intregation"} CollectionImage={'https://techsauce-nft.sixprotocol.com/techsauce/1.png'}></HomeDraftCard>
                            {listDraft && listDraft.map((item, index) => (
                                <div onClick={()=>{ navigate("/") }}>
                                    <HomeDraftCard CollectionName={item.schema_name} CollectionImage={''}></HomeDraftCard>
                                </div>

                            ))}
                        </div>
                        <p className='text-[#FFFFFF] text-3xl mt-[30px] mb-1 '>Live</p>
                        <div className='w-[891px] h-[1px] bg-[#D9D9D9]'></div>
                        <div className='mt-[30px] flex '>
                            <div className='flex flex-col justify-center items-center cursor-pointer'>
                                <div className=' flex  items-end hover:scale-105 duration-500 shadow-lg shadow-black/20 dark:shadow-black/40'>
                                    <img src={logo7} className='w-[197px] h-[232px] border-[#D9D9D9] border-[0.5px] rounded-2xl  '></img>
                                    <div className='w-[197px] h-[69px] bg-[#D9D9D9]/[0.8] rounded-b-2xl absolute flex flex-row justify-center items-center'>
                                        <img src={logo8} className='mr-2'></img>
                                        <p className='text-[#100072] text-[20px]  '>2000 Items</p>
                                    </div>
                                </div>
                                <p className='text-white text-2xl font-bold mt-3 hover:text-[#7A8ED7] duration-500 '>Buakaw1</p>
                            </div>

                            <div className='flex flex-col justify-center items-center ml-5 cursor-pointer'>
                                <div className=' flex  items-end hover:scale-105 duration-500 shadow-lg shadow-black/20 dark:shadow-black/40'>
                                    <img src={logo9} className='w-[197px] h-[232px] border-[#D9D9D9] border-[0.5px] rounded-2xl  '></img>
                                    <div className='w-[197px] h-[69px] bg-[#D9D9D9]/[0.8] rounded-b-2xl absolute flex flex-row justify-center items-center'>
                                        <img src={logo10} className='mr-2'></img>
                                        <p className='text-[#100072] text-[20px]  '>600 Items</p>
                                    </div>
                                </div>
                                <p className='text-white text-2xl font-bold mt-3  hover:text-[#7A8ED7] duration-500 '>Whale Gate Collection</p>
                            </div>
                        </div>
                    </div>
                    <div className='w-2/6 h-full flex flex-col items-end  '>
                        <Conectwalet></Conectwalet>
                        <div className=' mt-[70%]'>
                            <WhiteBox
                                Title={'Choose your collection'}
                                DeTail={'Create new integration, modify existing draft or manage collection which already in production.'}
                                Height={174} Width={266} TitleSize={20} DetailSize={15}>
                            </WhiteBox>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home