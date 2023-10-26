import updateValueImg from "../pic/action-update-value.png";
import transferImg from "../pic/action-transfer.png";
import transformImg from "../pic/action-transform.png";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";

const ActionTypeCard = ({ type, draft }) => {
  const param = useParams();
  console.log("------------>", param);
  return (
    <Link
      to={
        type === "update" && draft
          ? `/draft/actions/edit/then/attribute/${param.action_name}/${param.meta_function}/${param.schema_revision}`
          : type === "transfer" && draft
          ? `/draft/actions/edit/then/transfer/${param.action_name}/${param.meta_function}/${param.schema_revision}` 
          : type === "transform" && draft
          ? `/draft/actions/edit/then/transform/${param.action_name}/${param.meta_function}/${param.schema_revision}`
          : type === "update" && !draft
          ? "attribute"
          : type === "transfer" && !draft
          ? "transfer"
          : type === "transform" && !draft
          ? "transform"
          : "/"
      }
    >
      <div className="border-2 border-white rounded-xl flex flex-col w-80 h-48 justify-center items-center hover:bg-[#AEB1B9] cursor-pointer">
        <div className="flex items-center justify-center h-20">
          {type === "update" ? (
            <img src={updateValueImg} alt="update-value-img" className="w-20" />
          ) : type === "transfer" ? (
            <img src={transferImg} alt="transfer-img" className="w-12" />
          ) : type === "transform" ? (
            <img src={transformImg} alt="transform-img" className="w-36" />
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
