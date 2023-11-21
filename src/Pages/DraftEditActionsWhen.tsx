import { ReactFlowProvider } from "reactflow";
import "reactflow/dist/base.css";
import WhenFlow from "../component/ReactFlow/When/WhenFlow";
import { useParams } from "react-router-dom";

const DraftEditActionsWhen = () => {
  const param = useParams();

  console.log("param", param)
  return (
    <div className="w-full flex justify-center ">
      <div className="w-full h-full fixed  flex justify-center items-center bg-gradient-24  from-white to-[#7A8ED7]">
        <div className="w-[1280px] h-[832px] bg-gradient-24 to-gray-700 from-gray-300 rounded-2xl flex justify-between p-4 shadow-lg shadow-black/20 dark:shadow-black/40">
          <div className="w-full h-full px-[20px]">
            <div className="mt-[20px] flex flex-col items-center justify-center">
              <ReactFlowProvider>
                <WhenFlow isDraft={true} metaFunction={param.meta_function} schemaRevision={param.schema_revision} actionName={param.action_name}/>
              </ReactFlowProvider>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DraftEditActionsWhen;
