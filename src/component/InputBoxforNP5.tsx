import React, { useEffect, useState } from 'react'
import RedAleart from './Alert/RedAleart';

interface MyComponentProps {

    Name: string;
    DataType: string;
    TraitType: string;
    Value: string | null;
    index: number;
    text: Array<{ name: string; dataType: string; traitType: string }>;
    setisError: React.Dispatch<React.SetStateAction<boolean>>;
    setText: React.Dispatch<
        React.SetStateAction<
            Array<{ name: string; dataType: string; traitType: string }>
        >
    >;
    isShow: boolean;
    setIsShow: React.Dispatch<React.SetStateAction<boolean>>;
    save: boolean;
    setSave: React.Dispatch<React.SetStateAction<boolean>>;
    errorObj: Array<{ error: boolean; errorMessage: string }>; // Corrected this line
    setErrorObj: React.Dispatch<
        React.SetStateAction<Array<{ error: boolean; errorMessage: string }>>
    >;
    helpStep: number;
    Next: boolean;
    FindSchemaCode: any;
    isDuplicateShemaCode: boolean;
    setisDuplicateShemaCode: React.Dispatch<React.SetStateAction<boolean>>;
    InitialData: string[];
}

export default function InputBoxforNP5(props: MyComponentProps) {
    const [errorMessage, setErrorMessage] = useState("Error message")
    const [iser, setIser] = useState(false)



    const handleChange = (e) => {
        const updatedText = [...props.text];
        updatedText[props.index].value = e.target.value;
        //props.setText(updatedText);
        // setIsShow(false)
        console.log(props.text)
    };

    function containsSpecialChars(str) {
        const specialChars = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,<>\/?~]/;
        return specialChars.test(str);
    }

    function containsSpace(str) {
        const specialChars = / /;
        return specialChars.test(str);
    }

    function containsUppercase(str) {
        return /[A-Z]/.test(str);
    }

    const saveCheckErrorI = async (str) => {
        document.getElementById(`box${props.index}`).style.zIndex = "0";
        const updatedText = [...props.text];
        updatedText[props.index].Error = true;
        console.log(str)
        setIser(false)
        if (props.text[props.index].require) {
            if (!str) {
                setErrorMessage("Not Availible")
                setIser(true)
                updatedText[props.index].Error = false;
                document.getElementById(`box${props.index}`).style.zIndex = "50";
            }
            else if (containsSpecialChars(str)) {
                setErrorMessage("Special Characters")
                setIser(true)
                updatedText[props.index].Error = false;
                document.getElementById(`box${props.index}`).style.zIndex = "50";
            }
            else if (containsSpace(str)) {
                setErrorMessage("Space")
                setIser(true)
                updatedText[props.index].Error = false;
                document.getElementById(`box${props.index}`).style.zIndex = "50";
            }
            else if (containsUppercase(str)) {
                setErrorMessage("Uppercase")
                setIser(true)
                updatedText[props.index].Error = false;
                document.getElementById(`box${props.index}`).style.zIndex = "50";
            }
            else if (!props.text[0].duplicate) {
                console.log("SANAMEEFSADAS DUPLOICATE")
                setErrorMessage("Duplicate schema_code")
                setIser(true)
                updatedText[props.index].Error = false;
                document.getElementById(`box${props.index}`).style.zIndex = "50";
            }
            else {
                setIser(false)
                updatedText[props.index].Error = true;
                document.getElementById(`box${props.index}`).style.zIndex = "0";
            }
        }
        else if (containsSpecialChars(str) && (props.index !== 2)) {
            setErrorMessage("Speail Chars")
            setIser(true)
            updatedText[props.index].Error = false;
            document.getElementById(`box${props.index}`).style.zIndex = "50";
        }
        else {
            setIser(false)
            document.getElementById(`box${props.index}`).style.zIndex = "0";
            updatedText[props.index].Error = true;
        }
    }

    useEffect(() => {
        if (props.Next) {
            saveCheckErrorI(props.text[props.index].value)
        }
    }, [props.Next])

    return (
        <div id={`box${props.index}`} className='relative w-[658px] h-[121px] border-[1px] border-white rounded-xl p-2 flex items-center justify-center  '>
            <div className=' w-4/5 flex justify-start items-center '>
                <p className='font-bold text-[24px] w-2/5 mr-[5%]'>{props.text[props.index].Name}</p>
                <input
                    // value={props.text[props.index].value}
                    type="text"
                    // onChange={handleInputschemaCode}
                    onChange={async (e) => {
                        await handleChange(e);
                        if (props.index === 0) {
                            await props.FindSchemaCode();
                        }
                        await saveCheckErrorI(props.text[props.index].value);
                        props.setisError(false)
                        console.log(props.text)
                    }}
                    placeholder={props.text[props.index].placeholder}
                    className={` placeholder-slate-300 bg-transparent text-[24px] border-[1px] border-[#D9D9D9DD] border-dashed p-1 focus:outline-none focus:scale-105 duration-1000`}>
                </input>
                <div className={`w-[15px] h-[15px]  ${props.text[props.index].require ? 'bg-[#D9D9D9]' : 'bg-transparent'} rounded-full absolute border top-2 right-2`}></div>
            </div>
            {iser &&
                <div className='mt-[8%] mr-[9%] absolute '>
                    <RedAleart Height={20} Width={260} Rotate={0} ML={0} MT={2} detailsText={errorMessage} />
                </div>
            }
        </div>
    )
}