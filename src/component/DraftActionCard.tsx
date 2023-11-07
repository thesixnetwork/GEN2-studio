import ClearIcon from "@mui/icons-material/Clear";
import { styled } from "@mui/material";
import Swal from "sweetalert2";
import axios from "axios";
import { getAccessTokenFromLocalStorage } from "../helpers/AuthService";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const DraftActionCard = ({ index, data, allAction }) => {
  const [actions, setActions] = useState(allAction);
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
        allAction.splice(index, 1);
        await saveAction();
      }
    });
  };

  const saveAction = async () => {
    const apiUrl =
      "https://six-gen2-studio-nest-backend-api-traffic-gateway-1w6bfx2j.ts.gateway.dev/schema/set_schema_info";
    const requestData = {
      payload: {
        schema_info: {
          onchain_data: {
            actions: allAction,
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
        console.log(">",response.data.data.update_schema.schema_info.onchain_data.actions)
        allAction = response.data.data.update_schema.schema_info.onchain_data.actions;
      })
      .catch((error) => {
        console.error("API Error:", error);
      });
  };

  return (
    <div className="border border-white max-w-64 h-24 cursor-pointer hover:bg-opacity-20 hover:bg-white p-2">
      <div className="flex justify-between">
        <div className="flex">
          <p className="text-md">Name:&nbsp;</p>
          <span className="text-md underline text-gray-300 decoration-gray-300">
            {data.name}
          </span>
        </div>

        <div onClick={handleDelete}>
          <Delete />
        </div>
      </div>
      <div className="flex">
        <p className="text-md">Description:&nbsp;</p>
        <span className="text-md underline text-gray-300 decoration-gray-300">
          {data.desc}
        </span>
      </div>
    </div>
  );
};

export default DraftActionCard;
