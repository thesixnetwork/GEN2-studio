import { DragEvent } from "react";

const onDragStart = (event: DragEvent, nodeType: string) => {
  event.dataTransfer.setData("application/reactflow", nodeType);
  event.dataTransfer.effectAllowed = "move";
  console.log(event);
};
interface MenuProps {
  nodeName: string;
  title: string;
  handleDoubleClickAddNode: (type: string) => void;
}

const Menu = (props: MenuProps) => {
  return (
    <div className="flex flex-col items-center w-14 transform translate-x-0 translate-y-0">
      <div
        className="w-10 h-10 rounded-full flex items-center justify-center border-2"
        onDragStart={(event: DragEvent) => onDragStart(event, props.nodeName)}
        draggable
        onDoubleClick={() => props.handleDoubleClickAddNode(props.nodeName)}
      >
        <p className="text-base">{props.title}</p>
      </div>
      <p className="text-xs">
        {props.title === "V" ? "Value" : props.title === "P" ? "Param" : props.title === "@" ? "Attribute" : props.title === ">" ? "GT" : props.title === ">=" ? "GTE" : props.title === "<" ? "LT" : props.title === "<=" ? "LTE" : props.title === "=" ? "Equal" : props.title === "!=" ? "Not Equal" : props.title === "OR" ? "Or" : props.title === "AND" ? "And" :  null}
      </p>
    </div>
    
  );
};

export default Menu;
