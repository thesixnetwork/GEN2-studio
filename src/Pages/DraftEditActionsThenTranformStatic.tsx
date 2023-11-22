import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import DraftActionTransformPreview from "../component/DraftActionTransformPreview";
import { getAccessTokenFromLocalStorage } from "../helpers/AuthService";
import axios from "axios";
import TransformStaticForm from "../component/TransformStaticForm";

const DraftEditActionsThenTranformStatic = () => {
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
        const actions =
          response.data.data.schema_info.schema_info.onchain_data.actions.filter(
            (action) => action.name === param.action_name
          );
        setActions(actions);
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
          <div className="w-full h-full px-[20px]">
            <div className="w-full h-full flex flex-col items-center justify-between py-12">
              <DraftActionTransformPreview actions={actions} />
              <TransformStaticForm
                isDraft={true}
                metaFunction={param.meta_function}
                schemaRevision={param.schema_revision}
                actionName={param.action_name}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DraftEditActionsThenTranformStatic;
