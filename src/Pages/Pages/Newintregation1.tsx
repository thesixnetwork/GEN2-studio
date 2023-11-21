import React from 'react'
import Conectwalet from '../component/Connectwallet'


import { Link } from 'react-router-dom'
import GobackButton from '../component/GobackButton'
import WhiteBox from '../component/WhiteBox'
import WhiteBoxRound from '../component/WhiteBoxRound'

const NewIntregation1 = () => {
    return (
        <div className='w-full flex justify-center ' >
            <div className='w-full h-full fixed  flex justify-center items-center bg-gradient-24  from-white to-[#7A8ED7]'>
                <div className='w-[1280px] h-[832px] bg-gradient-24 to-gray-700 from-gray-300 rounded-2xl flex justify-between p-4 shadow-lg shadow-black/20 dark:shadow-black/40'>

                    <div className='flex flex-col  justify-center items-center w-full mt-[5%] relative '>
                        <Link to={`/newintregation/2`} className=' w-full flex justify-center items-center'>
                            <WhiteBoxRound 
                                Title={'Beginer'}
                                DeTail={'At the beginner level, users have little to no programming experience. They are eager to learn and understand the basics of programming. The user interface will be designed to provide simple navigation, clear instructions, and visual aids to support their learning process.'}
                                Height={187} Widgth={151}></WhiteBoxRound>
                        </Link>
                        <Link to={`/newintregation/2`} className=' w-full flex justify-center items-center'>
                            <WhiteBoxRound
                                Title={'Intermediate'}
                                DeTail={'At the intermediate level, users have some programming experience and understanding of core concepts. The user interface will provide advanced features and resources to support their continued growth and development'}
                                Height={187} Widgth={751}></WhiteBoxRound>
                        </Link>
                        <Link to={`/newintregation/2`} className=' w-full flex justify-center items-center'>
                            <WhiteBoxRound
                                Title={'For Developer'}
                                DeTail={'For developers, the user interface will offer advanced tools and features that cater to their extensive programming experience and expertise.'}
                                Height={187} Widgth={751}></WhiteBoxRound>
                        </Link>
                        <div className='absolute bottom-0 left-0'>
                            <GobackButton BackPage='/'></GobackButton>
                        </div>
                    </div>

                    <div>
                        <Conectwalet></Conectwalet>
                        <WhiteBox
                            Title='What is your level of programming experience?'
                            DeTail='The user interface of the page will be tailored to your programming experience. Based on your selection, whether you are a beginner, intermediate, or a developer, we will customize the interface to provide you with the most suitable tools and features that align with your level of experience.'
                            Height={400} Width={266} TitleSize={18} DetailSize={16}  ></WhiteBox>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default NewIntregation1