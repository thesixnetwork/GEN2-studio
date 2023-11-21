import { useEffect, useState } from "react";
import EastIcon from "@mui/icons-material/East";
import { useNavigate, useParams } from "react-router-dom";
import NormalButton from "../component/NormalButton";
import DraftActionTransformPreview from "../component/DraftActionTransformPreview";
import { getAccessTokenFromLocalStorage } from "../helpers/AuthService";
import axios from "axios";

interface TransformStaticFormProps {
  metaFunction: string;
  actionName: string;
  schemaRevision: string;
  isDraft: boolean;
}

const TransformStaticForm = (props: TransformStaticFormProps) => {
  const navigate = useNavigate();
  const [imgSource, setImgSource] = useState("");
  const param = useParams();
  const [metaFunction, setMetaFunction] = useState("");
  const [valueInput, setValueInput] = useState("");
  const [actionData, setActionData] = useState();
  const [actionThenArr, setActionThenArr] = useState([]);
  const [actionThenIndex, setActionThenIndex] = useState(null);
  const [isCreateNewAction, setIsCreateNewAction] = useState(false);
  const [actions, setActions] = useState([]);

  const convertFromBase64 = (str) => {
    console.log("str: ", str);
    return atob(str);
  };

  const findSchemaCode = async () => {
    const apiUrl = `${
      import.meta.env.VITE_APP_API_ENDPOINT_SCHEMA_INFO
    }schema/get_schema_info/${props.schemaRevision}`;
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
        console.log(
          "Response:",
          response.data.data.schema_info.schema_info.onchain_data.actions
        );
        setActionData(
          response.data.data.schema_info.schema_info.onchain_data.actions
        );
        const actions =
          response.data.data.schema_info.schema_info.onchain_data.actions.filter(
            (action) => action.name === props.actionName
          );
        setActions(actions);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const onChange = (e: any) => {
    setImgSource(e.target.value);
    setValueInput(e.target.value);
  };

  const getImgFromParam = (string) => {
    console.log("input: ", string);
    const firstQuoteIndex = string.indexOf("'");
    if (firstQuoteIndex === -1) {
      return null;
    }

    const secondQuoteIndex = string.indexOf("'", firstQuoteIndex + 1);
    if (secondQuoteIndex === -1) {
      return null;
    }

    const url = string.slice(firstQuoteIndex + 1, secondQuoteIndex);
    return url;
  };

  const isBase64 = (str) => {
    try {
      return btoa(atob(str)) === str;
    } catch (error) {
      return false;
    }
  };

  useEffect(() => {
    findSchemaCode();
  }, []);

  useEffect(() => {
    if (isBase64(props.metaFunction)) {
      setMetaFunction(convertFromBase64(props.metaFunction));
      console.log("imgSource", metaFunction);
      if (
        getImgFromParam(metaFunction) !== ".png" &&
        getImgFromParam(metaFunction) !== ".jpg" &&
        getImgFromParam(metaFunction) !== ".jpeg" &&
        getImgFromParam(metaFunction) !== ".gif"
      ) {
        setValueInput(getImgFromParam(metaFunction));
        setImgSource(getImgFromParam(metaFunction));
      }
    } else {
      setMetaFunction(props.metaFunction);
    }

    if (props.metaFunction === "create-new-action") {
      setIsCreateNewAction(true);
    }
  }, [props.metaFunction, metaFunction]);

  useEffect(() => {
    if (actionData !== undefined) {
      const getDataByName = (data, name) => {
        return data.find((item) => item.name === name);
      };
      const result = getDataByName(actionData, props.actionName);
      setActionThenArr(result.then);
    }

    const index = actionThenArr.indexOf(metaFunction);
    setActionThenIndex(index);
    console.log("actionThenArr: ", actionThenArr);
  }, [actionData]);

  const convertMetaData = (imagePath: string) => {
    return `meta.SetImage('${imagePath}')`;
  };

  const saveAction = async () => {
    actionThenArr[actionThenIndex] = convertMetaData(imgSource);
    console.log(actionThenArr);
    const apiUrl = `${
      import.meta.env.VITE_APP_API_ENDPOINT_SCHEMA_INFO
    }schema/set_actions`;
    let requestData;
    if (isCreateNewAction) {
      requestData = {
        payload: {
          schema_code: props.schemaRevision,
          update_then: false,
          name: props.actionName,

          then: [...actionThenArr, convertMetaData(imgSource)],
        },
      };
    } else {
      requestData = {
        payload: {
          schema_code: props.schemaRevision,
          update_then: false,
          name: props.actionName,
          then: actionThenArr,
        },
      };
    }

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
  return (
    <div className="h-[600px] border-2 border-white rounded-lg p-14">
      <h2>Enter static image path</h2>
      <div>
        <EastIcon></EastIcon>
        <input
          id="1"
          type="text"
          autoFocus
          className="ml-2 my-2 bg-transparent text-[14px] border-[1px] border-transparent focus:border-[#D9D9D9DD] placeholder-gray-300 border-dashed p-1 focus:outline-none focus:scale-105 duration-1000 w-[350px] h-[20px]"
          placeholder={"Input your image url"}
          value={valueInput}
          onChange={async (e) => {
            onChange(e);
          }}
        />
      </div>
      <div className="flex flex-col justify-center items-center">
        <div className="bg-[#A2A3AA] border-2 border-white py-1 px-2">
          Preview
        </div>
        <div className="my-4 h-60">
          {imgSource !== "" && imgSource !== null && (
            <img
              src={imgSource}
              alt="preview-image"
              className="w-full h-full"
            />
          )}
        </div>
        <div
          className="flex justify-center"
          onClick={async () => {
            await saveAction();
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
  );
};

export default TransformStaticForm;
