import { DragEvent } from "react";

const onDragStart = (event: DragEvent, nodeType: string) => {
  event.dataTransfer.setData("application/reactflow", nodeType);
  event.dataTransfer.effectAllowed = "move";
};

interface MenuProps {
  nodeName: string;
  backgroundColor?: string;
  handleDoubleClickAddNode: (type: string) => void;
}

const Menu = (props: MenuProps) => {
  return (
    <>
      {props.nodeName === "increaseNode" ||
      props.nodeName === "decreaseNode" ||
      props.nodeName === "trueNode" ||
      props.nodeName === "falseNode" ||
      props.nodeName === "setNode" ? (
        <div
          className="h-14 w-48 flex items-center justify-center border-2 transform translate-x-0 translate-y-0"
          onDragStart={(event: DragEvent) => onDragStart(event, props.nodeName)}
          draggable
          onDoubleClick={() => props.handleDoubleClickAddNode(props.nodeName)}
          >
          <p className="text-base">
            {props.nodeName === "increaseNode"
              ? "INCREASE"
              : props.nodeName === "decreaseNode"
              ? "DECREASE"
              : props.nodeName === "trueNode"
              ? "TRUE"
              : props.nodeName === "falseNode"
              ? "FALSE"
              : props.nodeName === "setNode"
              ? "SET"
              : null}
          </p>
        </div>
      ) : props.nodeName === "valueNode" ||
        props.nodeName === "paramNode" ||
        props.nodeName === "attributeNode" ? (
        <div className="flex flex-col items-center w-12">
          <div
            className="w-10 h-10 rounded-full flex items-center justify-center border-2 transform translate-x-0 translate-y-0"
            onDragStart={(event: DragEvent) =>
              onDragStart(event, props.nodeName)
            }
            draggable
            onDoubleClick={() => props.handleDoubleClickAddNode(props.nodeName)}
          >
            <p className="text-base">
              {props.nodeName === "valueNode"
                ? "V"
                : props.nodeName === "paramNode"
                ? "P"
                : props.nodeName === "attributeNode"
                ? "@"
                : null}
            </p>
          </div>
          <p className="text-xs">
            {props.nodeName === "valueNode"
              ? "Value"
              : props.nodeName === "paramNode"
              ? "Param"
              : props.nodeName === "attributeNode"
              ? "Attribute"
              : null}
          </p>
        </div>
      ) : null}
    </>
  );
};

export default Menu;
