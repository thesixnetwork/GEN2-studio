import React, { useEffect, useState } from "react";
import EastIcon from "@mui/icons-material/East";
import { Link, useNavigate } from "react-router-dom";
import NormalButton from "../component/NormalButton";
import { getAccessTokenFromLocalStorage, getActionName, getSCHEMA_CODE } from "../helpers/AuthService";
import axios from "axios";

const DraftEditActionsThenTranformDynamic = () => {
 
  const [showImg, setShowImg] = useState(false);
  const [imgSource, setImgSource] = useState("");
  const [postfix, setPostfix] = useState("");
  const [isNext, setIsNext] = useState(false);
  const [imgFormat, setImgFormat] = useState("");
  const [tokenId, setTokenId] = useState("1");
  const onChange = (e: any) => {
    setImgSource(e.target.value);
    setShowImg(false);
  };

  const handleTokenId = (tokenId: string) => {
    if (tokenId === "") {
      setTokenId("1");
    } else {
      setTokenId(tokenId);
    }
  };

  const checkBackslash = (str: string) => {
    if (str.endsWith("/")) {
      return str;
    } else {
      return str + "/";
    }
  };

  const handleNext = () => {
    setIsNext(true);
    setShowImg(true);
  };

  const convertMetaData = (imgFormat: string, postfix: string) => {
    return `meta.SetImage(meta.ReplaceAllString(meta.GetImage(),'${imgFormat}','${imgFormat}${postfix}'))`;
  };

  const saveAction = async () => {
    const apiUrl = `${
      import.meta.env.VITE_APP_API_ENDPOINT_SCHEMA_INFO
    }schema/set_actions`; 
    const requestData = {
      "payload": {
        "schema_code": getSCHEMA_CODE(),
        "update_then": true,
        "name": getActionName(),
        "then": [convertMetaData(imgFormat, postfix)],
      }
    };

    await axios.post(apiUrl, requestData, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${getAccessTokenFromLocalStorage()}`,  
      },
    })
      .then(response => {
        console.log('API Response saveOnchainCollectionAttributes :', response.data);
        console.log("Request :", requestData)
      })
      .catch(error => {
        console.error('API Error:', error);
      });

  }

  const saveimgSource = async () => {
    const apiUrl = `${
      import.meta.env.VITE_APP_API_ENDPOINT_SCHEMA_INFO
    }/schema/set_image_url`; 
    const requestData = {
      "payload": {
        "schema_code": getSCHEMA_CODE(),
        "update_then": true,
        "name": getActionName(),
        "then": [convertMetaData(imgFormat, postfix)],
      }
    };

    await axios.post(apiUrl, requestData, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${getAccessTokenFromLocalStorage()}`,  // Set the content type to JSON
        // Add any other headers your API requires
      },
    })
      .then(response => {
        console.log('API Response saveOnchainCollectionAttributes :', response.data);
        console.log("Request :", requestData)
        // You can handle the API response here
      })
      .catch(error => {
        console.error('API Error:', error);
        // Handle errors here
      });

  }

  const navigate = useNavigate();

  return (
    <div className="w-full flex justify-center ">
      <div className="w-full h-full fixed  flex justify-center items-center bg-gradient-24  from-white to-[#7A8ED7]">
        <div className="w-[1280px] h-[832px] bg-gradient-24 to-gray-700 from-gray-300 rounded-2xl flex justify-between p-4 shadow-lg shadow-black/20 dark:shadow-black/40">
          <div className="w-full h-full px-[20px]">
            <div className="w-full h-full flex justify-center gap-x-20	items-center ">
              <div className="border-2 border-white rounded-lg h-[600px] flex justify-center p-8">
                <div className="w-96 flex flex-col justify-between ">
                  <div className="mb-4">
                    <h2>Enter dynamic image path</h2>
                    <EastIcon></EastIcon>
                    <input
                      id=""
                      type="text"
                      autoFocus
                      className="ml-2 my-2 bg-transparent text-[14px] border-[1px] border-transparent focus:border-[#D9D9D9DD] placeholder-gray-300 border-dashed p-1 focus:outline-none focus:scale-105 duration-1000 w-[350px] h-[20px]"
                      placeholder="example: https://techsauce-nft.sixprotocol.com/techsauce/"
                      onChange={(e) => {
                        onChange(e);
                      }}
                    />
                  </div>
                  <div className="mb-4">
                    <h2>Enter origin image format</h2>
                    <EastIcon></EastIcon>
                    <select
                      onChange={(e) => {
                        setImgFormat(e.target.value);
                      }}
                      className="ml-2 my-2 bg-[#A2A3AA] border-2 border-white rounded-full  px-4 hover:bg-opacity-60 text-xs"
                    >
                      <option value="" disabled selected hidden>
                        -- select --
                      </option>
                      <option value=".jpeg">jpeg</option>
                      <option value=".jpg">jpg</option>
                      <option value=".png">png</option>
                      <option value=".gif">gif</option>
                    </select>
                  </div>
                  <div className="mb-4">
                    <h2>Enter dynamic image postfix</h2>
                    <EastIcon></EastIcon>
                    <input
                      id=""
                      type="text"
                      autoFocus
                      className="ml-2 my-2 bg-transparent text-[14px] border-[1px] border-transparent focus:border-[#D9D9D9DD] placeholder-gray-300 border-dashed p-1 focus:outline-none focus:scale-105 duration-1000 w-[350px] h-[20px]"
                      placeholder="example: -t"
                      onChange={(e) => setPostfix(e.target.value)}
                    />
                  </div>
                  <div className="flex flex-col justify-center items-center mb-4">
                    <div className="bg-[#A2A3AA] border-2 border-white py-1 px-2">
                      Preview
                    </div>
                    <div className="h-12 w-96 my-4 overflow-scroll">
                      {imgSource !== "" && (
                        <>
                          <span>{checkBackslash(imgSource)}</span>
                          <span className="text-red-600">
                            &#123;&#123;token_id&#125;&#125;
                          </span>
                          <span>
                            {postfix}
                            {imgFormat}
                          </span>
                        </>
                      )}
                    </div>
                  </div>
                  <div className={`flex justify-center ${isNext ? "hidden" : "block"}`}>
                    <div onClick={handleNext}>
                      <NormalButton BorderRadius={0} FontSize={32} TextTitle={"NEXT"}>
                      </NormalButton>
                    </div>
                  </div>
                </div>
              </div>
              {isNext && (
                <div className="border-2 border-white rounded-lg h-[600px] flex  justify-center p-12">
                  <div className="w-96 flex flex-col justify-between items-center">
                    <div className=" flex flex-col justify-center items-center">
                      <h2 className="w-96 px-4 py-2 bg-[#A2A3AA] border-2 border-white text-center ">
                        Preview transformed token
                      </h2>
                      <div className="my-4">
                        <h2>Token Id</h2>
                        <EastIcon></EastIcon>
                        <input
                          id=""
                          type="text"
                          autoFocus
                          className="ml-2 my-2 bg-transparent text-[14px] border-[1px] border-transparent focus:border-[#D9D9D9DD] placeholder-gray-300 border-dashed p-1 focus:outline-none focus:scale-105 duration-1000 w-[350px] h-[20px]"
                          placeholder="example: 1"
                          onChange={(e) => {
                            handleTokenId(e.target.value);
                          }}
                        />
                      </div>
                      <div className="h-12 w-96 overflow-scroll">
                        <p>
                          {imgSource !== "" &&
                            `${checkBackslash(
                              imgSource
                            )}${tokenId}${postfix}${imgFormat}`}
                        </p>
                      </div>
                      <div className=" h-60 object-contain my-8">
                        {imgSource !== "" && (
                          <img
                            src={`${checkBackslash(
                              imgSource
                            )}${tokenId}${postfix}${imgFormat}`}
                            alt="preview-image"
                            className="w-full h-full"
                          />
                        )}
                      </div>
                    </div>
                    <div className="flex justify-center" onClick={async () => { await saveAction(); navigate("/newintregation/beginer") }}>
                      <NormalButton BorderRadius={0} FontSize={32} TextTitle={"SAVE"}></NormalButton>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DraftEditActionsThenTranformDynamic;
