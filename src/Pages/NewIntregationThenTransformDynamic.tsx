import React, { useEffect, useState } from "react";
import { Tooltip } from "@mui/material";

import Add from "../pic/Group 40.png";

import Conectwalet from "../component/Connectwallet";
import Stepper2 from "../component/Stepper2";
import Darkbg from "../component/Alert/Darkbg";
import EastIcon from "@mui/icons-material/East";
import { Link } from "react-router-dom";

const NewIntregationThenTransformDynamic = () => {
  const [isShow, setIsShow] = useState(false);
  const [showImg, setShowImg] = useState(false);
  const [imgSource, setImgSource] = useState("");
  const [postfix, setPostfix] = useState("");

  const onChange = (e: any) => {
    setImgSource(e.target.value);
    setShowImg(false);
  };

  const handleShowImg = () => {
    setShowImg(true);
  };

  const checkBackslash = (str: string) => {
    if (str.endsWith("/")) {
      return str;
    } else {
      return str + "/";
    }
  }
  


  return (
    <div className="w-full flex justify-center ">
      <div className="w-full h-full fixed  flex justify-center items-center bg-gradient-24  from-white to-[#7A8ED7]">
        <div className="w-[1280px] h-[832px] bg-gradient-24 to-gray-700 from-gray-300 rounded-2xl flex justify-between p-4 shadow-lg shadow-black/20 dark:shadow-black/40">
          <div className="w-full h-full px-[20px]">
            <div className="flex justify-between">
              <div>
                <Stepper2 ActiveStep={6}></Stepper2>
                <div className="w-[931px] h-[1px] bg-[#D9D9D9]"></div>
              </div>
              <Conectwalet></Conectwalet>
            </div>
            <div className="w-full h-full flex justify-center gap-x-20	items-center">
              <div className="border-2 border-white rounded-lg h-[600px] w-[450px] flex  justify-center">
                <div>
                  <h2>Enter dynamic image path</h2>
                  <div>
                    <EastIcon></EastIcon>
                    <input
                      id=""
                      type="text"
                      autoFocus
                      className="ml-2 my-2 bg-transparent text-[14px] border-[1px] border-transparent focus:border-[#D9D9D9DD] placeholder-gray-300 border-dashed p-1 focus:outline-none focus:scale-105 duration-1000 w-[350px] h-[20px]"
                      placeholder={""}
                      onChange={ (e) => {
                        onChange(e);
                      }}
                    />
                  </div>
                  <h2>Enter origin image format</h2>
                  <div>
                    <EastIcon></EastIcon>
                    <select
                      name=""
                      id=""
                      className="bg-[#A2A3AA] border-2 border-white rounded-full  px-4 hover:bg-opacity-60"
                    >
                      <option value="jpeg">jpeg</option>
                      <option value="png">png</option>
                    </select>
                  </div>
                  <h2>Enter dynamic image postfix</h2>
                  <div>
                    <EastIcon></EastIcon>
                    <input
                      id=""
                      type="text"
                      autoFocus
                      className="ml-2 my-2 bg-transparent text-[14px] border-[1px] border-transparent focus:border-[#D9D9D9DD] placeholder-gray-300 border-dashed p-1 focus:outline-none focus:scale-105 duration-1000 w-[350px] h-[20px]"
                      placeholder={""}
                      onChange={(e) => setPostfix(e.target.value)}                    />
                  </div>
                  <div className="flex flex-col justify-center items-center">
                    <button
                      onClick={handleShowImg}
                      className="bg-[#A2A3AA] border-2 border-white rounded-lg py-1 px-2 hover:bg-opacity-60"
                    >
                      Preview
                    </button>
                    <div className="h-20 w-80 overflow-scroll">
                      <span>{checkBackslash(imgSource)}</span>
                      <span className="text-red-600">&#123;&#123;token_id&#125;&#125;</span>
                      <span>{postfix}</span>
                    </div>
                    <button className="bg-[#A2A3AA] border-2 border-white rounded-lg py-1 px-2 hover:bg-opacity-60 ">
                      Next
                    </button>
                  </div>
                </div>
              </div>

              <div className="border-2 border-white rounded-lg h-[600px] w-[450px] flex  justify-center">
                <div>
                  <h2>Preview transformed token</h2>
                  <p></p>
                  <div className=" w-60 object-contain my-8">
                    {showImg && (
                      <img
                        src={imgSource}
                        alt="preview-image"
                        className="w-full h-full"
                      />
                    )}
                  </div>
                  <Link to="/newintregation/beginer/3">
                    <button className="bg-[#A2A3AA] border-2 border-white rounded-lg py-1 px-2 hover:bg-opacity-60 ">
                      Next
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Tooltip title={"help"}>
          <div
            onClick={() => {
              setIsShow(true);
            }}
            className=" z-[51] w-[50px] h-[50px] rounded-full bg-transparent  hover:bg-slate-200 flex justify-center items-center absolute text-[50px] mt-[750px] ml-[1180px] cursor-pointer hover:scale-150 hover:text-[#262f50] duration-500"
          >
            ?
          </div>
        </Tooltip>
        {isShow && (
          <div
            className="absolute duration-500"
            onClick={() => {
              setIsShow(!isShow);
              //   sethelpStep(0)
            }}
          >
            <Darkbg></Darkbg>
          </div>
        )}
      </div>
    </div>
  );
};

export default NewIntregationThenTransformDynamic;
