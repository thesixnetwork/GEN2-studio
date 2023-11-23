import React, { useEffect, useState } from "react";
import {
  // Select,
  // MenuItem,
  styled,
  // InputBase
} from "@mui/material";
import Swal from "sweetalert2";
import ClearIcon from "@mui/icons-material/Clear";
import RedAleart from "./Alert/RedAleart";
// import ReactDOM from "react-dom";
// import { set, useForm } from "react-hook-form";
// import { ErrorMessage } from "@hookform/error-message";
import AlertCard from "./Alert/AlertCard";
// import { border } from "@chakra-ui/react";

// import TextField from "@mui/material/TextField";
// import Stack from "@mui/material/Stack";
// import Autocomplete from "@mui/material/Autocomplete";
import { useAutocomplete } from "@mui/base/useAutocomplete";

const Label = styled("label")({
  display: "block",
});

const Input = styled("input")(({ theme }) => ({
  width: "140px",
  backgroundColor:
    theme.palette.mode === "light" ? "transparent" : "transparent",
  color: theme.palette.mode === "light" ? "#fff" : "#000",
  fontSize: "14px",
  border: "1px solid #D9D9D9DD",
  "border-style": "dashed",
  outline: "none",
  padding: "5px",
  "&:focus": {
    outline: "none",
    transform: "scale(1.05)",
    transition: "all 1000ms",
  },
}));

const Listbox = styled("ul")(({ theme }) => ({
  width: 200,
  marginLeft: 20,
  padding: 0,
  zIndex: 1,
  position: "absolute",
  listStyle: "none",
  backgroundColor: theme.palette.mode === "light" ? "#fff" : "#000",
  overflow: "auto",
  maxHeight: 200,
  color: theme.palette.mode === "light" ? "black" : "black",
  border: "1px solid rgba(0,0,0,.25)",
  "& li.Mui-focused": {
    backgroundColor: "#4a8df6",
    color: "black",
    cursor: "pointer",
  },
  "& li:active": {
    backgroundColor: "#2977f5",
    color: "black",
  },
}));

interface MyComponentProps {
  State: number;
  Title: string[];
  Name: string;
  DataType: string;
  TraitType: string;
  Value: string | null;
  index: number;
  text: Array<{
    name: string;
    dataType: string;
    traitType: string;
    value: string;
  }>;
  setText: React.Dispatch<
    React.SetStateAction<
      Array<{
        name: string;
        dataType: string;
        traitType: string;
        value: string;
      }>
    >
  >;
  isShow: boolean;
  setIsShow: React.Dispatch<React.SetStateAction<boolean>>;
  save: boolean;
  setSave: React.Dispatch<React.SetStateAction<boolean>>;

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
  // const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [iser, setIser] = useState(false);
  // const [textInputI, settextInputI] = useState("");
  const [partI, setPartI] = useState(false);
  const [partII, setPartII] = useState(false);
  // const [SAME, setSAME] = useState(false);
  // const [partIII, setPartIII] = useState(false);
  const [, setIsSuggest] = useState("");
  const [isValue, setIsValue] = useState("");
  const [isShowValue, setIsShowValue] = useState(false);
  const [optionsArray, setOptionsArray] = useState<string[]>([]);

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

  function containsSpecialChars(str: string) {
    // const specialChars = /[`!@#$%^&*()+\-=\[\]{};':"\\|,.<>\/?~]/;
    const specialChars = /[`!@#$%^&*()+\-=[\]{};':"\\|,.<>?~]/;
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
    // console.log("updatedText >",updatedText)
    // console.log("props.index >",props.index)
    const fieldPathArray = fieldPath.split("."); // Split the fieldPath into an array of nested properties

    let target = updatedText[props.index];
    for (let i = 0; i < fieldPathArray.length - 1; i++) {
      target = target[fieldPathArray[i]];
    }

    const lastField = fieldPathArray[fieldPathArray.length - 1];
    target[lastField] = e.target.value;

    // console.log(updatedText[props.index]);
    props.setText(updatedText);
    props.setIsShow(false);
  };

  const handleSuggestTraitType = async (str: string) => {
    const result = str
      .replace(/(\b\w)/g, (char) => char.toUpperCase())
      .replace(/_/g, " ");
    setIsSuggest(result);
    const resultArray = [result];
    setOptionsArray(resultArray);
    if(!str){
        setIsShowValue(false);
        return;
    }
    setIsShowValue(true);
  };

  // const handleChangetrait_type = (e, path) => {
  //   const updatedText = [...props.text];
  //   updatedText[props.index].path = e.target.value;
  //   props.setText(updatedText);
  //   props.setIsShow(false);
  // };

  // const CheckErrorComponent = async (e: any) => {
  //   setPartI(false);
  //   const updatedText = [...props.text];
  //   // console.log("props.index >", props.index);
  //   // console.log("updatedText[index] >", updatedText[props.index].name);
  //   // console.log(
  //   //   "containsSame(updatedText[props.index].name) >",
  //   //   containsSame(updatedText[props.index].name)
  //   // );
  //   /// check name ///
  //   if (
  //     !updatedText[props.index].name ||
  //     !updatedText[props.index].dataType ||
  //     !updatedText[props.index].traitType ||
  //     !updatedText[props.index].value
  //   ) {
  //     if (!updatedText[props.index].dataType) {
  //       // console.log(22222);
  //       setErrorMessage("Need datatype");
  //     }
  //     if (
  //       !updatedText[props.index].name ||
  //       !updatedText[props.index].traitType ||
  //       !updatedText[props.index].value
  //     ) {
  //       setErrorMessage("Not Availible");
  //     }
  //     setIser(true);
  //   } else if (
  //     updatedText[props.index].name &&
  //     updatedText[props.index].dataType &&
  //     updatedText[props.index].traitType &&
  //     updatedText[props.index].value
  //   ) {
  //     // console.log("all");
  //   } else {
  //     setIser(false);
  //     setPartI(true);
  //   }
  // };

  const saveCheckErrorI = async (str) => {
    setIser(false);
    setPartI(false);
    if (!str) {
      setErrorMessage("Not Availible");
      setIser(true);
    } else if (containsSame(str)) {
      setErrorMessage("Name can't be same");
      setIser(true);
    } else if (containsSpecialChars(str)) {
      setErrorMessage("Special characters are not allowed");
      setIser(true);
    } else if (containsSpace(str)) {
      setErrorMessage("Space are not allowed");
      setIser(true);
    } else if (containsUppercase(str)) {
      setErrorMessage("Uppercase are not allowed");
      setIser(true);
    } else {
      setIser(false);
      setPartI(true);
    }
  };

  function containsSame(str) {
    for (let i = 0; i <= props.text.length - 1; i++) {
      if (
        i != props.index &&
        str === props.text[i].name &&
        props.text[i].name != ""
      ) {
        return true;
        break;
      }
    }
  }

  const CheckErrorI = async (e) => {
    setPartI(false);
    const updatedText = [...props.text];
    if (!updatedText[props.index].name) {
      setErrorMessage("Not Availible");
      setIser(true);
    } else if (containsSame(e.target.value)) {
      setErrorMessage("Name can't be same");
      setIser(true);
    } else if (containsSpecialChars(updatedText[props.index].name)) {
      setErrorMessage("Special characters are not allowed");
      setIser(true);
    } else if (containsSpace(updatedText[props.index].name)) {
      setErrorMessage("Space are not allowed");
      setIser(true);
    } else if (containsUppercase(updatedText[props.index].name)) {
      setErrorMessage("Uppercase are not allowed");
      setIser(true);
    } else {
      setIser(false);
      setPartI(true);
    }
  };

  const CheckErrorIIII = async (str: string) => {
    setPartI(false);
    if (!str) {
      setErrorMessage("Not Availible");
      setIser(true);
      return true;
    } else if (containsSame(str)) {
      setErrorMessage("Name can't be same");
      setIser(true);
      return true;
    } else if (containsSpecialChars(str)) {
      setErrorMessage("Special characters are not allowed");
      setIser(true);
      return true;
    } else if (containsSpace(str)) {
      setErrorMessage("Space are not allowed");
      setIser(true);
      return true;
    } else if (containsUppercase(str)) {
      setErrorMessage("Uppercase are not allowed");
      setIser(true);
      return true;
    } else {
      setIser(false);
      setPartI(true);
      return false;
    }
  };
  // const checkErrorII = (e) => {
  //   if (!e.target.value) {
  //     setErrorMessage("Not Availible");
  //     setIser(true);
  //   } else if (containsSpace(e.target.value)) {
  //     setErrorMessage("Space are not allowed");
  //     setIser(true);
  //   } else {
  //     setIser(false);
  //   }
  // };

  const checkErrorIII = async () => {
    await setPartII(false);
    if (!props.text[props.index].name) {
      setErrorMessage("Not Availible");
      setIser(true);
      return;
    } else if (containsSame(props.text[props.index].name)) {
      setErrorMessage("Name can't be same");
      setIser(true);
      return;
    } else if (containsSpecialChars(props.text[props.index].name)) {
      setErrorMessage("Special characters are not allowed");
      setIser(true);
      return;
    } else if (containsSpace(props.text[props.index].name)) {
      setErrorMessage("Space are not allowed");
      setIser(true);
      return;
    } else if (containsUppercase(props.text[props.index].name)) {
      setErrorMessage("Uppercase are not allowed");
      setIser(true);
      return;
    }

    if (props.text[props.index]["data_type"] === "") {
      setErrorMessage("Need datatype");
      setIser(true);
    } else if (props.text[props.index]["data_type"] === "string") {
      setIser(false);
    } else if (props.text[props.index]["data_type"] === "number") {
      const isValue =
        props.text[props.index]["default_mint_value"]["number_attribute_value"]
          .value;
      setErrorMessage("Value is not of type number");
      setIser(true);
      if (typeof isValue !== "number" && !isValue) {
        setIser(true);
      }

      if (typeof isValue === "number") {
        setIser(false);
      }
    } else if (props.text[props.index]["data_type"] === "boolean") {
      const isValue =
        props.text[props.index]["default_mint_value"]["boolean_attribute_value"]
          ?.value;
      setErrorMessage("Value is not of type boolean");
      setIser(true);

      if (typeof isValue === "boolean") {
        setIser(false);
      }
    } else {
      setIser(false);
      setPartII(true);
    }
  };

  // const checkValueAndDataType = async (str: string) => {
  //   if (props.DataType === "string") {
  //     if (str === "true" || str === "false") {
  //       return "Value is not of type string";
  //     }

  //     if (!/^[a-z]*$/.test(str) && typeof str === "string") {
  //       if (str.includes(".")) {
  //         return "Value is not of type string";
  //       }
  //       return "Value is not of type string";
  //     }
  //   }

  //   if (props.DataType === "number") {
  //     if (!str && str != "0") {
  //       return "Value is not of type number";
  //     }

  //     if (str === "true" || str === "false") {
  //       return "Value is not of type number";
  //     }

  //     if (!/^[0-9]*$/.test(str) && typeof str === "string") {
  //       if (str.includes(".")) {
  //         return "Value is not of type number";
  //       }
  //       return "Value is not of type number";
  //     }
  //   }

  //   if (props.DataType === "boolean") {
  //     if (str.toString() !== "true" && str.toString() !== "false") {
  //       return "Value is not of type boolean";
  //     }
  //   }

  //   return;
  // };

  const SavecheckErrorIII = async () => {
    await setPartII(false);

    if (props.text[props.index]["data_type"] === "") {
      setErrorMessage("Need datatype");
      setIser(true);
    } else {
      setIser(false);
      setPartII(true);
    }
  };

  const SavecheckErrorII = async () => {
    setIser(false);

    if (await CheckErrorIIII(props.text[props.index].name)) {
      return;
    } else {
      setIser(false);
      return true;
    }
  };

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

  useEffect(() => {
    if (props.save) {
      console.log("props.save =>", props.save);
      fetchError();
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
    if (partI) {
      await SavecheckErrorIII();
      if (partII) {
        SavecheckErrorII();
        if (await SavecheckErrorII()) {
          SavecheckErrorII();
          //   console.log("COCO:", SavecheckErrorII(props.text[props.index].value));
          if (await SavecheckErrorII()) {
            document.getElementById(props.index.toString())!.style.zIndex = "0";
            const updatedText = [...props.text];
            updatedText[props.index]["Error"] = "T";
            props.setText(updatedText);
          } else {
            document.getElementById(props.index.toString())!.style.zIndex =
              "50";
            props.setIsShow(true);
          }
        } else {
          document.getElementById(props.index.toString())!.style.zIndex = "50";
          props.setIsShow(true);
        }
      } else {
        document.getElementById(props.index.toString())!.style.zIndex = "50";
        props.setIsShow(true);
      }
    } else {
      document.getElementById(props.index.toString())!.style.zIndex = "50";
      props.setIsShow(true);
    }

    // props.setEnum(0)
  };

  // const [selectedItem, setSelectedItem] = useState("Icon0");
  const [selectedItemValue, setSelectedItemValue] = useState("Icon4");

  const changeBgColorButton = async (e) => {
    await handleChangeIcon(e);
    props.setIsShow(false);
  };

  const changeBgColorButtonValue = async (e) => {
    const itemId = e.target.id;
    await setSelectedItemValue(itemId);
    await handleChangeIconValue(e);
    props.setIsShow(false);
  };

  const handleChangeIconValue = (e) => {
    const updatedText = [...props.text];

    if (e.target.id == "Icon4") {
      updatedText[props.index]["default_mint_value"] = {
        boolean_attribute_value: {
          value: true,
        },
      };
    } else if (e.target.id == "Icon5") {
      updatedText[props.index]["default_mint_value"] = {
        boolean_attribute_value: {
          value: false,
        },
      };
    }
  };

  const handleChangeIcon = (e) => {
    const updatedText = [...props.text];
    if (e.target.id == "string") {
      updatedText[props.index]["data_type"] = "string";
      updatedText[props.index]["default_mint_value"] = {
        string_attribute_value: {
          value:
            props.text[props.index]["default_mint_value"][
              "string_attribute_value"
            ]?.value ||
            props.text[props.index]["default_mint_value"]["_attribute_value"]
              ?.value,
        },
      };
    } else if (e.target.id == "number") {
      updatedText[props.index]["data_type"] = "number";
      updatedText[props.index]["default_mint_value"] = {
        number_attribute_value: {
          value: 0,
        },
      };
    } else if (e.target.id == "boolean") {
      updatedText[props.index]["data_type"] = "boolean";
      updatedText[props.index]["default_mint_value"] = {
        boolean_attribute_value: {
          value: true,
        },
      };
    }
    props.setText(updatedText);
  };

  const handleChangValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    const updatedText = [...props.text];
    const dataType = props.text[props.index]["data_type"].toLowerCase();
    if (props.text[props.index]["data_type"].toLowerCase() === "number") {
      updatedText[props.index]["default_mint_value"] = {
        [`${dataType}_attribute_value`]: {
          value: parseInt(e.target.value),
        },
      };
    } else if (
      props.text[props.index]["data_type"].toLowerCase() === "boolean"
    ) {
      updatedText[props.index]["default_mint_value"] = {
        [`${dataType}_attribute_value`]: {
          value:
            e.target.value === "true" || e.target.value === "false"
              ? JSON.parse(e.target.value)
              : undefined,
        },
      };
    } else {
      updatedText[props.index]["default_mint_value"] = {
        [`${dataType}_attribute_value`]: {
          value: e.target.value,
        },
      };
    }
    props.setText(updatedText);
  };

  // const optionsArray = ["Option 1", "Option 2", "Option 3"];
  const handdleNameII = (e) => {
    setIsValue(e);
    if (!e) {
      setIsShowValue(false);
      return;
    }
    setIsShowValue(true);
  };


  const {
    getRootProps,
    getInputLabelProps,
    getInputProps,
    getListboxProps,
    getOptionProps,
    groupedOptions,
  } = useAutocomplete({
    id: "use-autocomplete-demo",
    options: optionsArray,
    disableClearable: true,
    value: isValue,
    getOptionLabel: (option) => option,
    onInputChange: (event, newValue) => {
      const inputValue = newValue;
      // handleSuggest(inputValue);
      handleChange(event, "display_option.opensea.trait_type");
      setIsSuggest(inputValue);
      // handleSuggestTraitType(inputValue);
      SavecheckErrorII();
    },
  });

  // const handleSuggest = (e) => {
  //   console.log("ddddddd", e);
  // };

  return (
    <div
      id={`${props.index}`}
      className="w-[267px] h-[227px] bg-transparent border-solid border border-white-600 rounded-xl px-3 pt-5 pb-5"
    >
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
            value={props.Name}
            onChange={async (e) => {
              await handleChange(e, "name");
              await CheckErrorI(e);
              await handleSuggestTraitType(e.target.value);
            }}
            className="bg-transparent text-[14px] border-[1px] border-[#D9D9D9DD] placeholder-gray-300 border-dashed p-1 focus:outline-none focus:scale-105 duration-1000 w-[160px]"
            placeholder="Add attribute name"
          />
        </div>
        <div className="flex text-[14px] items-center">
          Data type :&ensp;{" "}
          <div className="flex w-[160px] justify-between">
            <div
              onClick={(e) => {
                changeBgColorButton(e);
                checkErrorIII();
              }}
              id="string"
              className={`cursor-pointer hover:scale-110 duration-500 w-[50px] h-[50px] rounded-full flex justify-center items-center border-[#D9D9D9DD] border-2 border-dashed ${
                props.DataType === "string"
                  ? "bg-[#D9D9D975]"
                  : "bg-transparent"
              }`}
            >
              {props.Title[0]}
            </div>
            <div
              onClick={(e) => {
                changeBgColorButton(e);
                checkErrorIII();
              }}
              // onMouseLeave={() => fetchError()}
              id="number"
              className={`cursor-pointer hover:scale-110 duration-500 w-[50px] h-[50px] rounded-full flex justify-center items-center border-[#D9D9D9DD] border-2 border-dashed ${
                props.DataType === "number"
                  ? "bg-[#D9D9D975]"
                  : "bg-transparent"
              }`}
            >
              {props.Title[1]}
            </div>
            <div
              onClick={(e) => {
                changeBgColorButton(e);
                checkErrorIII();
              }}
              // onMouseLeave={() => fetchError()}
              id="boolean"
              className={`cursor-pointer hover:scale-110 duration-500 w-[50px] h-[50px] rounded-full flex justify-center items-center border-[#D9D9D9DD] border-2 border-dashed ${
                props.DataType === "boolean"
                  ? "bg-[#D9D9D975]"
                  : "bg-transparent"
              }`}
            >
              {props.Title[2]}
            </div>
          </div>
        </div>
        {/* <div className="flex text-[14px] items-center">
          Trait type :&ensp;{" "}
          <input
            type="text"
            value={isSuggest}
            onChange={(e) => {
              handleChange(e, "display_option.opensea.trait_type");
              setIsSuggest(e.target.value);
              SavecheckErrorII();
            }}
            // onBlur={fetchError}
            className="bg-transparent text-[14px] border-[1px] border-[#D9D9D9DD] placeholder-gray-300 border-dashed p-1 focus:outline-none focus:scale-105 duration-1000 w-[140px]"
            placeholder="Add trait type here"
          />
        </div> */}
        <div>
          <div
            className="flex text-[14px] items-center h-8"
            {...getRootProps()}
          >
            <Label {...getInputLabelProps()}>Trait type : </Label>
            <Input
              style={{ marginLeft: "8px" }}
              {...getInputProps()}
              onInput={(e: React.ChangeEvent<HTMLInputElement>) =>
                handdleNameII(e.target.value)
              }
            />
          </div>
          {groupedOptions.length > 0 && isShowValue ? (
            <Listbox {...getListboxProps()}>
              {(groupedOptions as typeof optionsArray).map((option, index) => (
                <li {...getOptionProps({ option, index })}>{option}</li>
              ))}
            </Listbox>
          ) : null}
        </div>

        <div className="flex text-[14px] items-center h-8">
          Value :&ensp;{" "}
          {props.text[props.index]["default_mint_value"][
            "string_attribute_value"
          ] && (
            <input
              type="text"
              value={
                props.text[props.index]["default_mint_value"][
                  "string_attribute_value"
                ]?.value
              }
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                handleChangValue(e);
              }}
              className="bg-transparent text-[14px] border-[1px] border-[#D9D9D9DD] placeholder-gray-300 border-dashed p-1 focus:outline-none focus:scale-105 duration-1000 w-[140px]"
              placeholder="Add value here"
            />
          )}
          {props.text[props.index]["default_mint_value"][
            "number_attribute_value"
          ] && (
            <input
              type="number"
              value={
                props.text[props.index]["default_mint_value"][
                  "number_attribute_value"
                ]?.value
              }
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                handleChangValue(e);
                SavecheckErrorII();
              }}
              className="bg-transparent text-[14px] border-[1px] border-[#D9D9D9DD] placeholder-gray-300 border-dashed p-1 focus:outline-none focus:scale-105 duration-1000 w-[140px]"
              placeholder="Add trait type here"
            />
          )}
          {props.text[props.index]["default_mint_value"][
            "boolean_attribute_value"
          ] && (
            <div className="flex w-[160px]  space-evenly">
              <div
                onClick={(e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
                  changeBgColorButtonValue(e);
                  checkErrorIII();
                }}
                id="Icon4"
                className={`cursor-pointer hover:scale-110 duration-500 w-16 h-8  flex justify-center items-center border-[#D9D9D9DD] border-2 border-dashed ${
                  selectedItemValue === "Icon4"
                    ? "bg-[#D9D9D975]"
                    : "bg-transparent"
                }`}
              >
                Yes
              </div>
              <div
                onClick={(e) => {
                  changeBgColorButtonValue(e);
                  checkErrorIII();
                }}
                id="Icon5"
                className={`cursor-pointer hover:scale-110 duration-500 w-16 h-8  flex justify-center items-center border-[#D9D9D9DD] border-2 border-dashed ${
                  selectedItemValue === "Icon5"
                    ? "bg-[#D9D9D975]"
                    : "bg-transparent"
                }`}
              >
                No
              </div>
            </div>
          )}
        </div>
      </div>
      {iser && (
        <RedAleart
          Height={20}
          Width={260}
          Rotate={0}
          ML={-10}
          MT={22}
          detailsText={errorMessage}
        />
      )}
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
