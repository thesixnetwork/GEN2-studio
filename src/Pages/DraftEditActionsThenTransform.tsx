import { useState, useEffect } from "react";
import ActionTransformCard from "../component/ActionTransformCard";
import DraftActionTransformPreview from "../component/DraftActionTransformPreview";
import DraftMenu from "../component/DraftMenu";
import { useParams } from "react-router-dom";
import { getAccessTokenFromLocalStorage } from "../helpers/AuthService";
import axios from "axios";

const DraftEditActionsThenTransform = () => {
  const param = useParams();
  const [actions, setActions] = useState([]);

  const findSchemaCode = async () => {
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
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  useEffect(() => {
    findSchemaCode();
  }, []);


  return (
    <div className="w-full flex justify-center ">
      <div className="w-full h-full fixed  flex justify-center items-center bg-gradient-24  from-white to-[#7A8ED7]">
        <div className="w-[1280px] h-[832px] bg-gradient-24 to-gray-700 from-gray-300 rounded-2xl flex justify-between p-4 shadow-lg shadow-black/20 dark:shadow-black/40">
          <div className="w-full h-full">
            <div className="flex justify-between">
              <DraftMenu
                menu="actions"
                schemaCode={param.schema_revision}
                next="then"
              ></DraftMenu>
            </div>
            <div className="w-full flex flex-col gap-y-10 items-center justify-center min-h-[89.8%]">
              <DraftActionTransformPreview actions={actions} />
              <div className="w-full flex items-center justify-center gap-x-20">
                <ActionTransformCard
                  type="static"
                  draft={true}
                ></ActionTransformCard>
                <ActionTransformCard
                  type="dynamic"
                  draft={true}
                ></ActionTransformCard>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DraftEditActionsThenTransform;
