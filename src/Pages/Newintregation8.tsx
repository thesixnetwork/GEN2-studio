
import Box from '../component/Box';

import React, { useEffect, useState } from "react";
import { Tooltip } from "@mui/material";

import Add from "../pic/Group 40.png";

import Conectwalet from "../component/Connectwallet";
import Stepper2 from "../component/Stepper2";
import Darkbg from "../component/Alert/Darkbg";
import AlertCard from "../component/Alert/AlertCard";

import Swal from "sweetalert2";




import AttributeBox from "../component/AttributeBox";
import NormalButton from "../component/NormalButton";
import { useNavigate } from "react-router-dom";
import AttributeBox2 from '../component/AttributeBox2';


export default function Newintregation8() {

    const [isShow, setIsShow] = useState(false);
    const [save, setSave] = useState(false);
    const navigate = useNavigate();
    const [text, setText] = useState([
        {
            name: "",
            dataType: "",
            traitType: "",
            value:"" ,
            Error: "",
        },
        {
            name: "",
            dataType: "",
            traitType: "",
            value:"" ,
            Error: "",
        },
        {
            name: "",
            dataType: "",
            traitType: "",
            value:"" ,
            Error: "",
        },

    ]);





    const searchError = () => {
        for (var i = 0; i < text.length; i++) {
            if (text[i].Error === "F") {
                document.getElementById(i).scrollIntoView({ behavior: 'smooth' });
                break
            }
        }
    }

    const checkALLError = () => {
        console.log("before", text)
        text.filter((item) => console.log("=item=", item.Error))
        const allErrorsAreT = text.every((item) => item.Error === 'T');
        console.log("after", text)
        console.log(allErrorsAreT)
        if (text.every((item) => item.Error === 'T')) {
            navigate('/newintregation/9')
            console.log('All errors are T. Do something...');
        } else {
            // Not all Error properties are 'T'
            console.log('Not all errors are T.');
        }
    }

    const LoadingCheckErro = () => {
        let timerInterval
        Swal.fire({
            title: 'Loading ...',
            html: 'I will close in <b></b> milliseconds.',
            timer: 500,
            timerProgressBar: true,
            didOpen: () => {
                Swal.showLoading()
                const b = Swal.getHtmlContainer().querySelector('b')
                timerInterval = setInterval(() => {
                    b.textContent = Swal.getTimerLeft()
                }, 100)
            },
            willClose: () => {
                clearInterval(timerInterval)
            }
        }).then((result) => {
            /* Read more about handling dismissals below */
            if (result.dismiss === Swal.DismissReason.timer) {
                console.log('I was closed by the timer')
            }
        })

    }
    const handleSave = () => {
        setSave(true);
        searchError()
        setTimeout(() => {
            checkALLError()
            setMessage('Delayed message');
        }, 500);
        LoadingCheckErro()
    };



    const handleCreateAttribute = () => {
        const newAttribute = {
            name: "",
            dataType: "",
            traitType: "",
            Error: "F",
        };

        setText([...text, newAttribute]);

    };


    const [helpStep, sethelpStep] = useState(0)
    const handleHelp = () => {
        const element0 = document.getElementById("0");
        const elementDelete2 = document.getElementById("delete2");
        const elementPlus = document.getElementById("plus");

        if (element0 && elementDelete2 && elementPlus) {
            element0.style.zIndex = "0";
            elementDelete2.style.zIndex = "0";
            elementPlus.style.zIndex = "0";

            console.log(helpStep);
            sethelpStep(helpStep + 1);
        }
    };

    useEffect(() => {
        document.getElementById("plus").style.zIndex = "0";
        document.getElementById("delete2").style.zIndex = "0";
        document.getElementById("0").style.zIndex = "0";
        if (helpStep === 1) {
            document.getElementById("0").style.zIndex = "50";
            document.getElementById("0").scrollIntoView({ behavior: 'smooth' });
        } else if (helpStep === 2) {
            document.getElementById("delete2").style.zIndex = "50";
            document.getElementById("delete2").scrollIntoView({ behavior: 'smooth' });
        } else if (helpStep === 3) {
            document.getElementById("plus").style.zIndex = "50";
            document.getElementById("plus").scrollIntoView({ behavior: 'smooth' });

        } else if (helpStep === 5) {
            setIsShow(false)
            sethelpStep(0)
        }

    }, [helpStep]);

    const handleClickScroll = () => {
        const element = document.getElementById('10');
        if (element) {
            // 👇 Will scroll smoothly to the top of the next section
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <div className="w-full flex justify-center ">
            <div className="w-full h-full fixed  flex justify-center items-center bg-gradient-24  from-white to-[#7A8ED7]">
                <div className="w-[1280px] h-[832px] bg-gradient-24 to-gray-700 from-gray-300 rounded-2xl flex justify-between p-4 shadow-lg shadow-black/20 dark:shadow-black/40">
                    <div className="w-full h-full px-[20px]">
                        <div>
                            <Stepper2 ActiveStep={4}></Stepper2>
                            <div className="w-[931px] h-[1px] bg-[#D9D9D9]"></div>
                        </div>
                        <div className="w-full h-[700px] overflow-scroll flex  justify-start relative">
                            <div className="grid-cols-3 grid gap-y-8 gap-x-10 px-2 py-5  absolute">
                                {text.map((item, index) => (
                                    <AttributeBox2
                                        Title={["abc", "123", "Y/N"]}
                                        Name={item.name}
                                        DataType={item.dataType}
                                        TraitType={item.traitType}
                                        Value={null}
                                        text={text}
                                        setText={setText}
                                        key={index}
                                        index={index}
                                        save={save}
                                        setSave={setSave}
                                        isShow={isShow}
                                        setIsShow={setIsShow}
                                        helpStep={helpStep}
                                    
                                    />
                                ))}
                                <div
                                    id="plus"
                                    onClick={handleCreateAttribute}
                                    className="w-[267px] h-[187px] flex justify-center items-center bg-transparent border border-white rounded-xl p-3 hover:scale-105 cursor-pointer duration-300  "
                                >
                                    <img src={Add}></img>
                                    {isShow && helpStep === 3 && (
                                        <div className="">
                                            <AlertCard
                                                BG={1}
                                                ML={130}
                                                MT={-70}
                                                Width={266}
                                                Height={140}
                                                heaDer={`Add attributes`}
                                                detailsText="You can add more attributes than the original on your origin base uri if you want"
                                            ></AlertCard>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="w-2/6 h-5/6 flex flex-col items-end justify-between  ">
                        <Conectwalet></Conectwalet>
                        <Box Title='Onchain Collection Attributes' DeTail='Onchain Collection attributes is the dynamic type of metadata which represent the global attribute of the schema. And every NFT Metadata will include these attributes and its value by default.

These attributes can change base on action that we performed.&thinsp;

If the name key of the Onchain attribute matches, the module will prioritize the Onchain attribute over the Origin Attribute.
 
  You can edit/add/ remove value of attributes by double click the value/ click + button and click x button  and change to your proper design.'></Box>
                        <div

                            className=" w-full mt-[20px] flex items-center justify-between px-2 "
                        >
                            <div onClick={handleClickScroll} >
                                <NormalButton TextTitle="RESET" BorderRadius={0} FontSize={32}></NormalButton>
                            </div>
                            <div onClick={handleSave} >
                                <NormalButton TextTitle="NEXT" BorderRadius={0} FontSize={32}></NormalButton>
                            </div>

                        </div>
                        <Tooltip title={"help"}>
                            <div
                                onClick={() => {
                                    setIsShow(true);
                                    handleHelp();
                                }}
                                className=" z-[51] w-[50px] h-[50px] rounded-full bg-transparent  hover:bg-slate-200 flex justify-center items-center absolute text-[50px] mt-[730px] mr-[20px] cursor-pointer hover:scale-150 hover:text-[#262f50] duration-500"
                            >
                                ?
                            </div>
                        </Tooltip>
                    </div>
                </div>
                {isShow && (
                    <div
                        className="absolute duration-500"
                        onClick={() => {
                            setIsShow(!isShow);
                            sethelpStep(0)
                        }}
                    >
                        <Darkbg></Darkbg>

                    </div>
                )}
            </div>
        </div>
    )
}


