import { useState } from "react";
import { Handle, Position, useStoreApi } from "reactflow";
import { useReactFlow } from "reactflow";

interface CircleNodeProps {
  data: {
    id: string;
    showType: string;
    value: string;
    dataType: string;
  };
}

interface EventProps {
  target: {
    value: string;
  };
}

const DynamicNode = (props: CircleNodeProps) => {
  const { setNodes } = useReactFlow();
  const store = useStoreApi();

  const [hovered, setHovered] = useState(false);

  const handleDragEnter = () => {
    setHovered(true);
  };

  const handleDragLeave = () => {
    setHovered(false);
  };

  const handleDrop = () => {
    setHovered(false);
  };

  const [isSelected, setIsSelected] = useState(false);

  const onChange = (e: EventProps) => {
    const { nodeInternals } = store.getState();
    setNodes(
      Array.from(nodeInternals.values()).map((node) => {
        console.log("props.data.id", props.data);
        if (node.id === props.data.id) {
          node.data.value = e.target.value;
        }
        return node;
      })
    );
  };

  const handleSelect = (e: EventProps) => {
    setIsSelected(true);
    const selectedOption = JSON.parse(e.target.value);
    // props.data.value = selectedOption.name
    // props.data.dataType = selectedOption.dataType
    const { nodeInternals } = store.getState();
    setNodes(
      Array.from(nodeInternals.values()).map((node) => {
        console.log("props.data.id", props.data);
        if (node.id === props.data.id) {
          props.data.value = selectedOption.name;
          props.data.dataType = selectedOption.dataType;
        }
        return node;
      })
    );
  };

  return props.data.showType === "valueNode" ? (
    <div
      className={`w-full p-2 rounded-full flex items-center justify-center border-2 text-black bg-[#E8EFFF]
                ${
                  hovered ? "border-indigo-600 opacity-80" : "border-gray-600"
                }`}
      onDragOver={handleDragEnter}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <Handle type="target" position={Position.Top} />
      <div className="flex items-center justify-center">
        <p className={`${hovered ? "text-indigo-600" : "text-gray-600"}`}>
          {" "}
          V:&nbsp;{" "}
        </p>
        <input
          type="text"
          name=""
          id=""
          className="w-16 rounded-full"
          onChange={(e) => {
            onChange(e);
          }}
        />
      </div>
      <Handle type="source" position={Position.Bottom} id="a" />
    </div>
  ) : props.data.showType === "attributeNode" ? (
    <div
      className={`w-full p-2 rounded-full flex items-center justify-center border-2
                ${
                  props.data.showType === "attributeNode"
                    ? "bg-[#D298DD]"
                    : props.data.showType === "paramNode"
                    ? "bg-[#FFCE74]"
                    : "bg-white"
                }
                ${
                  hovered ? "border-indigo-600 opacity-80" : "border-gray-600"
                }`}
      onDragOver={handleDragEnter}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <Handle type="target" position={Position.Top} />
      <div className="flex items-center justify-center">
        <p className={`${hovered ? "text-indigo-600 " : "text-gray-600"}`}>
          {" "}
          {props.data.showType === "attributeNode"
            ? "@"
            : props.data.showType === "paramNode"
            ? "P"
            : null}
          :&nbsp;{" "}
        </p>
        <select
          id=""
          name=""
          form=""
          className="rounded-full text-black"
          onChange={handleSelect}
        >
          <option value="" disabled selected hidden>
            -- select here --
          </option>
          <option value={JSON.stringify({ name: "point", dataType: "number" })}>
            point
          </option>
          <option
            value={JSON.stringify({ name: "check_in", dataType: "boolean" })}
          >
            check_in
          </option>
          <option value={JSON.stringify({ name: "score", dataType: "number" })}>
            score
          </option>
          <option value={JSON.stringify({ name: "tier", dataType: "string" })}>
            tier
          </option>
          <option
            value={JSON.stringify({ name: "caption", dataType: "string" })}
          >
            caption
          </option>
          <option
            value={JSON.stringify({
              name: "after_party_claim",
              dataType: "boolean",
            })}
          >
            after_party_claim
          </option>
          <option
            value={JSON.stringify({ name: "stage_count", dataType: "number" })}
          >
            stage_count
          </option>
          <option
            value={JSON.stringify({ name: "minor_count", dataType: "number" })}
          >
            minor_count
          </option>
        </select>
      </div>
      <Handle type="source" position={Position.Bottom} id="a" />
    </div>
  ) : props.data.showType === "paramNode" ? (
    <>
      <Handle type="target" position={Position.Top} />
      <div
        className={`w-full p-2 rounded-lg flex flex-col items-center justify-between border-2 bg-[#FFCE74]

      ${hovered ? "border-indigo-600 opacity-80" : "border-gray-600"}`}
        onDragOver={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <div className="flex h-full w-32 items-center justify-between flex-col">
          <p className={`${hovered ? "text-indigo-600 " : "text-gray-600"} `}>
            Param:
          </p>
          <select
            className="text-black rounded-full w-32 my-2"
            onChange={handleSelect}
          >
            <option value="" disabled selected hidden>
              - select type -
            </option>
            <option
              value={JSON.stringify({ name: "number", dataType: "number" })}
            >
              number
            </option>
            <option
              value={JSON.stringify({ name: "string", dataType: "string" })}
            >
              string
            </option>
          </select>
          {isSelected ? (
            <div className="flex items-center justify-center">
              <input
                type="text"
                name=""
                id=""
                className="w-32 rounded-full text-black"
                onChange={onChange}
                placeholder="  Input Param Name"
              />
            </div>
          ) : (
            <div></div>
          )}
        </div>
      </div>
      <Handle type="source" position={Position.Bottom} id="a" />
    </>
  ) : (
    <div
      className={`w-10 h-10 rounded-full flex items-center justify-center border-2
                ${
                  props.data.showType === "orNode"
                    ? "bg-[#ff6700]"
                    : props.data.showType === "andNode"
                    ? "bg-[#6865A5]"
                    : props.data.showType === "equalNode"
                    ? "bg-[#0041d0]"
                    : props.data.showType === "notEqualNode"
                    ? "bg-[#ff0072]"
                    : props.data.showType === "moreThanNode"
                    ? "bg-[#00d7ca]"
                    : props.data.showType === "moreThanAndEqualNode"
                    ? "bg-[#6ede87]"
                    : props.data.showType === "lessThanNode"
                    ? "bg-[#9ca8b3]"
                    : props.data.showType === "lessThanAndEqualNode"
                    ? "bg-[#FF99C3]"
                    : props.data.showType === "addNode"
                    ? "bg-[#ffc800]"
                    : "bg-white"
                }
                ${
                  hovered ? "border-indigo-600 opacity-80	" : "border-gray-600"
                }`}
      onDragOver={handleDragEnter}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <Handle type="target" position={Position.Top} />
      <p className={`${hovered ? "text-indigo-600" : "text-gray-600"}`}>
        {props.data.showType === "orNode"
          ? "OR"
          : props.data.showType === "andNode"
          ? "AND"
          : props.data.showType === "equalNode"
          ? "="
          : props.data.showType === "notEqualNode"
          ? "!="
          : props.data.showType === "moreThanNode"
          ? ">"
          : props.data.showType === "moreThanAndEqualNode"
          ? ">="
          : props.data.showType === "lessThanNode"
          ? "<"
          : props.data.showType === "lessThanAndEqualNode"
          ? "<="
          : props.data.showType === "addNode"
          ? "+"
          : "bg-white"}
      </p>
      <Handle type="source" position={Position.Bottom} id="a" />
    </div>
  );
};

export default DynamicNode;