import Conectwalet from "./Connectwallet";

const DraftMenu = ({menu}) => {
    console.log(menu)
  return (
    <div className="w-[1280px]">
      <div className="flex justify-between">
        <div>
          <h1 className="text-5xl h-[95px] flex flex-col justify-center border-b border-white w-[960px]">
            {menu === "attributes" ? "Draft: Attributes" : "Draft: Actions"}
          </h1>
        </div>
        <Conectwalet></Conectwalet>
      </div>
    </div>
  );
};

export default DraftMenu;
