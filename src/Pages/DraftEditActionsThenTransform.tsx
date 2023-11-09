import React, { useEffect, useState } from "react";
import { Tooltip } from "@mui/material";

import Add from "../pic/Group 40.png";

import Conectwalet from "../component/Connectwallet";
import Stepper2 from "../component/Stepper2";
import Darkbg from "../component/Alert/Darkbg";
import ActionTransformCard from "../component/ActionTransformCard";
import { Link } from "react-router-dom";
import DraftMenu from "../component/DraftMenu";
import { useParams } from "react-router-dom";

const DraftEditActionsThenTransform = () => {
  const param = useParams();
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
            <div className="w-full flex items-center justify-center gap-x-20 min-h-[89.8%]">
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
  );
};

export default DraftEditActionsThenTransform;
