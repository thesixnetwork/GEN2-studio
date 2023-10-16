
import updateValueImg from "../pic/action-update-value.png";
import transferImg from "../pic/action-transfer.png";
import transformImg from "../pic/action-transform.png";
import { Link } from "react-router-dom";

const ActionTypeCard = ({ type }) => {
  console.log("here", type);
  return (
    <Link
      to={
        type === "update"
          ? "attribute"
          : type === "transfer"
          ? "transfer"
          : type === "transform"
          ? "transform"
          : "/"
      }
    >
      <div className="border-2 border-white rounded-xl flex flex-col w-80 h-48 justify-center items-center hover:bg-[#AEB1B9] cursor-pointer">
        <div className="flex items-center justify-center h-20">
          {type === "update" ? (
            <img
              src={updateValueImg}
              alt="update-value-img"
              className="w-20"
            />
          ) : type === "transfer" ? (
            <img
              src={transferImg}
              alt="transfer-img"
              className="w-12"
            />
          ) : type === "transform" ? (
            <img
              src={transformImg}
              alt="transform-img"
              className="w-36"
            />
          ) : null}
        </div>
        <h2>
          {type === "update"
            ? "Update Attribute Value"
            : type === "transfer"
            ? "Transfer Number"
            : type === "transform"
            ? "Transform"
            : null}
        </h2>
      </div>
    </Link>
  );
};

export default ActionTypeCard;
