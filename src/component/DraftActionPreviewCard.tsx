import { Button } from "@mui/material";
import editIcon from "../pic/draft-edit-rounded.png";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import * as React from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";

const DraftActionPreviewCard = ({ data, param }) => {
  console.log("----p",param)
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  console.log("===>", data);
  return (
    <div className="border border-white w-[520px]">
      <div className="ml-[484px] absolute ">
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
      </div>
      <div className="p-3">
        <div className="flex">
          <p className="text-md">Name:&nbsp;</p>
          <span className="text-md underline">{data.name}</span>
        </div>
        <div className="flex">
          <p>Description:&nbsp;</p>
          <span>{data.desc}</span>
        </div>
        <div className="flex">
          <p className="text-md">Parameters:&nbsp;</p>
          <span className="text-md underline">{data.params}</span>
        </div>
        <div className="flex">
          <p>When:&nbsp;</p>
          <span>{data.when}</span>
          <Link to={`/draft/actions/edit/when/${data.name}/${data.when}/${param}`}>
                  <button>
                    <img src={editIcon} alt="edit" className="w-4 h-4" />
                  </button>
                </Link>
        </div>
        <div className="">
          <p>Then:&nbsp;</p>
          <ul className="ml-8">
            {data.then.map((item, index) => (
              <li key={index} className="list-disc w-96 flex items-center">
                {item}
                <Link to={`/draft/actions/edit/then/${data.name}/${data.then[index]}/${param}`}>
                  <button>
                    <img src={editIcon} alt="edit" className="w-4 h-4" />
                  </button>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default DraftActionPreviewCard;
