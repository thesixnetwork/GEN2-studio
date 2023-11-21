import { useState } from "react";
import { Tooltip } from "@mui/material";


import Conectwalet from "../component/Connectwallet";
import Stepper2 from "../component/Stepper2";
import Darkbg from "../component/Alert/Darkbg";
import EastIcon from "@mui/icons-material/East";
import { useNavigate } from "react-router-dom";
import NormalButton from "../component/NormalButton";
import { getAccessTokenFromLocalStorage, getActionName, getSCHEMA_CODE } from "../helpers/AuthService";
import axios from "axios";



const NewIntregationThenTransformStatic = () => {
  const [isShow, setIsShow] = useState(false);
  const [imgSource, setImgSource] = useState("");
  const navigate = useNavigate();

  const onChange = (e: any) => {
    setImgSource(e.target.value);
  };



  const convertMetaData = (imagePath: string) => {
    return `meta.SetImage('${imagePath}')`;
  }
  
  const saveAction = async () => {
    const apiUrl = `${
      import.meta.env.VITE_APP_API_ENDPOINT_SCHEMA_INFO
    }schema/set_actions`;
    const requestData = {
      "payload": {
        "schema_code": getSCHEMA_CODE(),
        "update_then": true,
        "name": getActionName(),
        "then": [convertMetaData(imgSource)],
      }
    };

    await axios.post(apiUrl, requestData, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${getAccessTokenFromLocalStorage()}`,  // Set the content type to JSON
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
            <div className="w-full  flex items-center justify-center min-h-[89.1%]">
              <div className="h-[600px] border-2 border-white rounded-lg p-14">
                <h2>Enter static image path</h2>
                <div>
                  <EastIcon></EastIcon>
                  <input
                    id="1"
                    type="text"
                    autoFocus
                    className="ml-2 my-2 bg-transparent text-[14px] border-[1px] border-transparent focus:border-[#D9D9D9DD] placeholder-gray-300 border-dashed p-1 focus:outline-none focus:scale-105 duration-1000 w-[350px] h-[20px]"
                    placeholder={""}
                    onChange={async (e) => {
                      onChange(e);
                    }}
                  />
                </div>
                <div className="flex flex-col justify-center items-center">
                  <div
                    className="bg-[#A2A3AA] border-2 border-white py-1 px-2"
                  >
                    Preview
                  </div>
                  <div className="my-4 h-60">
                    {imgSource !== "" && (
                      <img
                        src={imgSource}
                        alt="preview-image"
                        className="w-full h-full"
                      />
                    )}
                  </div>
                  <div className="flex justify-center" onClick={async () => { await saveAction() ; navigate("/newintregation/beginer") }}>
                    <NormalButton BorderRadius={0} FontSize={32} TextTitle={"SAVE"}></NormalButton>
                  </div>
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

export default NewIntregationThenTransformStatic;
