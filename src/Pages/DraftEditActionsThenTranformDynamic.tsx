import { useEffect, useState } from "react";
import EastIcon from "@mui/icons-material/East";
import { useNavigate } from "react-router-dom";
import NormalButton from "../component/NormalButton";
import {
  getAccessTokenFromLocalStorage,
  getActionName,
  getSCHEMA_CODE,
} from "../helpers/AuthService";
import axios from "axios";
import { useParams } from "react-router-dom";
import { CircularProgress } from "@mui/material";

const DraftEditActionsThenTranformDynamic = () => {
  const [imgSource, setImgSource] = useState("");
  const [postfix, setPostfix] = useState("");
  const [isNext, setIsNext] = useState(false);
  const [imgFormat, setImgFormat] = useState("");
  const [tokenId, setTokenId] = useState("1");
  const [loading, setLoading] = useState(true);
  const param = useParams();
  const onChange = (e: any) => {
    setImgSource(e.target.value);
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
  };

  const convertMetaData = (imgFormat: string, postfix: string) => {
    return `meta.SetImage(meta.ReplaceAllString(meta.GetImage(),'${imgFormat}','${imgFormat}${postfix}'))`;
  };

  const saveAction = async () => {
    const apiUrl =
      `${import.meta.env.VITE_APP_API_ENDPOINT_SCHEMA_INFO}schema/set_actions`; 
    const requestData = {
      payload: {
        schema_code: param.schema_revision,
        update_then: false,
        name: param.action_name,
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
    const apiUrl = `${import.meta.env.VITE_APP_API_ENDPOINT_SCHEMA_INFO}schema/set_image_url`; // Replace with your API endpoint
    const requestData = {
        "schema_code": param.schema_revision,
        "path" :  imgSource,
        "postfix": postfix,
        "format" : imgFormat.replace('.', '', 1),
        "dynamic": true, 
    };
    await axios.post(apiUrl, requestData, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization':`Bearer ${getAccessTokenFromLocalStorage()}`,  // Set the content type to JSON
        // Add any other headers your API requires
      },
    })
      .then(response => {
        console.log('API Response saveImageUrl :', response.data);
        console.log("Request :", requestData)
        // You can handle the API response here
      })
      .catch(error => {
        console.error('API Error:', error);
        // Handle errors here
    });
  }


  const findSchemaCode = async () => {
    const apiUrl = `${import.meta.env.VITE_APP_API_ENDPOINT_SCHEMA_INFO}schema/get_image_url/${param.schema_revision}`;
    const params = {};
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getAccessTokenFromLocalStorage()}`,
    };
    await axios
      .get(apiUrl, {
        params: params,
        headers: headers,
      })
      .then((response) => {
        console.log("Response:", response.data.data.image_url);
        setImgSource(response.data.data.image_url.path);
        setImgFormat("." + response.data.data.image_url.format);
        if (response.data.data.image_url.postfix !== null) {
          setPostfix(response.data.data.image_url.postfix);
        }
        setIsNext(true);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);

        console.error("Error:", error);
      });
  };

  useEffect(() => {
    findSchemaCode();
  }, []);

  const navigate = useNavigate();

  return (
    <div className="w-full flex justify-center ">
      <div className="w-full h-full fixed  flex justify-center items-center bg-gradient-24  from-white to-[#7A8ED7]">
        <div className="w-[1280px] h-[832px] bg-gradient-24 to-gray-700 from-gray-300 rounded-2xl flex justify-between p-4 shadow-lg shadow-black/20 dark:shadow-black/40">
          <div className="w-full h-full px-[20px]">
            {loading ? (
              <div className="w-full h-full flex justify-center items-center">
                <CircularProgress
                  className=" text-white"
                  sx={{
                    width: 300,
                    color: "white",
                  }}
                ></CircularProgress>
              </div>
            ) : (
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
                        value={imgSource}
                      />
                    </div>
                    <div className="mb-4">
                      <h2>Enter origin image format</h2>
                      <EastIcon></EastIcon>
                      <select
                        onChange={(e) => {
                          setImgFormat(e.target.value);
                        }}
                        value={imgFormat}
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
                        value={postfix}
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
                    <div
                      className={`flex justify-center ${
                        isNext ? "hidden" : "block"
                      }`}
                    >
                      <div onClick={handleNext}>
                        <NormalButton
                          BorderRadius={0}
                          FontSize={32}
                          TextTitle={"NEXT"}
                        ></NormalButton>
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
                      <div
                        className="flex justify-center"
                        onClick={async () => {
                          await saveAction();
                          await saveImageUrl()
                          navigate(`/draft/actions/${param.schema_revision}`);
                        }}
                      >
                        <NormalButton
                          BorderRadius={0}
                          FontSize={32}
                          TextTitle={"SAVE"}
                        ></NormalButton>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DraftEditActionsThenTranformDynamic;
