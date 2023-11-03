import { Button, Tooltip } from "@mui/material";
import editIcon from "../pic/draft-edit-rounded.png";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import * as React from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useState } from "react";
import saveIcon from "../pic/draft-save.png";
import { getAccessTokenFromLocalStorage } from "../helpers/AuthService";
import axios from "axios";
import { useEffect } from "react";
import Swal from "sweetalert2";
import { Navigate, useNavigate } from "react-router-dom";
import addIcon from "../pic/draft-add.png";

const DraftActionPreviewCard = ({ data, param }) => {
  const [isEditDesc, setIsEditDesc] = useState(false);
  const [actionData, setActionData] = useState();
  const [actionThenArr, setActionThenArr] = useState([]);
  const [actionThenIndex, setActionThenIndex] = useState(null);
  const [descInput, setDescInput] = useState(data.desc);
  const navigate = useNavigate();

  const handleDescInput = (e) => {
    setDescInput(e.target.value);
    data.desc = e.target.value;
  };
  const convertToBase64 = (str) => {
    return btoa(str);
  };

  const convertStringIfTooLong = (str, length) => {
    if (str.length > length) {
      return str.substring(0, length) + "...";
    } else {
      return str;
    }
  };

  const FindSchemaCode = async () => {
    const apiUrl = `https://six-gen2-studio-nest-backend-api-traffic-gateway-1w6bfx2j.ts.gateway.dev/schema/get_schema_info/${param.schema_revision}`;
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
        setActionData(
          response.data.data.schema_info.schema_info.onchain_data.actions
        );
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  useEffect(() => {
    FindSchemaCode();
  }, []);

  const handleEditDesc = () => {
    setIsEditDesc(true);
  };

  const handleSaveDesc = () => {
    setIsEditDesc(false);
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#7A8ED7",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, edit it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await saveEditedDesc();
        Swal.fire("Saved!", "Your descripttion has been saved.", "success");
        navigate(`/draft/actions/${param}`);
      } else if (result.isDismissed) {
        setDescInput(data.desc);
      }
    });
  };

  const saveEditedDesc = async () => {
    const apiUrl =
      "https://six-gen2-studio-nest-backend-api-traffic-gateway-1w6bfx2j.ts.gateway.dev/schema/set_actions";
    const requestData = {
      payload: {
        schema_code: param,
        name: data.name,
        desc: descInput,
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
      })
      .catch((error) => {
        console.error("API Error:", error);
      });
  };

  return (
    <div className="border border-white w-full">
      {/* <div className="ml-[484px] absolute ">
        <IconButton
          onClick={handleOpen}
          size="small"
          aria-controls={open ? "account-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
        >
          <img src={editIcon} alt="edit" className="h-6 w-6"></img>
        </IconButton>
        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            "aria-labelledby": "basic-button",
          }}
          transformOrigin={{ horizontal: "right", vertical: "top" }}
          anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
        >
          <MenuItem onClick={handleClose}>coding</MenuItem>
          <MenuItem onClick={handleClose}>low code</MenuItem>
        </Menu>
      </div> */}
      <div className="p-3">
        <div className="flex">
          <p className="text-md">Name:&nbsp;</p>
          <span className="text-md underline">{data.name}</span>
        </div>
        <div>
          <p>Description:&nbsp;</p>
          <div className="flex items-center ml-8">
            {isEditDesc ? (
              <button onClick={handleSaveDesc}>
                <img
                  src={saveIcon}
                  alt="save"
                  className="w-4 h-4 mr-1 duration-300 hover:scale-125"
                />
              </button>
            ) : (
              <button onClick={handleEditDesc}>
                <img
                  src={editIcon}
                  alt="edit"
                  className="w-4 h-4 mr-1 duration-300 hover:scale-125"
                />
              </button>
            )}
            <Tooltip title={data.desc}>
              {isEditDesc ? (
                <input
                  type="text"
                  className="bg-transparent border-0 focus:outline-none w-full"
                  value={descInput}
                  onChange={handleDescInput}
                ></input>
              ) : (
                <span>
                  {data.desc !== undefined &&
                    convertStringIfTooLong(data.desc, 50)}
                </span>
              )}
            </Tooltip>
          </div>
        </div>
        <div className="flex">
          <p className="text-md">Parameters:&nbsp;</p>
          <span className="text-md underline">{data.params}</span>
        </div>
        <div>
          <p>When:&nbsp;</p>
          <div className="flex items-center ml-8">
            <Link
              to={
                data.when === ""
                  ? `/draft/actions/edit/when/${data.name}/create-new-when/${param}`
                  : `/draft/actions/edit/when/${data.name}/${data.when}/${param}`
              }
            >
              <button>
                <img
                  src={editIcon}
                  alt="edit"
                  className="w-4 h-4 mr-1 duration-300 hover:scale-125"
                />
              </button>
              <Tooltip title={data.when}>
                <span>{convertStringIfTooLong(data.when, 50)}</span>
              </Tooltip>
            </Link>
          </div>
        </div>
        <div>
          <p>Then:&nbsp;</p>
          <ul className="ml-8">
            {data.then.map((item, index) => (
              <li key={index} className="list-disc w-96 flex items-center">
                <div className="flex items-center">
                  <Link
                    to={
                      data.then[index].startsWith("meta.SetImage")
                        ? `/draft/actions/edit/then/${
                            data.name
                          }/${convertToBase64(data.then[index])}/${param}`
                        : `/draft/actions/edit/then/${data.name}/${data.then[index]}/${param}`
                    }
                  >
                    <img
                      src={editIcon}
                      alt="edit"
                      className="w-4 h-4 mr-1 duration-300 hover:scale-125"
                    />
                  </Link>
                  <Tooltip title={item}>
                    <span>{convertStringIfTooLong(item, 42)}</span>
                  </Tooltip>
                </div>
              </li>
            ))}
          </ul>
          <div
            className="ml-14 mt-2 hover:scale-125 duration-300 w-4 h-4 cursor-pointer"
            onClick={() => {
              // saveActionName(props.actionName);
              navigate(
                `/draft/actions/edit/then/${data.name}/create-new-action/${param}`
              );
            }}
          >
            <img src={addIcon}></img>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DraftActionPreviewCard;
