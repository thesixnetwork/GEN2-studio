import EastIcon from "@mui/icons-material/East";
import NormalButton from "../component/NormalButton";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getAccessTokenFromLocalStorage } from "../helpers/AuthService";
import { CircularProgress } from "@mui/material";
import axios from "axios";

interface TransformDynamicFormProps {
  actionName: string;
  schemaRevision: string;
  isDraft: boolean;
}

const TransformDynamicForm = (props: TransformDynamicFormProps) => {
  const [imgSource, setImgSource] = useState("");
  const [postfix, setPostfix] = useState("");
  const [isNext, setIsNext] = useState(false);
  const [imgFormat, setImgFormat] = useState("");
  const [tokenId, setTokenId] = useState("1");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

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

  const convertMetaFunction = (imgFormat: string, postfix: string) => {
    return `meta.SetImage(meta.ReplaceAllString(meta.GetImage(),'${imgFormat}','${imgFormat}${postfix}'))`;
  };

  const saveAction = async () => {
    setLoading(true);
    const apiUrl = `${
      import.meta.env.VITE_APP_API_ENDPOINT_SCHEMA_INFO
    }schema/set_actions`;
    const requestData = {
      payload: {
        schema_code: props.schemaRevision,
        update_then: false,
        name: props.actionName,
        then: [convertMetaFunction(imgFormat, postfix)],
      },
    };
    await axios
      .post(apiUrl, requestData, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getAccessTokenFromLocalStorage()}`,
        },
      })
      .then((response) => {
        console.log(
          "API Response saveOnchainCollectionAttributes :",
          response.data
        );
        console.log("Request :", requestData);
      })
      .catch((error) => {
        console.error("API Error:", error);
      });
  };

  const saveImageUrl = async () => {
    const apiUrl = `${
      import.meta.env.VITE_APP_API_ENDPOINT_SCHEMA_INFO
    }schema/set_image_url`;
    const requestData = {
      schema_code: props.schemaRevision,
      path: imgSource,
      postfix: postfix,
      format: imgFormat.replace(".", "", 1),
      dynamic: true,
    };
    await axios
      .post(apiUrl, requestData, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getAccessTokenFromLocalStorage()}`,
        },
      })
      .then((response) => {
        console.log("API Response saveImageUrl :", response.data);
        console.log("Request :", requestData);
      })
      .catch((error) => {
        console.error("API Error:", error);
      });
  };

  const findImageUrl = async () => {
    const apiUrl = `${
      import.meta.env.VITE_APP_API_ENDPOINT_SCHEMA_INFO
    }schema/get_image_url/${props.schemaRevision}`;
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
        setImgSource(response.data.data.image_url.path);
        setImgFormat("." + response.data.data.image_url.format);
        if (response.data.data.image_url.postfix !== null) {
          setPostfix(response.data.data.image_url.postfix);
        }
        setIsNext(true);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error:", error);
        setLoading(false);
      });
  };

  useEffect(() => {
    console.log("logger", props.schemaRevision)
    props.schemaRevision !== "create-new-action" && props.isDraft && findImageUrl() && setIsNext(true);
  }, []);

  return (
    <div className="w-full h-full flex justify-center gap-x-20	items-center">
      {loading ? (
        <CircularProgress
          className=" text-white"
          sx={{
            width: 300,
            color: "white",
          }}
        ></CircularProgress>
      ) : (
        <>
          <div className="border-2 border-white rounded-lg h-[560px] flex justify-center p-8">
            <div className="w-96 flex flex-col justify-between ">
              <div className="mb-2">
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
              <div className="mb-2">
                <h2>Enter origin image format</h2>
                <EastIcon></EastIcon>
                <select
                  onChange={(e) => {
                    setImgFormat(e.target.value);
                  }}
                  value={imgFormat}
                  defaultValue={imgFormat}
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
              <div className="mb-2">
                <h2>Enter dynamic image prefix</h2>
                <EastIcon></EastIcon>
                <input
                  id=""
                  type="text"
                  autoFocus
                  className="ml-2 my-2 bg-transparent text-[14px] border-[1px] border-transparent focus:border-[#D9D9D9DD] placeholder-gray-300 border-dashed p-1 focus:outline-none focus:scale-105 duration-1000 w-[350px] h-[20px]"
                  placeholder=""
                  onChange={(e) => setPostfix(e.target.value)}
                  value={postfix}
                />
              </div>
              <div className="mb-2">
                <h2>Enter dynamic image postfix</h2>
                <EastIcon></EastIcon>
                <input
                  id=""
                  type="text"
                  autoFocus
                  className="ml-2 my-2 bg-transparent text-[14px] border-[1px] border-transparent focus:border-[#D9D9D9DD] placeholder-gray-300 border-dashed p-1 focus:outline-none focus:scale-105 duration-1000 w-[350px] h-[20px]"
                  placeholder="example: -transformed"
                  onChange={(e) => setPostfix(e.target.value)}
                  value={postfix}
                />
              </div>
              <div className="flex flex-col justify-center items-center mb-2">
                <div className="bg-[#A2A3AA] border-2 border-white py-1 px-2">
                  Preview
                </div>
                <div>
                  <div className="h-12 w-96 my-4 overflow-scroll bg-white bg-opacity-20 border-2">
                    {imgSource !== "" && (
                      <>
                        <span>{checkBackslash(imgSource)}</span>
                        <span className="text-red-600">
                          &#123;&#123;token_id&#125;&#125;
                        </span>
                        <span>{imgFormat}</span>
                      </>
                    )}
                  </div>
                  <div className="h-12 w-96 my-4 overflow-scroll bg-white bg-opacity-20 border-2">
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
              </div>
              <div
                className={`flex justify-center ${isNext ? "hidden" : "block"}`}
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
            <div className="border-2 border-white rounded-lg h-[560px] flex  justify-center p-12">
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
                  <div className=" h-60 object-contain">
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
                    await saveImageUrl();
                    {
                      props.isDraft
                        ? navigate(`/draft/actions/${props.schemaRevision}`)
                        : navigate("/newintregation/beginer/");
                    }
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
        </>
      )}
    </div>
  );
};

export default TransformDynamicForm;
