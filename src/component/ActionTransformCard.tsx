
import updateValueImg from "../pic/action-update-value.png";
import dynamicImg from "../pic/action-dynamic.png";
import staticImg from "../pic/action-static.png";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
const ActionTransformCard = ({ type,draft }) => {
  const param = useParams();
  console.log("here", type);

  return (
    <Link
      to={
        type === "static" && draft
          ? `/draft/actions/edit/then/transform/static/${param.action_name}/${param.meta_function}/${param.schema_revision}`
          : type === "dynamic" && draft
          ? `/draft/actions/edit/then/transform/dynamic/${param.action_name}/${param.meta_function}/${param.schema_revision}`
          :type === "static" && !draft
          ? "static"
          : type === "dynamic" && !draft
          ? "dynamic"
          : "/"
      }
    >
      <div className="border-2 border-white rounded-xl flex flex-col w-80 h-96 justify-center items-center hover:bg-[#AEB1B9] cursor-pointer">
        <div className="flex items-center justify-center h-20">
          {type === "static" ? (
            <img
              src={staticImg}
              alt="static-img"
              className="w-20"
            />
          ) : type === "dynamic" ? (
            <img
              src={dynamicImg}
              alt="dynamic-img"
              className="w-20"
            />
          ) : null}
        </div>
        <h2>
          {type === "static"
            ? "Static Image Path"
            : type === "dynamic"
            ? "Dynamic Image Path"
            : null}
        </h2>
      </div>
    </Link>
  );
};

export default ActionTransformCard;
