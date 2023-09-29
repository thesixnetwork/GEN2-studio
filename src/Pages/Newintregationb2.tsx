import React, { useEffect } from "react";
import Conectwalet from "../component/Connectwallet";
import Stepper2 from "../component/Stepper2";
import Darkbg from "../component/Alert/Darkbg";
import Box from "../component/Box";
import { useState, DragEvent, useRef } from "react";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import ReactFlow, {
  ReactFlowProvider,
  addEdge,
  ReactFlowInstance,
  Connection,
  Edge,
  Node,
  useNodesState,
  useEdgesState,
  Controls,
  NodeOrigin,
  Background,
  BackgroundVariant,
  MiniMap,
  useStoreApi,
} from "reactflow";
import "reactflow/dist/base.css";

import Flowbar from "../component/ReactFlow/Flowbar";
import Customnode from "../component/node/Customnode";
import inputNode from "../component/ReactFlow/CustomNode/InputNode";

import {
  Tree,
  adjustParents,
  adjustTreePosition,
  drawTree,
  generateTreeFromReactFlow,
} from "../function/auto-layout/";

const nodeTypes = {
  custom: Customnode,
  customInputNode: inputNode,
};
const initialNodes: Node[] = [
  {
    id: "1",
    type: "customInputNode",
    position: { x: 0, y: 0 },
    draggable: false,
    data: {
      showType: "testnos",
      id: "1",
      parentNode: "root",
      label: { x: 0, y: 0 },
    },
  },
];

const onDragOver = (event: DragEvent) => {
  event.preventDefault();
  event.dataTransfer.dropEffect = "move";
};

let id = 1;

const getId = () => `${id++}`;

const NODE_WIDTH = 150;
const NODE_HEIGHT = 57;
const GRID_PADDING = 60;

const nodeOrigin: NodeOrigin = [0.5, 0.5];

const BasicFlow = () => {
  const store = useStoreApi();
  const {
    height,
    width,
    transform: [transformX, transformY, zoomLevel],
  } = store.getState();

  const [reactFlowInstance, setReactFlowInstance] =
    useState<ReactFlowInstance>();

  const reactFlowWrapper = useRef(null);
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [updatedNodes, setUpdatedNodes] = useState(initialNodes);

  const [redraw, setRedraw] = useState(false);

  const onConnect = (params: Connection | Edge) =>
    setEdges((eds) => addEdge(params, eds));
  const onInit = (rfi: ReactFlowInstance) => setReactFlowInstance(rfi);

  const onDragOver = (event: DragEvent) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  };

  const onDrop = async (event: DragEvent) => {
    event.preventDefault();

    if (reactFlowInstance) {
      const type = event.dataTransfer.getData("application/reactflow");

      const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();

      const mousePosition = reactFlowInstance.project({
        x: event.clientX - reactFlowBounds.left,
        y: event.clientY - reactFlowBounds.top,
      });

      console.log(mousePosition);

      const isInsideLength = (position, startX, startY, width, height) => {
        const halfWidth = width / 2;
        const halfHeight = height / 2;
        return (
          position.x >= startX - halfWidth &&
          position.x <= startX + halfWidth &&
          position.y >= startY - halfHeight &&
          position.y <= startY + halfHeight
        );
      };

      const updateNode = (node, type) => {
        let updatedNode;

        const findLevel = Math.floor(node.position.y / 2 / NODE_HEIGHT) + 1;

        if (type === "orNode") {
          updatedNode = {
            ...node,
            data: {
              ...node.data,
              value: "or",
              showType: "orNode",
              label: { x: node.position.x, y: node.position.y },
            },
          };
        } else if (type === "andNode") {
          updatedNode = {
            ...node,
            data: {
              ...node.data,
              value: "and",
              showType: "andNode",
              label: { x: node.position.x, y: node.position.y },
            },
          };
        } else if (type === "valueNode") {
          updatedNode = {
            ...node,
            data: {
              ...node.data,
              value: "",
              showType: "valueNode",
              dataType: "",
              label: { x: node.position.x, y: node.position.y },
            },
          };
        } else if (type === "attributeNode") {
          updatedNode = {
            ...node,
            data: {
              ...node.data,
              dataType: "",
              value: "",
              showType: "attributeNode",
              label: { x: node.position.x, y: node.position.y },
            },
          };
        } else if (type === "paramNode") {
          updatedNode = {
            ...node,
            data: {
              ...node.data,
              value: "",
              showType: "paramNode",
              label: { x: node.position.x, y: node.position.y },
            },
          };
        } else if (type === "equalNode") {
          updatedNode = {
            ...node,
            data: {
              ...node.data,
              value: "equal",
              dataType: "",
              showType: "equalNode",
              label: { x: node.position.x, y: node.position.y },
            },
          };
        } else if (type === "notEqualNode") {
          updatedNode = {
            ...node,
            data: {
              ...node.data,
              value: "notequal",
              dataType: "",
              showType: "notEqualNode",
              label: { x: node.position.x, y: node.position.y },
            },
          };
        } else if (type === "moreThanNode") {
          updatedNode = {
            ...node,
            data: {
              ...node.data,
              value: "morethan",
              dataType: "",
              showType: "moreThanNode",
              label: { x: node.position.x, y: node.position.y },
            },
          };
        } else if (type === "moreThanAndEqualNode") {
          updatedNode = {
            ...node,
            data: {
              ...node.data,
              value: "morethanandequal",
              dataType: "",
              showType: "moreThanAndEqualNode",
              label: { x: node.position.x, y: node.position.y },
            },
          };
        } else if (type === "lessThanNode") {
          updatedNode = {
            ...node,
            data: {
              ...node.data,
              value: "lessthan",
              dataType: "",
              showType: "lessThanNode",
              label: { x: node.position.x, y: node.position.y },
            },
          };
        } else if (type === "lessThanAndEqualNode") {
          updatedNode = {
            ...node,
            data: {
              ...node.data,
              value: "lessthanandequal",
              dataType: "",
              showType: "lessThanAndEqualNode",
              label: { x: node.position.x, y: node.position.y },
            },
          };
        }

        return updatedNode;
      };

      let updatedNodes = [];
      let dropped = false;

      let updatedEdges = edges;

      for (let i = 0; i < nodes.length; i++) {
        const node = nodes[i];
        const { id, position } = node;
        const { x, y } = position;

        if (
          !isInsideLength(
            mousePosition,
            node.position.x,
            node.position.y,
            NODE_WIDTH,
            NODE_HEIGHT
          )
        ) {
          console.log("f**k");
          updatedNodes.push(node);
        } else {
          if (!dropped) {
            dropped = true;
            if (
              type !== "paramNode" &&
              type !== "attributeNode" &&
              type !== "valueNode"
            ) {
              const positionLeftNode = {
                x: node.position.x + NODE_WIDTH,
                y: node.position.y + NODE_HEIGHT + GRID_PADDING,
              };
              const positionRightNode = {
                x: node.position.x - NODE_WIDTH,
                y: node.position.y + NODE_HEIGHT + GRID_PADDING,
              };
              const leftId = getId();
              const rightId = getId();

              const leftNode = {
                id: leftId,
                position: positionRightNode,
                type: "customInputNode",
                data: {
                  showType: "testnos",
                  label: positionRightNode,
                  id: leftId,
                  parentNode: node.id,
                },
                draggable: false,
              };
              const rightNode = {
                id: rightId,
                position: positionLeftNode,
                type: "customInputNode",
                data: {
                  showType: "testnos",
                  label: positionLeftNode,
                  id: rightId,
                  parentNode: node.id,
                },
                draggable: false,
              };

              const newEdges = [
                {
                  id: `e1-${rightId}`,
                  source: node.id,
                  target: rightId,
                  animated: true,
                },
                {
                  id: `e1-${leftId}`,
                  source: node.id,
                  target: leftId,
                  animated: true,
                },
              ];

              console.log("update fking node", updateNode(node, type));
              if (
                updateNode(node, type).data.showType !== "paramNode" &&
                updateNode(node, type).data.showType !== "attributeNode" &&
                updateNode(node, type).data.showType !== "valueNode"
              ) {
                setEdges([...edges, ...newEdges]);

                updatedNodes.push(leftNode);
                updatedNodes.push(rightNode);
              }
            }
            updatedNodes.push(updateNode(node, type));
            setNodes(updatedNodes);
          }
        }
      }

      if (dropped) {
        setNodes(updatedNodes);
        setRedraw(true);
      }
    }
  };

  useEffect(() => {
    if (redraw && nodes.length > 0) {
      console.log("Redraw");
      setRedraw(false);
      const treeNodes = generateTreeFromReactFlow(nodes, edges);
      console.log("treeNodes", treeNodes);

      const tree = new Tree(treeNodes);
      tree.root.setBox(nodes.filter((node) => node.id === tree.root.id)[0]);
      // log tree
      console.log(tree);

      const redrawTree = async () => {
        await drawTree(nodes, tree, tree.root, 0, 0);

        console.log("tree", tree.getAllBoxes());

        // adjust parents
        await adjustParents(tree);
        await adjustTreePosition(tree, 10);
        setUpdatedNodes(tree.getAllBoxes());
      };
      redrawTree();
    }
  }, [nodes, edges, redraw]);

  useEffect(() => {
    setNodes(updatedNodes);
  }, [updatedNodes]);

  useEffect(() => {
    console.log(transformX, transformY);
  }, [transformX]);

  return (
    <div style={{ height: 500, width: 931 }}>
      <div ref={reactFlowWrapper} className="h-full">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          nodeTypes={nodeTypes}
          onEdgesChange={onEdgesChange}
          onNodesChange={onNodesChange}
          onConnect={onConnect}
          onInit={onInit}
          onDrop={onDrop}
          onDragOver={onDragOver}
          nodeOrigin={nodeOrigin}
        >
          <Background
            id="2"
            gap={15}
            offset={1}
            color="#ccc"
            variant={BackgroundVariant.Lines}
          />
          <Background variant={BackgroundVariant.Dots} />
          <Controls />
          <MiniMap></MiniMap>
        </ReactFlow>
      </div>
    </div>
  );
};

export default function Newintregationb1() {
  const [isShow, setIsShow] = React.useState(false);
  return (
    <div className="w-full flex justify-center ">
      <div className="w-full h-full fixed  flex justify-center items-center bg-gradient-24  from-white to-[#7A8ED7]">
        <div className="w-[1280px] h-[832px] bg-gradient-24 to-gray-700 from-gray-300 rounded-2xl flex justify-between p-4 shadow-lg shadow-black/20 dark:shadow-black/40">
          <div className="w-full h-full px-[20px]">
            <div>
              <Stepper2 ActiveStep={6}></Stepper2>
              <div className="w-[931px] h-[1px] bg-[#D9D9D9]"></div>
            </div>
            <div className="mt-[20px]">
              <ReactFlowProvider>
                <Flowbar></Flowbar>
                <BasicFlow />
              </ReactFlowProvider>
            </div>
          </div>
          <div className="w-2/6 h-5/6 flex flex-col items-end  ">
            <Conectwalet></Conectwalet>
            <Box
              Title="Action Name"
              DeTail="Name of action must be unique. And will call action by its name when we want to perform it"
            ></Box>
            <Box
              Title="Description"
              DeTail="To clarify what is the action mean"
            ></Box>
            <Box
              Title="Parameters"
              DeTail="Some action might require parameter to perform it"
            ></Box>
            <Box
              Title="Condition and Action"
              DeTail="Action can be perform while condition is met. When condition is unmet tx will be error"
            ></Box>
            <div
              onClick={() => {
                setIsShow(!isShow);
              }}
              className="absolute text-[50px] mt-[750px] ml-[1150px] cursor-pointer hover:scale-150 hover:text-[#262f50] duration-500"
            >
              ?
            </div>
          </div>
        </div>
        {isShow && (
          <div
            className="absolute duration-500"
            onClick={() => {
              setIsShow(!isShow);
            }}
          >
            <Darkbg></Darkbg>
          </div>
        )}
      </div>
    </div>
  );
}
