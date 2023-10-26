import React, { useEffect, useState } from "react";
import { Select, MenuItem, styled, InputBase } from "@mui/material";
import Swal from "sweetalert2";
import ClearIcon from "@mui/icons-material/Clear";
import RedAleart from "./Alert/RedAleart";
import ReactDOM from "react-dom";
import { set, useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import AlertCard from "./Alert/AlertCard";
import { border } from "@chakra-ui/react";




interface MyComponentProps {
    State: number;
    Title: string[];
    Name: string;
    DataType: string;
    TraitType: string;
    Value: string | null;
    index: number;
    text: Array<{ name: string; dataType: string; traitType: string; value: string }>;
    setText: React.Dispatch<
        React.SetStateAction<
            Array<{ name: string; dataType: string; traitType: string; value: string }>
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

}

// interface MyComponentProps2 {
//     Title: string[];
// }

// export function VariableIcon(props: MyComponentProps2) {
//     const [selectedItem, setSelectedItem] = useState("");

//     const changeBgColorButton = (e) => {
//         const itemId = e.target.id;
//         //(itemId)
//         setSelectedItem(itemId);


//     };

//     return (
//         <div className="flex w-[160px] justify-between">
//             <div
//                 onClick={changeBgColorButton}
//                 id="0"
//                 className={`cursor-pointer hover:scale-110 duration-500 w-[50px] h-[50px] rounded-full flex justify-center items-center border-[#D9D9D9DD] border-2 border-dashed ${selectedItem === '0' ? 'bg-[#D9D9D975]' : 'bg-transparent'}`}
//             >
//                 {props.Title[0]}
//             </div>
//             <div
//                 onClick={changeBgColorButton}
//                 id="1"
//                 className={`cursor-pointer hover:scale-110 duration-500 w-[50px] h-[50px] rounded-full flex justify-center items-center border-[#D9D9D9DD] border-2 border-dashed ${selectedItem === '1' ? 'bg-[#D9D9D975]' : 'bg-transparent'
//                     }`}
//             >
//                 {props.Title[1]}
//             </div>
//             <div
//                 onClick={changeBgColorButton}
//                 id="2"
//                 className={`cursor-pointer hover:scale-110 duration-500 w-[50px] h-[50px] rounded-full flex justify-center items-center border-[#D9D9D9DD] border-2 border-dashed ${selectedItem === '2' ? 'bg-[#D9D9D975]' : 'bg-transparent'
//                     }`}
//             >
//                 {props.Title[2]}
//             </div>
//         </div>
//     );
// }

export default function AttributeBox(props: MyComponentProps) {

    const [errorMessage, setErrorMessage] = useState("");
    const [iser, setIser] = useState(false);
    const [partI, setPartI] = useState(false);
    var [partII, setPartII] = useState(false);
    const [inputValue, setInputValue] = useState('');
    const [isInputDisabled, setInputDisabled] = useState(true);



    const handleClick = () => {
        // Update the input value here
    };


    const Delete = styled(ClearIcon)({
        borderRadius: "16px",
        transition: "color 0.3s, border 0.3s",
        border: "2px solid white",
        cursor: "pointer",
    });

    // const WhiteNativeSelect = styled(InputBase)({
    //     color: "white",
    //     textDecoration: "underline",
    //     fontSize: 14,
    //     "& svg": {
    //         fill: "white",
    //     },
    // });

    function containsSpecialChars(str) {
        const specialChars = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
        return specialChars.test(str);
    }

    function containsSpace(str) {
        const specialChars = / /;
        return specialChars.test(str);
    }

    function containsUppercase(str) {
        return /[A-Z]/.test(str);
    }


    const handleChange = (e, fieldPath) => {
        const updatedText = [...props.text];
        const fieldPathArray = fieldPath.split('.'); // Split the fieldPath into an array of nested properties

        let target = updatedText[props.index];
        for (let i = 0; i < fieldPathArray.length - 1; i++) {
            target = target[fieldPathArray[i]];
        }

        const lastField = fieldPathArray[fieldPathArray.length - 1];
        target[lastField] = e.target.value;

        console.log(updatedText[props.index]);
        props.setText(updatedText);
        props.setIsShow(false);
    };

    const handleChangetrait_type = (e, path) => {
        const updatedText = [...props.text];
        updatedText[props.index].path = e.target.value;
        props.setText(updatedText);
        props.setIsShow(false)
    };

    const saveCheckErrorI = async (str) => {
        setIser(false)
        setPartI(false)
        if (!str) {
            setErrorMessage("Not Availible")
            setIser(true)
        }
        else if (containsSame(str)) {
            setErrorMessage("Not Same")
            setIser(true)
        }
        else if (containsSpecialChars(str)) {
            setErrorMessage("Sp Chars")
            setIser(true)
        }
        else if (containsSpace(str)) {
            setErrorMessage("Space")
            setIser(true)
        }
        else if (containsUppercase(str)) {
            setErrorMessage("Uppercase")
            setIser(true)
        }
        else {
            setIser(false)
            setPartI(true)
        }
    }

    function containsSame(str) {
        for (var i = 0; i <= props.text.length - 1; i++) {
            if ((i != props.index) && (str === props.text[i].name) && (props.text[i].name != "")) {
                return true
                break
            }
        }
    }

    // useEffect(() => {
    //     setErrorMessage("Not Same")
    //     setIser(true)
    // }, [SAME]);



    const CheckErrorI = async (e) => {
        setPartI(false)
        if (!e.target.value) {
            setErrorMessage("Not Availible")
            setIser(true)
        }
        else if (containsSame(e.target.value)) {
            setErrorMessage("Not Same")
            setIser(true)

        }
        else if (containsSpecialChars(e.target.value)) {
            setErrorMessage("Sp Chars")
            setIser(true)
        }
        else if (containsSpace(e.target.value)) {
            setErrorMessage("Space")
            setIser(true)
        }
        else if (containsUppercase(e.target.value)) {
            setErrorMessage("Uppercase")
            setIser(true)
        }
        else {
            setIser(false)
            setPartI(true)
        }

    }
    const checkErrorII = (e) => {
        if (!e.target.value) {
            setErrorMessage("Not Availible")
            setIser(true)
        }
        else if (containsSpace(e.target.value)) {
            setErrorMessage("Space")
            setIser(true)
        }
        else {
            setIser(false)
        }
    }

    const checkErrorIII = async () => {
        await setPartII(false)
        if (props.text[props.index].data_type === "") {
            setErrorMessage("Need data type")
            setIser(true)
        } else {
            setIser(false)
            setPartII(true)
        }
    }

    const SavecheckErrorIII = async () => {
        await setPartII(false)
        // console.log(props.text[props.index].dataType)
        // console.log(props.text[props.index].dataType === "")
        if (props.text[props.index].data_type === "") {
            setErrorMessage("Need data type")
            setIser(true)
        } else {
            setIser(false)
            setPartII(true)
            // console.log("partII",partII)
        }
    }

    const SavecheckErrorII = (str) => {
        setIser(false)
        if (!str) {
            setErrorMessage("Not Availible")
            setIser(true)
        }
        else {
            setIser(false)
            return (true)
        }

    }

    const handleDeleteAttribute = () => {
        const updatedText = [
            ...props.text.slice(0, props.index),
            ...props.text.slice(props.index + 1),
        ];
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#8799DB",
            cancelButtonColor: "#FFAA9A",
            iconColor: "#FFCE74",
            confirmButtonText: "Yes, delete it!",
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire({
                    icon: "success",
                    title: "Your token attribute has been deleted.",
                    showConfirmButton: false,
                    timer: 1500,
                }).then(() => {
                    props.setText(updatedText);
                });
            }
        });
    };

    // const checkError = (text) => {
    //     const nameSet = new Set();


    //     const newErrors = text.map((item) => {

    //         //("item =", item)
    //         const errorObj = {};

    //         if (nameSet.has(item.name)) {
    //             Object.assign(errorObj, { error: true, errorMessage: "Duplicate Name" });
    //         }

    //         if (item.name.includes(" ")) {

    //             Object.assign(errorObj, { error: true, errorMessage: "Have Space" });
    //         }

    //         if (item.name === null || item.dataType === null || item.traitType === null) {
    //             Object.assign(errorObj, { error: true, errorMessage: "Can't be empty" });
    //         }

    //         nameSet.add(item.name);

    //         return errorObj;
    //     });
    //     props.setErrorObj(newErrors);
    // };




    // const test = () => {
    //     const newArray = props.text.map(() => ({
    //         error: false,
    //         errorMessage: "",
    //     }));
    //     props.setErrorObj(newArray);
    //     //(props.errorObj);
    // };

    const searchError = () => {
        // console.log(`name :${props.text[props.index].name}`)
        for (var i = 0; i <= props.text.length; i++) {

            // //.log(`dataType :${props.text[i].dataType}`)
            // //.log(`traitType :${props.text[i].traitType}`)
        }
    }

    useEffect(() => {
        if (props.save) {
            fetchError()
            // searchError()
        }
        props.setSave(false);
    }, [props.save]);

    const fetchError = async () => {
        //.log(props.index)

        const updatedText = [...props.text];
        updatedText[props.index]["Error"] = "F";
        props.setText(updatedText);

        await saveCheckErrorI(props.text[props.index].name);
        //.log("partI",partI)
        if (partI) {
            await SavecheckErrorIII()
            //.log("partII",partII)
            if (partII) {
                SavecheckErrorII(props.text[props.index].display_option.opensea.trait_type)
                if (SavecheckErrorII(props.text[props.index].display_option.opensea.trait_type)) {
                    SavecheckErrorII(props.text[props.index].value)
                    console.log("COCO:", SavecheckErrorII(props.text[props.index].value))
                    if (SavecheckErrorII(props.text[props.index].value)) {
                        document.getElementById(props.index).style.zIndex = "0";
                        const updatedText = [...props.text];
                        updatedText[props.index]["Error"] = "T";
                        props.setText(updatedText);
                    }
                    else {
                        document.getElementById(props.index).style.zIndex = "50";
                        props.setIsShow(true)
                    }
                }
                else {
                    document.getElementById(props.index).style.zIndex = "50";
                    props.setIsShow(true)
                }
            }
            else {
                document.getElementById(props.index).style.zIndex = "50";
                props.setIsShow(true)
            }
        }
        else {
            document.getElementById(props.index).style.zIndex = "50";
            props.setIsShow(true)
        }


        // props.setEnum(0)
    };

    // useEffect(() => {


    // }, [props.text]);


    // const renderError = () => {
    //     return error ? (
    //         <RedAleart
    //             Height={20}
    //             Width={150}
    //             Rotate={90}
    //             ML={151}
    //             MT={-76}
    //             detailsText={errorMessage}
    //         />
    //     ) : null;
    // };

    // const addError = () => {
    //     const newArray = props.text.map(() => ({
    //         error: "",
    //         errorMessage: "",
    //     }));
    //     props.setErrorObj(newArray);
    //     //(props.errorObj);
    // };

    const [selectedItem, setSelectedItem] = useState("");

    const changeBgColorButton = async (e) => {
        setInputDisabled(false)
        setInputValue("")
        const itemId = e.target.id;
        await setSelectedItem(itemId);
        await handleChangeIcon(e)
        props.setIsShow(false)
        console.log(props.text)

    };

    const handleChangeIcon = (e) => {
        const updatedText = [...props.text];
        // //(typeof e.target.id)
        if (e.target.id == "Icon0") {
            updatedText[props.index]["data_type"] = "string";
            updatedText[props.index]["default_mint_value"] = { string_attribute_value: { value: "" } }
        }
        else if (e.target.id == "Icon1") {
            updatedText[props.index]["data_type"] = "Number";
            updatedText[props.index]["default_mint_value"] = { number_attribute_value: { value: 0 } }
        }
        else if (e.target.id == "Icon2") {
            updatedText[props.index]["data_type"] = "Boolean";
            updatedText[props.index]["default_mint_value"] = { boolean_attribute_value: { value: false } }
        }
        props.setText(updatedText);
    };

    const handleChangeValue = (e) => {
        setInputValue(e.target.value);
        const updatedText = [...props.text];
        const dataType = props.text[props.index].data_type.toLowerCase();
        console.log("type", dataType)
        if (props.text[props.index].data_type.toLowerCase() === "number") {
            updatedText[props.index]["default_mint_value"] = {
                [`${dataType}_attribute_value`]: {
                    value: e.target.value
                }
            };
        } else if (props.text[props.index].data_type.toLowerCase() === "boolean") {
            updatedText[props.index]["default_mint_value"] = {
                [`${dataType}_attribute_value`]: {
                    value: e.target.value === "true"
                }
            };
        }
        else {
            updatedText[props.index]["default_mint_value"] = {
                [`${dataType}_attribute_value`]: {
                    value: e.target.value
                }
            };
        }

        console.log(updatedText[props.index]); // Changed from props.text to updatedText
        props.setText(updatedText);
    }

    


    return (
        <div id={`${props.index}`} className="w-[267px] h-[227px] bg-transparent border-solid border border-white-600 rounded-xl px-3 pt-5 pb-5">
            <div
                id={`delete${props.index}`}
                className="w-[0px] h-[0px] rounded-full ml-[226px] mt-[-18px] absolute hover:scale-105 duration-500 "
            >
                <Delete
                    className=" hover:border-red-600 hover:text-red-600"
                    onClick={handleDeleteAttribute}
                />
                {props.isShow && props.index === 2 && props.helpStep === 2 && (
                    <div id={`AlertCard${props.index}`} className=" absolute">
                        <AlertCard
                            BG={1}
                            ML={-226}
                            MT={10}
                            Width={266}
                            Height={140}
                            heaDer={`Remove attribute`}
                            detailsText="If you do not want to use the attribute from base uri. You can remove it"
                        ></AlertCard>
                    </div>
                )}

            </div>

            <div className="h-full flex flex-col justify-between">
                <div className="flex text-[14px] items-center">
                    Name :&ensp;{" "}
                    <input
                        type="text"
                        onChange={async (e) => {
                            await handleChange(e, "name");
                            await CheckErrorI(e);

                        }}
                        // onBlur={() => { fetchError() }}
                        className="bg-transparent text-[14px] border-[1px] border-[#D9D9D9DD] placeholder-gray-300 border-dashed p-1 focus:outline-none focus:scale-105 duration-1000 w-[160px]"
                        placeholder="Add attribute name"
                    />
                </div>
                <div className="flex text-[14px] items-center">
                    Data type :&ensp;{" "}
                    <div className="flex w-[160px] justify-between">
                        <div
                            onClick={(e) => { changeBgColorButton(e); checkErrorIII(); }}
                            // onMouseLeave={() => fetchError()}
                            id="Icon0"
                            className={`cursor-pointer hover:scale-110 duration-500 w-[50px] h-[50px] rounded-full flex justify-center items-center border-[#D9D9D9DD] border-2 border-dashed ${selectedItem === 'Icon0' ? 'bg-[#D9D9D975]' : 'bg-transparent'}`}
                        >
                            {props.Title[0]}
                        </div>
                        <div
                            onClick={(e) => { changeBgColorButton(e); checkErrorIII(); }}
                            // onMouseLeave={() => fetchError()}
                            id="Icon1"
                            className={`cursor-pointer hover:scale-110 duration-500 w-[50px] h-[50px] rounded-full flex justify-center items-center border-[#D9D9D9DD] border-2 border-dashed ${selectedItem === 'Icon1' ? 'bg-[#D9D9D975]' : 'bg-transparent'
                                }`}
                        >
                            {props.Title[1]}
                        </div>
                        <div
                            onClick={(e) => { changeBgColorButton(e); checkErrorIII(); }}
                            // onMouseLeave={() => fetchError()}
                            id="Icon2"
                            className={`cursor-pointer hover:scale-110 duration-500 w-[50px] h-[50px] rounded-full flex justify-center items-center border-[#D9D9D9DD] border-2 border-dashed ${selectedItem === 'Icon2' ? 'bg-[#D9D9D975]' : 'bg-transparent'
                                }`}
                        >
                            {props.Title[2]}
                        </div>
                    </div>
                </div>
                <div className="flex text-[14px] items-center">
                    Trait type :&ensp;{" "}
                    <input
                        type="text"
                        value={props.TraitType}
                        onChange={(e) => {
                            handleChange(e, "display_option.opensea.trait_type");
                            // handleChangetrait_type(e);
                            SavecheckErrorII(props.text[props.index].display_option.opensea.trait_type)
                        }}
                        // onBlur={fetchError}
                        className="bg-transparent text-[14px] border-[1px] border-[#D9D9D9DD] placeholder-gray-300 border-dashed p-1 focus:outline-none focus:scale-105 duration-1000 w-[140px]"
                        placeholder="Add trait type here"
                    />
                </div>
                <div className="flex text-[14px] items-center">
                    Value :&ensp;{" "}
                    <input
                      
                        disabled={isInputDisabled}
                        value={inputValue}
                        id="Value"
                        type="text"
                        // value={props.Value}
                        onChange={(e) => {
                            handleChangeValue(e);
                            // if(props.State===4){
                            //     handleChange(e,"default_mint_value.float_attribute_value.value")
                            // }
                            // else if(props.State===5){
                            //     handleChange(e,"default_mint_value.string_attribute_value.value")
                            // }
                            SavecheckErrorII(props.text[props.index].value)
                        }}
                        // onBlur={fetchError}
                        className={`bg-transparent text-[14px] border-[1px] ${props.text[props.index].data_type === "" ? 'border-none' : 'border-[#D9D9D9DD]'} placeholder-gray-300 border-dashed p-1 focus:outline-none focus:scale-105 duration-1000 w-[140px]`}
                        placeholder={props.text[props.index].data_type ==="" ?  "Need data type" : "Add trait type here" }
                    />
                </div>

            </div>
            {iser &&
                <RedAleart
                    Height={20}
                    Width={260}
                    Rotate={0}
                    ML={-10}
                    MT={22}
                    detailsText={errorMessage}
                />
            }
            {props.isShow && props.index === 0 && props.helpStep === 1 && (
                <div id={`AlertCard${props.index}`} className="">
                    <AlertCard
                        BG={1}
                        ML={298}
                        MT={-140}
                        Width={266}
                        Height={140}
                        heaDer={`Edit value`}
                        detailsText="Click the text box to edit original value"
                    ></AlertCard>
                </div>
            )}


        </div>
    );
}