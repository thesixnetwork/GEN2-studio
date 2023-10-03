import React, { useEffect } from "react";
import Conectwalet from "../component/Connectwallet";
import Stepper2 from "../component/Stepper2";
import Darkbg from "../component/Alert/Darkbg";
import NormalButton from "../component/NormalButton";
import { useState, DragEvent, useRef } from "react";

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
  MiniMap,
  useReactFlow,
} from "reactflow";
import "reactflow/dist/base.css";
import { Factory } from "../function/convertMetadata/Factory";
import Flowbar from "../component/ReactFlow/Flowbar";
import Customnode from "../component/node/Customnode";
import inputNode from "../component/ReactFlow/CustomNode/InputNode";

import SyntaxHighlighter from "react-syntax-highlighter";
import docco from "react-syntax-highlighter/dist/esm/styles/hljs/docco";

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
      showType: "addNode",
      id: "1",
      parentNode: "root",
      label: { x: 0, y: 0 },
    },
  },
];

let id = 2;

const getId = () => `${id++}`;

const NODE_WIDTH = 150;
const NODE_HEIGHT = 57;
const GRID_PADDING = 60;

const BasicFlow = () => {
  const [reactFlowInstance, setReactFlowInstance] =
    useState<ReactFlowInstance>();

  const reactFlowWrapper = useRef(null);
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [updatedNodes, setUpdatedNodes] = useState(initialNodes);
  const [metaData, setMetaData] = useState("please add item");
  const { setCenter } = useReactFlow();

  const [redraw, setRedraw] = useState(false);

  const focusNode = (node) => {
    const x = node.position.x + node.width / 2;
    const y = node.position.y + node.height / 2;
    const zoom = 1;


    setCenter(x, y, { zoom, duration: 1000 });
  };

  const onConnect = (params: Connection | Edge) =>
    setEdges((eds) => addEdge(params, eds));
  const onInit = (rfi: ReactFlowInstance) => setReactFlowInstance(rfi);

  const onDragOver = (event: DragEvent) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  };

  const resetNode = () => {
    setNodes({
      id: "1",
      type: "customInputNode",
      position: { x: 0, y: 0 },
      draggable: false,
      data: {
        showType: "addNode",
        id: "1",
        parentNode: "root",
        label: { x: 0, y: 0 },
      },
    },);
    console.log(nodes[0])
    focusNode(nodes[0])
  };

  const getDataFromNode = () => {
    const tempArr: string[] = [];
    nodes.forEach((node) => {
      tempArr.push(node.data);
    });

    const transformData = (data, id) => {
      // loop nodes
      for (let i = 0; i < nodes.length; i++) {
        for (let j = 0; j < nodes.length; j++) {
          if (
            nodes[i].data.parentNode === nodes[j].data.parentNode &&
            nodes[i].data.showType === "attributeNode" &&
            nodes[j].data.showType === "valueNode"
          ) {
            nodes[j].data.dataType = nodes[i].data.dataType;
          }

          if (
            (nodes[i].id === nodes[j].data.parentNode &&
              nodes[i].data.showType === "equalNode") ||
            nodes[i].data.showType === "notEqualNode" ||
            nodes[i].data.showType === "moreThanNode" ||
            nodes[i].data.showType === "lessThanNode" ||
            nodes[i].data.showType === "moreThanAndEqualNode" ||
            (nodes[i].data.showType === "lessThanAndEqualNode" &&
              nodes[j].data.showType === "valueNode")
          ) {
            nodes[i].data.dataType = nodes[j].data.dataType;
          }
        }
      }
      const node = data.find((item) => item.id === id);
      if (!node) return null;

      const result = {};

      if (node.showType === "andNode" || node.showType === "orNode") {
        result.type = "condition_oper";
        result.value = node.showType === "andNode" ? "AND" : "OR";
      } else if (
        node.showType === "equalNode" ||
        node.showType === "notEqualNode" ||
        node.showType === "moreThanNode" ||
        node.showType === "moreThanAndEqualNode" ||
        node.showType === "lessThan" ||
        node.showType === "lessThanAndEqualNode"
      ) {
        result.type =
          node.dataType === "number"
            ? "number_compare_oper"
            : node.dataType === "float"
            ? "float_compare_oper"
            : node.dataType === "boolean"
            ? "boolean_compare_oper"
            : "string_compare_oper";
        result.value =
          node.value === "equal"
            ? "=="
            : node.value === "morethan"
            ? ">"
            : node.value === "morethanandequal"
            ? ">="
            : node.value === "lessthan"
            ? "<"
            : node.value === "lessthanandequal"
            ? "<="
            : "!=";
      } else if (node.showType === "attributeNode") {
        result.type = "meta_function";
        if (node.dataType === "boolean") {
          result.functionName = "meta.GetBoolean";
        } else if (node.dataType === "string") {
          result.functionName = "meta.GetString";
        } else if (node.dataType === "number") {
          result.functionName = "meta.GetNumber";
        } else if (node.dataType === "float") {
          result.functionName = "meta.GetFloat";
        }
        result.attributeName = {
          type: "constant",
          dataType: "string",
          value: node.value,
        };
      } else if (node.showType === "valueNode") {
        result.type = "constant";
        result.dataType = node.dataType;
        result.value =
          node.dataType === "number"
            ? parseInt(node.value)
            : node.dataType === "float"
            ? parseFloat(node.value)
            : node.dataType === "boolean"
            ? node.value === "true"
            : node.value;
      } else {
        result.type = "addNode";
      }

      const leftNode = data.find(
        (item) => item.parentNode === id && item.id !== id
      );
      if (leftNode) {
        result.left = transformData(data, leftNode.id);
      }

      const rightNode = data.find(
        (item) => item.parentNode === id && item.id !== leftNode?.id
      );
      if (rightNode) {
        result.right = transformData(data, rightNode.id);
      }

      return result;
    };

    const generateObject = transformData(tempArr, "1");
    console.log(generateObject);
    const object = Factory.createObject(generateObject).toString();
    console.log(object);
    setMetaData(object);
  };

  const onDrop = async (event: DragEvent) => {
    event.preventDefault();
    let nodeOnDrop;
    if (reactFlowInstance) {
      const type = event.dataTransfer.getData("application/reactflow");
      const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();

      const mousePosition = reactFlowInstance.project({
        x: event.clientX - reactFlowBounds.left,
        y: event.clientY - reactFlowBounds.top,
      });

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

        nodeOnDrop = node;
        return updatedNode;
      };

      let updatedNodes = [];
      let dropped = false;

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
                position: positionLeftNode,
                type: "customInputNode",
                data: {
                  showType: "addNode",
                  label: positionLeftNode,
                  id: leftId,
                  parentNode: node.id,
                },
                draggable: false,
              };
              const rightNode = {
                id: rightId,
                position: positionRightNode,
                type: "customInputNode",
                data: {
                  showType: "addNode",
                  label: positionRightNode,
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
                  style: { stroke: "#FFAA9A" },
                  type: "smoothstep",
                },
                {
                  id: `e1-${leftId}`,
                  source: node.id,
                  target: leftId,
                  animated: true,
                  style: { stroke: "#FFAA9A" },
                  type: "smoothstep",
                },
              ];

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
        console.log("node on drop", nodeOnDrop);
        focusNode(nodeOnDrop);
      }
    }
  };

  useEffect(() => {
    if (redraw && nodes.length > 0) {
      setRedraw(false);
      const treeNodes = generateTreeFromReactFlow(nodes, edges);

      const tree = new Tree(treeNodes);
      tree.root.setBox(nodes.filter((node) => node.id === tree.root.id)[0]);
      // log tree

      const redrawTree = async () => {
        await drawTree(nodes, tree, tree.root, 0, 0);

        // adjust parents
        await adjustParents(tree);
        await adjustTreePosition(tree, 0);
        setUpdatedNodes(tree.getAllBoxes());
      };
      redrawTree();
    }
  }, [nodes, edges, redraw]);

  useEffect(() => {
    setNodes(updatedNodes);
  }, [updatedNodes]);

  useEffect(() => {
    if (nodes.length > 2) {
      getDataFromNode();
    }
  }, [nodes]);

  return (
    <div style={{ height: 500, width: 1200 }}>
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
          fitView
        >
          <Controls />
          <MiniMap></MiniMap>
        </ReactFlow>
      </div>
      <SyntaxHighlighter language="javascript">{metaData}</SyntaxHighlighter>
      <div>
        <div className="flex">
          <div onClick={getDataFromNode}>
            <NormalButton
              TextTitle="SAVE"
              BorderRadius={0}
              FontSize={32}
            ></NormalButton>
            </div>
        </div>
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
            <div className="flex ">
              <div>
                <Stepper2 ActiveStep={6}></Stepper2>
                <div className="w-[931px] h-[1px] bg-[#D9D9D9]"></div>
              </div>
              <Conectwalet></Conectwalet>
            </div>
            <div className="mt-[20px] flex flex-col items-center justify-center">
              <ReactFlowProvider>
                <Flowbar></Flowbar>
                <BasicFlow />
              </ReactFlowProvider>
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
