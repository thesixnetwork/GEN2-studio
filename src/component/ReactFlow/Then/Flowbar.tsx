import Menu from "./Sidebar/Menu";

interface FlowbarProps {
  selectedAttribute: string | number | boolean;
  actionName: string;
}

export default function Flowbar({
  selectedAttribute,
  actionName,
}: FlowbarProps) {
  return (
    <div className="w-[266px] h-[600px] bg-[#D9D9D980] rounded-2xl p-4 items-center flex flex-col justify-between">
      {selectedAttribute === "number" ||
      selectedAttribute === "float" ||
      selectedAttribute === "boolean" ||
      selectedAttribute === "string" ? (
        <>
          <div className="flex flex-col justify-center items-center gap-y-2">
            <div className="bg-[#bababa] w-52 h-24 flex flex-col items-center justify-center">
              <p>Action Name:</p>
              <p>{actionName}</p>
            </div>
            <h2>Available Function</h2>
            {selectedAttribute === "number" || selectedAttribute === "float" ? (
              <>
                <Menu nodeName="increaseNode" />
                <Menu nodeName="decreaseNode" />
                <Menu nodeName="setNode" />
              </>
            ) : selectedAttribute === "boolean" ? (
              <>
                <Menu nodeName="setNode" />
              </>
            ) : selectedAttribute === "string" ? (
              <Menu nodeName="setNode" />
            ) : null}
          </div>
          <div className="flex flex-col justify-center items-center gap-y-2 mb-20">
            <h2>Available Operand</h2>
            <div className="flex">
              <Menu nodeName="valueNode" />
              <Menu nodeName="attributeNode" />
              <Menu nodeName="paramNode" />
            </div>
          </div>
        </>
      ) : selectedAttribute === "none" ? (
        <div className="flex h-full flex-col justify-between items-center gap-y-2 mb-20">
          <div className="bg-[#bababa] w-52 h-24 flex flex-col items-center justify-center">
            <p>Action Name:</p>
            <p>{actionName}</p>
          </div>
          <div className="flex flex-col items-center justify-center">
            <h2 className="pb-2">Available Operand</h2>
            <div className="flex">
              <Menu nodeName="valueNode" />
              <Menu nodeName="attributeNode" />
              <Menu nodeName="paramNode" />
            </div>
          </div>
        </div>
      ) : (
        <>
          <div className="bg-[#bababa] w-52 h-24 flex flex-col items-center justify-center">
            <p>Action Name:</p>
            <p>{actionName}</p>
          </div>
          <div className="flex justify-center items-center h-full">
            <p>Please Select Your Attribute</p>
          </div>
        </>
      )}
    </div>
  );
}
