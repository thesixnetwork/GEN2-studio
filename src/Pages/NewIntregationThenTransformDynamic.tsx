import { useState } from "react";
import { Tooltip } from "@mui/material";

import Conectwalet from "../component/Connectwallet";
import Stepper2 from "../component/Stepper2";
import Darkbg from "../component/Alert/Darkbg";
import EastIcon from "@mui/icons-material/East";
import { useNavigate } from "react-router-dom";
import NormalButton from "../component/NormalButton";
import {
  getAccessTokenFromLocalStorage,
  getActionName,
  getSCHEMA_CODE,
} from "../helpers/AuthService";
import axios from "axios";

import TransformDynamicForm from "../component/TransformDynamicForm";

const NewIntregationThenTransformDynamic = () => {
  const [isShow, setIsShow] = useState(false);
  // const [showImg, setShowImg] = useState(false);
  const [imgSource, setImgSource] = useState("");
  const [postfix, setPostfix] = useState("");
  const [isNext, setIsNext] = useState(false);
  const [imgFormat, setImgFormat] = useState("");
  const [tokenId, setTokenId] = useState("1");

  const onChange = (e: any) => {
    setImgSource(e.target.value);
    // setShowImg(false);
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
    return `meta.SetImage(meta.ReplaceAllString(meta.GetImage(),'${imgFormat}','${postfix}${imgFormat}'))`;
  };

  const saveAction = async () => {
    const apiUrl = `${
      import.meta.env.VITE_APP_API_ENDPOINT_SCHEMA_INFO
    }schema/set_actions`; // Replace with your API endpoint
    const requestData = {
      payload: {
        schema_code: getSCHEMA_CODE(),
        update_then: true,
        name: getActionName(),
        then: [convertMetaData(imgFormat, postfix)],
      },
    };
    await axios
      .post(apiUrl, requestData, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getAccessTokenFromLocalStorage()}`, // Set the content type to JSON
          // Add any other headers your API requires
        },
      })
      .then((response) => {
        console.log(
          "API Response saveOnchainCollectionAttributes :",
          response.data
        );
        console.log("Request :", requestData);
        // You can handle the API response here
      })
      .catch((error) => {
        console.error("API Error:", error);
        // Handle errors here
      });
  };

  const saveImageUrl = async () => {
    const apiUrl = `${
      import.meta.env.VITE_APP_API_ENDPOINT_SCHEMA_INFO
    }schema/set_image_url`; // Replace with your API endpoint
    const requestData = {
      schema_code: getSCHEMA_CODE(),
      path: imgSource,
      postfix: postfix,
      format: imgFormat.replace(".", "", 1),
      dynamic: true,
    };
    await axios
      .post(apiUrl, requestData, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getAccessTokenFromLocalStorage()}`, // Set the content type to JSON
          // Add any other headers your API requires
        },
      })
      .then((response) => {
        console.log("API Response saveImageUrl :", response.data);
        console.log("Request :", requestData);
        // You can handle the API response here
      })
      .catch((error) => {
        console.error("API Error:", error);
        // Handle errors here
      });
  };

  const navigate = useNavigate();
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
            <TransformDynamicForm
              isDraft={false}
              actionName={getActionName()}
              schemaRevision={getSCHEMA_CODE()}
            />
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
