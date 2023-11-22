import { CircularProgress } from "@mui/material";
import { useEffect } from "react";

interface DraftActionTransformPreviewProps {
  actions: Array<any>;
}

const DraftActionTransformPreview = (
  props: DraftActionTransformPreviewProps
) => {

    useEffect(() => {
    console.log("props.actions", props.actions);
    }, [props.actions]);
  return (
    <div className="w-96 h-24 bg-[#D9D9D980] flex flex-col items-center justify-center rounded-md">
      {props.actions[0] == undefined ? (
        <CircularProgress
          className=" text-white"
          sx={{
            width: 300,
            color: "white",
          }}
        ></CircularProgress>
      ) : (
        <div>
          <div>
            <p className="font-bold text-xl">Action Info:</p>
          </div>
          <div className="flex">
            <p>Name: &nbsp;</p>
            {props.actions[0] && props.actions[0].name !== undefined && (
              <span className="underline text-gray-300 decoration-gray-300">{props.actions[0].name}</span>
            )}
          </div>
          <div className="flex">
            <p>Description: &nbsp;</p>
            {props.actions[0] && props.actions[0].desc !== undefined && (
              <span className="underline text-gray-300 decoration-gray-300">{props.actions[0].desc}</span>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default DraftActionTransformPreview;
