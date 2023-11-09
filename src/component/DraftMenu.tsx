import Conectwalet from "./Connectwallet";
import NormalButton from "./NormalButton";
import { Link } from "react-router-dom";

const DraftMenu = ({ menu,schemaCode,next }) => {
  console.log(menu);
  console.log(schemaCode)

  return (
    <div className="w-[1280px]">
      <div className="flex justify-between">
        <div className="border-b border-white w-[960px] flex justify-between">
          <h1 className="text-5xl h-[95px] flex flex-col justify-center ">
            {menu === "attributes"
              ? "Draft: Attributes"
              : menu === "deployment"
              ? "Draft: Deplotment"
              : menu === "origin"
              ? "Draft: Origin Data"
              : "Draft: Actions"}
          </h1>
          <div className="h-full flex items-end pb-2">
            {menu === "deployment" || !next || next === "then" ? null : (
              <Link
                to={
                  menu === "attributes"
                    ? `/draft/actions/${schemaCode}`
                    : menu === "actions"
                    ? `/draft/deployment/${schemaCode}`
                    : menu === "origin"
                    ? `/draft/attributes/${schemaCode}`
                    : "/"
                }
              >
                <NormalButton
                  TextTitle="NEXT"
                  BorderRadius={0}
                  FontSize={24}
                ></NormalButton>
              </Link>
            )}
            {!next || next === "then" ? ( <Link
                to={
                  menu === "actions"
                    ? `/draft/actions/${schemaCode}`
                    : next === "then" ? 
                    `/draft/actions/${schemaCode}`
                    : "/"
                }
              >
                <NormalButton
                  TextTitle="BACK"
                  BorderRadius={0}
                  FontSize={24}
                ></NormalButton>
              </Link>) : null }
          </div>
        </div>
        <Conectwalet></Conectwalet>
      </div>
    </div>
  );
};

export default DraftMenu;
