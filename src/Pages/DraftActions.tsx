import  { useEffect, useState } from "react";


import DraftMenu from "../component/DraftMenu";
import axios from "axios";
import { getAccessTokenFromLocalStorage } from "../helpers/AuthService";
import { saveSCHEMA_CODE } from "../helpers/AuthService";
import DraftActionPreviewCard from "../component/DraftActionPreviewCard";
import { CircularProgress } from "@mui/material";
import { useParams } from "react-router-dom";
import DraftCreateNewAction from "../component/DraftCreateNewAction";
import DraftActionCard from "../component/DraftActionCard";

const DraftActions = () => {
  const [actions, setActions] = useState([]);
  console.log("==>",actions)
  const [selectedAction, setSelectedAction] = useState(null);
  const [loading, setLoading] = useState(true);
  const { schema_revision } = useParams();
  const [isCreateNewAction, setIsCreacteNewAction] = useState(false);

  const handleActionClick = (data) => {
    setIsCreacteNewAction(false);
    setSelectedAction(data);
    console.log(data);
  };

  const FindSchemaCode = async () => {
    const apiUrl = `https://six-gen2-studio-nest-backend-api-traffic-gateway-1w6bfx2j.ts.gateway.dev/schema/get_schema_info/${schema_revision}`;
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
        setActions(
          response.data.data.schema_info.schema_info.onchain_data.actions
        );
        setLoading(false);
      })
      .catch((error) => {
        // Handle errors here
        console.error("Error:", error);
        setLoading(false);
      });
  };

  const createNewAction = () => {
    setIsCreacteNewAction(true);
    FindSchemaCode();
  };

  useEffect(() => {
    FindSchemaCode();
    saveSCHEMA_CODE(schema_revision);
  }, []);

  useEffect(() => {

  },[actions])

  return (
    <div className="w-full flex justify-center ">
      <div className="w-full h-full fixed  flex justify-center items-center bg-gradient-24  from-white to-[#7A8ED7]">
        <div className="w-[1280px] h-[832px] bg-gradient-24 to-gray-700 from-gray-300 rounded-2xl flex justify-between p-4 shadow-lg shadow-black/20 dark:shadow-black/40">
          <div className="w-full h-full">
            <div className="flex justify-between">
              <DraftMenu
                menu="actions"
                schemaCode={schema_revision}
              ></DraftMenu>
            </div>
            <div className="h-[83%] flex items-center justify-center">
              <div className="w-[45%] h-[80%] border-2 border-r rounded-l-xl border-white overflow-scroll">
                <h1 className="text-2xl p-4">Actions</h1>
                {loading === true ? (
                  <div className="flex justify-center items-center">
                    <CircularProgress
                      className=" text-white"
                      sx={{
                        width: 300,
                        color: "white",
                      }}
                    ></CircularProgress>
                  </div>
                ) : (
                  <div className="grid grid-cols-2 gap-4 px-4 pb-6">
                    <div
                      className="border border-white max-w-64 h-24 flex justify-center items-center text-3xl hover:bg-opacity-20 hover:bg-white cursor-pointer"
                      onClick={createNewAction}
                    >
                      +
                    </div>
                    {actions !== undefined &&
                      actions.map((data, index) => (
                        <div
                          onClick={() => {
                            handleActionClick(data);
                          }}
                        >
                          <DraftActionCard
                            key={index}
                            index={index}
                            data={data}
                            allAction={actions}
                          />
                        </div>
                      ))}
                  </div>
                )}
              </div>
              <div className="w-[45%] h-[80%] border-2 border-l rounded-r-xl border-white overflow-scroll pb-6">
                <h1 className="text-2xl p-4">Code Preview</h1>
                <div className="flex justify-center mx-6 ">
                  {isCreateNewAction && (
                    <DraftCreateNewAction actions={actions} setActions={setActions}/>
                  )}
                  {selectedAction !== null && !isCreateNewAction && (
                    <DraftActionPreviewCard
                      data={selectedAction}
                      param={schema_revision}
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DraftActions;
