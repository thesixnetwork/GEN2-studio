import ClearIcon from "@mui/icons-material/Clear";
import { styled, Tooltip } from "@mui/material";
import Swal from "sweetalert2";
import axios from "axios";
import { getAccessTokenFromLocalStorage } from "../helpers/AuthService";
import React, { 
  // useEffect, 
  // useState 
} from "react";
import { useParams } from "react-router-dom";
// import { useNavigate } from "react-router-dom";
// import dotenv from "dotenv";
// import path from "path";
// dotenv.config({ path: path.resolve(__dirname, "../../.env") });
import { IActions } from "../types/Nftmngr"

interface MyComponentProps {
  index: number, 
  data: IActions, 
  allAction: IActions[], 
}

const DraftActionCard = (props: MyComponentProps) => {
  // console.log(11111)
  // console.log(11111,props.data)
  const { schema_revision } = useParams();
  const Delete = styled(ClearIcon)({
    borderRadius: "16px",
    border: "2px solid white",
    cursor: "pointer",
    transition: "transform 0.3s",

    "&:hover": {
      transform: "scale(1.2)",
    },
  });

  const convertStringIfTooLong = (str: string, length: number): React.ReactElement<string> => {
    if (str.length > length) {
      const text = str.substring(0, length) + "...";
      return <>{text}</>;
    } else {
      return <>{str}</>;
    }
  };

  const handleDelete = async () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#7A8ED7",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        props.allAction.splice(props.index, 1);
        await saveAction();
      }
    });
  };

  const saveAction = async () => {
    const apiUrl = `${
      import.meta.env.VITE_APP_API_ENDPOINT_SCHEMA_INFO
    }schema/set_schema_info`;
    const requestData = {
      payload: {
        schema_info: {
          onchain_data: {
            actions: props.allAction,
          },
        },
        schema_code: schema_revision,
        status: "Draft",
        current_state: "6",
      },
    };

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
        Swal.fire("Deleted!", "Your action has been deleted.", "success");
        console.log(
          ">",
          response.data.data.update_schema.schema_info.onchain_data.actions
        );
        props.allAction =
          response.data.data.update_schema.schema_info.onchain_data.actions;
      })
      .catch((error) => {
        console.error("API Error:", error);
      });
  };

  return (
    <button
      className={`flex flex-col items-start border border-white max-w-48 w-48 h-24 cursor-pointer hover:bg-opacity-20 hover:bg-white p-2 focus:bg-white focus:bg-opacity-20`}
    >
      <div className="flex w-full justify-between">
        <div className="flex">
          <p className="text-md">Name:&nbsp;</p>
          <span className="text-md underline text-gray-300 decoration-gray-300">
            <Tooltip title={props.data.name}>
              {convertStringIfTooLong(props.data.name, 8)}
            </Tooltip>
          </span>
        </div>
        <div onClick={handleDelete}>
          <Delete />
        </div>
      </div>
      <div className="flex flex-col items-start">
        <p className="text-md">Description:&nbsp;</p>
        <p className="text-md underline text-gray-300 decoration-gray-300">
          <Tooltip title={props.data.desc}>
            {convertStringIfTooLong(props.data.desc, 18)}
          </Tooltip>
        </p>
      </div>
    </button>
  );
};

export default DraftActionCard;
