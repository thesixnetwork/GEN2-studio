import React, { useEffect } from "react";
import { Button } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import ClearIcon from "@mui/icons-material/Clear";
import logo1 from "../pic/trash-bin_5028066 1.png";
import logo2 from "../pic/Vector 4.png";
import logo3 from "../pic/Vector 7.png";
import Delete from "../pic/Group 27.png";
import Add from "../pic/Group 40.png";

import Conectwalet from "../component/Connectwallet";
import Stepper2 from "../component/Stepper2";
import Darkbg from "../component/Alert/Darkbg";
import AlertCard from "./Alert/AlertCard";
import NextPageButton from "../component/NextPageButton";
import Swal from "sweetalert2";
import RedAleart from "../component/Alert/RedAleart";

import { useState } from "react";

import {
  Select,
  styled,
  InputBase,
  MenuItem,
  NativeSelect,
  InputLabel,
  FormControl,
} from "@mui/material";

const NewIntregation7 = () => {
  const [isShow, setIsShow] = useState(false);

  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("Not Availible");

  const [text, setText] = useState([
    {
      name: "",
      dataType: "",
      traitType: "",
    },
    {
      name: "",
      dataType: "",
      traitType: "",
    },
    {
      name: "",
      dataType: "",
      traitType: "",
    },
  ]);

  const checkError = (text) => {
    const nameSet = new Set();

    for (const item of text) {
      if (nameSet.has(item.name)) {
        setError(true);
        setErrorMessage("Name Duplicate");
      }
      if (item.name.includes(" ")) {
        setError(true);
        setErrorMessage("Have Space");
      }
      if (
        item.name.includes(null) ||
        item.dataType.includes(null) ||
        item.traitType.includes(null)
      ) {
        setError(true);
        setErrorMessage("Can't be empty");
      }
      nameSet.add(item.name);
    }
  };

  // useEffect(() => {
  //   checkError(text);
  // }, [text]);

  const WhiteNativeSelect = styled(InputBase)(({ theme }) => ({
    color: "white",
    textDecoration: "underline",
    fontSize: 14,
    "& svg": {
      fill: "white",
    },
  }));

  const Delete = styled(ClearIcon)({
    borderRadius: "16px",
    transition: "color 0.3s, border 0.3s",
    border: "2px solid white",
    cursor: "pointer",

  });

  const handleChange = (e, field, index) => {
    const updatedText = [...text];
    updatedText[index][field] = e.target.value;
    setText(updatedText);
  };

  const handleCreateAttribute = () => {
    const newAttribute = {
      name: "",
      dataType: "",
      traitType: "",
    };

    setText([...text, newAttribute]);
    console.log(text);
  };

  const handleDeleteAttribute = (index) => {
    const updatedText = [...text.slice(0, index), ...text.slice(index + 1)];
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          icon: "success",
          title: "Your token attribute has been deleted.",
          showConfirmButton: false,
          timer: 1500,
        }).then(() => {
          setText(updatedText);
        });
      }
    });
  };

  const handleHelp = () => {
    document.getElementById("0").style.zIndex = "50";
    document.getElementById("delete2").style.zIndex = "50";
    document.getElementById("plus").style.zIndex = "50";
  }

  return (
    <div className="w-full flex justify-center ">
      <div className="w-full h-full fixed  flex justify-center items-center bg-gradient-24  from-white to-[#7A8ED7]">
        <div className="w-[1280px] h-[832px] bg-gradient-24 to-gray-700 from-gray-300 rounded-2xl flex justify-between p-4 shadow-lg shadow-black/20 dark:shadow-black/40">
          <div className="w-full h-full px-[20px]">
            <div>
              <Stepper2 ActiveStep={3}></Stepper2>
              <div className="w-[931px] h-[1px] bg-[#D9D9D9]"></div>
            </div>
            <div className="w-full h-[700px] overflow-scroll flex justify-center relative">
              <div className="grid-cols-3 grid gap-y-6 gap-x-6 py-5  absolute">
                {text.map((item, index) => (
                  <div
                    id={index}
                    key={index}
                    className="w-[267px] h-[187px] bg-transparent border-solid border  border-white-600 rounded-xl px-3 pt-5 pb-5 "
                  >
                    <div id={`delete${index}`} className="w-[0px] h-[0px] rounded-full ml-[226px] mt-[-18px] absolute hover:scale-105 duration-500 ">
                      <Delete className=" hover:border-red-600 hover:text-red-600" onClick={() => handleDeleteAttribute(index)} />
                    </div>
                    <div className="h-full flex flex-col  justify-between">
                      <div className="flex text-[14px] items-center">
                        Name :&ensp;{" "}
                        <input
                          type="text"
                          value={item.name}
                          onChange={(e) => handleChange(e, "name", index)}
                          className='bg-transparent text-[14px] border-[1px] border-[#D9D9D9DD] placeholder-gray-300 border-dashed p-1  focus:outline-none focus:scale-105 duration-1000 w-[160px]'
                          placeholder="Add attribute name"
                        />
                      </div>
                      <div className="flex text-[14px] items-center">
                        Data type :&ensp;{" "}
                        {/* <NativeSelect
                          defaultValue={30}
                          value={item.dataType}
                          onChange={(e) => handleChange(e, "dataType", index)}
                          input={<WhiteNativeSelect />}
                          id={item.name}
                        >
                          <option value={"boolean"}>Boolean</option>
                          <option value={"number"}>Number</option>
                          <option value={"string"}>String</option>
                        </NativeSelect> */}
                        <Select
                          sx={{ color: "rgb(209 213 219)" }}
                          className='bg-transparent text-[14px] border-[1px] border-[#D9D9D9DD] border-dashed p-1  focus:outline-none focus:scale-105 duration-1000 w-auto h-[40px] text-red-400'
                          displayEmpty
                          value={item.dataType}
                          onChange={(e) => handleChange(e, "dataType", index)}
                          input={<WhiteNativeSelect></WhiteNativeSelect>}
                          id={item.name}
                          renderValue={(selected) => {
                            if (
                              selected !== "boolean" &&
                              selected !== "number" &&
                              selected !== "string"
                            ) {
                              return "Select Type";
                            } else {
                              return selected;
                            }
                          }}
                        >
                          <MenuItem value={"boolean"}>boolean</MenuItem>
                          <MenuItem value={"number"}>number</MenuItem>
                          <MenuItem value={"string"}>string</MenuItem>
                        </Select>
                        {/* <Select
                          type="text"
                          value={item.dataType}
                          onChange={(e) => handleChange(e, "dataType", index)}
                          className="flex text-[14px] bg-transparent h-[21px] w-20 outline-none border-b border-transparent focus:border-sky-400 duration-300 underline focus:no-underline"
                          placeholder="add data type here"
                        /> */}
                      </div>
                      <div className="flex text-[14px] items-center">
                        Trait type :&ensp;{" "}
                        <input
                          type="text"
                          value={item.traitType}
                          onChange={(e) => handleChange(e, "traitType", index)}
                          className='bg-transparent text-[14px] border-[1px] border-[#D9D9D9DD] placeholder-gray-300 border-dashed p-1  focus:outline-none focus:scale-105 duration-1000 w-[140px]'
                          placeholder="Add trait type here"
                        />
                      </div>
                    </div>
                    {error ? (
                      <RedAleart
                        Height={20}
                        Width={150}
                        Rotate={90}
                        ML={151}
                        MT={-76}
                        detailsText={errorMessage}
                      />
                    ) : null}
                  </div>
                ))}
                <div
                  id="plus"
                  onClick={handleCreateAttribute}
                  className="w-[257px] h-[187px] flex justify-center items-center bg-transparent border border-white rounded-xl p-3 hover:scale-105 cursor-pointer duration-300 "
                >
                  <img src={Add}></img>
                </div>
              </div>
            </div>

          </div>
          <div className="w-2/6 h-5/6 flex flex-col items-end justify-between  ">
            <Conectwalet></Conectwalet>
            <div className="w-[266px] h-[414px] border-[1px] border-white rounded-xl mt-[30px] flex flex-col items-center py-[10px] z-10">
              <p className="text-[24px] w-[231px] font-bold text-white text-center">
                Origin Token Attributes
              </p>
              <p className="text-[16px] w-[216px]  text-white pt-[15px]">
                &emsp;Mostly NFT token will need attributes of it called
                metadata. Origin attributes is the static type of metadata. And
                it cannot be change ( but it can be override by token attributes
                we will discuss next step ).
              </p>
              <p className="text-[16px] w-[216px]  text-white pt-[15px]">
                &emsp; You can edit value of attributes by double click the
                value and change to your proper design.
              </p>
            </div>
            <div id="img1" className=" w-full mt-[80px] flex items-center	justify-center ">
              <NextPageButton
                TextTitle="Next"
                BorderRadius={0}
                NextPage="/newintregation/8"
                FontSize={40}
              ></NextPageButton>
            </div>
            <div
              onClick={() => {
                setIsShow(!isShow);
                handleHelp();
              }}
              className="absolute text-[50px] mt-[730px] mr-[20px] cursor-pointer hover:scale-150 hover:text-[#262f50] duration-500"
            >
              ?
            </div>
          </div>
        </div>
        {isShow && (
          <div
            className="absolute duration-500"
            onClick={() => {
              setIsShow(!isShow);
            }}
          >
            <Darkbg></Darkbg>
            <div className="absolute mt-[140px] ml-[-350px] z-20">
              <img
                src={logo3}
                className="mt-[80px] mr-[150px] rotate-[160deg] "
              ></img>
              <p className="ml-[300px] mt-[-60px] absolute w-full font-bold">
                Double Click to edit
              </p>
            </div>
            <div className="absolute mt-[0px] ml-[-430px] z-20">
              <img
                src={logo2}
                className="mt-[50px] mr-[200px] rotate-[160deg] "
              ></img>
              <p className="ml-[0px] mt-[0px] absolute w-full font-bold">
                Click to delete component
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default NewIntregation7;
