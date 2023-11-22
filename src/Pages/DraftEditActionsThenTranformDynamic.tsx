import { useEffect, useState } from "react";
import EastIcon from "@mui/icons-material/East";
import { useNavigate } from "react-router-dom";
import NormalButton from "../component/NormalButton";
import DraftActionTransformPreview from "../component/DraftActionTransformPreview";
import {
  getAccessTokenFromLocalStorage,
  getActionName,
  getSCHEMA_CODE,
} from "../helpers/AuthService";
import axios from "axios";
import { useParams } from "react-router-dom";
import { CircularProgress } from "@mui/material";
import TransformDynamicForm from "../component/TransformDynamicForm";

const DraftEditActionsThenTranformDynamic = () => {
  const [loading, setLoading] = useState(false);
  const [actions, setActions] = useState([]);
  const param = useParams();

  const findSchemaCode = async () => {
    setLoading(true)
    const apiUrl = `${
      import.meta.env.VITE_APP_API_ENDPOINT_SCHEMA_INFO
    }schema/get_schema_info/${param.schema_revision}`;
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
        console.log("Response:", response);
        const actions =
          response.data.data.schema_info.schema_info.onchain_data.actions.filter(
            (action) => action.name === param.action_name
          );
        setActions(actions);
        console.log("->>>", actions);
        setLoading(false)
      })
      .catch((error) => {
        console.error("Error:", error);
        setLoading(false)
      });
  };

  useEffect(() => {
    findSchemaCode();
  }, []);

  return (
    <div className="w-full flex justify-center ">
      <div className="w-full h-full fixed  flex justify-center items-center bg-gradient-24  from-white to-[#7A8ED7]">
        <div className="w-[1280px] h-[832px] bg-gradient-24 to-gray-700 from-gray-300 rounded-2xl flex justify-between p-4 shadow-lg shadow-black/20 dark:shadow-black/40">
          <div className="w-full h-full flex flex-col items-center justify-center my-4 py-12">
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
              <>
                <DraftActionTransformPreview actions={actions} />
                <TransformDynamicForm
                  isDraft={true}
                  actionName={param.action_name}
                  schemaRevision={param.schema_revision}
                />
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DraftEditActionsThenTranformDynamic;
