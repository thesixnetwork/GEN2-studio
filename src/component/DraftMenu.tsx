import Conectwalet from "./Connectwallet";
import NormalButton from "./NormalButton";
import { Link } from "react-router-dom";

const DraftMenu = ({ menu, schemaCode }) => {
  console.log(menu);

  return (
    <div className="w-[1280px]">
      <div className="flex justify-between">
        <div className="border-b border-white w-[960px] flex justify-between">
          <h1 className="text-5xl h-[95px] flex flex-col justify-center ">
            {menu === "attributes"
              ? "Draft: Attributes"
              : menu === "deployment"
              ? "Draft: Deplotment"
              : "Draft: Actions"}
          </h1>
          <div className="h-full flex items-end pb-2">
            {menu === "deployment" ? null : (
              <Link
                to={
                  menu === "attributes"
                    ? `/draft/actions/${schemaCode}`
                    : menu === "actions"
                    ? `/draft/deployment/${schemaCode}`
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
          </div>
        </div>
        <Conectwalet></Conectwalet>
      </div>
    </div>
  );
};

export default DraftMenu;
