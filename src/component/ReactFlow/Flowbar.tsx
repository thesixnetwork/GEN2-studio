import { DragEvent } from "react";
import Conectwalet from "../Connectwallet";
import Node1 from "../Node1";
import Node2 from "../Node2";
import Menu from "./Sidebar/Menu";
const onDragStart = (event: DragEvent, nodeType: string, NameShow: string) => {
  event.dataTransfer.setData("application/reactflow", nodeType);
  event.dataTransfer.setData("application/reactflow2", NameShow);
  event.dataTransfer.effectAllowed = "move";
};

export default function Flowbar() {
  return (
    <div className="w-full h-[124px]  bg-[#D9D9D980] rounded-2xl flex justify-between px-[50px] items-center text-3xl">
      <div className="flex justify-center items-center ">
        <Menu nodeName='orNode' title="OR"/>
         <Menu nodeName='andNode' title="AND"/>
      </div>

      <div>
          <div className="flex">
            <Menu nodeName='valueNode' title="V"/>
            <Menu nodeName='attributeNode' title="@"/>
            <Menu nodeName='paramNode' title="P"/>
          </div>
          <div className="flex">
            <Menu nodeName='notEqualNode' title="!="/>
            <Menu nodeName='equalNode' title="="/>
            <Menu nodeName='moreThanNode' title=">"/>
            <Menu nodeName='moreThanAndEqualNode' title=">="/>
            <Menu nodeName='lessThanNode' title="<"/>
            <Menu nodeName='lessThanAndEqualNode' title="<="/>
          </div>
        </div>
    </div>
  );
}
