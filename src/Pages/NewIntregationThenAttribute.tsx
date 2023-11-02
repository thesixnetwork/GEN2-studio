import React, { useEffect, useMemo } from "react";
import { Tooltip } from "@mui/material";
import Conectwalet from "../component/Connectwallet";
import Stepper2 from "../component/Stepper2";
import Darkbg from "../component/Alert/Darkbg";
import NextPageButton from "../component/NextPageButton";
import { useState, DragEvent, useRef, useCallback } from "react";
import Help from "../component/Alert/Help";

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
  NodeChange,
  NodeOrigin
} from "reactflow";
import "reactflow/dist/base.css";
import { Factory } from "../function/ConvertObjectToMetadata/Factory";
import Flowbar from "../component/ReactFlow/Then/Flowbar";
import Customnode from "../component/node/Customnode";
import InputNode from "../component/ReactFlow/Then/CustomNode/InputNode";

import SyntaxHighlighter from "react-syntax-highlighter";

import {
  Tree,
  adjustParents,
  adjustTreePosition,
  drawTree,
  generateTreeFromReactFlow,
} from "../function/auto-layout";
import NormalButton from "../component/NormalButton";
import { getAccessTokenFromLocalStorage, getActionName, getSCHEMA_CODE } from "../helpers/AuthService";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const initialNodes: Node[] = [
  {
    id: "1",
    type: "customInputNode",
    position: { x: 0, y: 0 },
    draggable: false,
    data: {
      showType: "selectAttributeNode",
      id: "1",
      parentNode: "root",
      label: { x: 0, y: 0 },
    },
  },
];

let id = 2;

const getId = () => `${id++}`;

const nodeOrigin: NodeOrigin = [0.5, 0.5];


const NODE_WIDTH = 150;
const NODE_HEIGHT = 57;
const GRID_PADDING = 60;

const BasicFlow = () => {
  const [reactFlowInstance, setReactFlowInstance] =
    useState<ReactFlowInstance>();

  const reactFlowWrapper = useRef(null);
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const nodeTypes = useMemo(() => {
    return {
      customInputNode: InputNode,
      textUpdate: InputNode,
    };
  }, []);

  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [updatedNodes, setUpdatedNodes] = useState(initialNodes);
  const [metaData, setMetaData] = useState("please add item");
  const { setCenter, project } = useReactFlow();
  const [redraw, setRedraw] = useState(false);
  const [selectedAttribute, setSelectedAttribute] = useState("");
  const [createFirstNode, setCreateFirstNode] = useState(true);
  const nodeWidthAndHeight = {
    width: 150,
    height: 57,
    width_input: 151.2,
    height_input: 35.2,
    grid_padding: 60,
  };

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

      const isInsideLength = (
        position: object,
        startX: number,
        startY: number,
        width: number,
        height: number
      ) => {
        const halfWidth = width / 2;
        const halfHeight = height / 2;
        return (
          position.x >= startX - halfWidth &&
          position.x <= startX + halfWidth &&
          position.y >= startY - halfHeight &&
          position.y <= startY + halfHeight
        );
      };
      const updateNode = (node: object, type: string) => {
        let updatedNode;
        if (type === "increaseNode") {
          updatedNode = {
            ...node,
            data: {
              ...node.data,
              value: "increase",
              showType: "increaseNode",
              label: { x: node.position.x, y: node.position.y },
            },
          };
        } else if (type === "decreaseNode") {
          updatedNode = {
            ...node,
            data: {
              ...node.data,
              value: "decrease",
              showType: "decreaseNode",
              label: { x: node.position.x, y: node.position.y },
            },
          };
        } else if (type === "trueNode") {
          updatedNode = {
            ...node,
            data: {
              ...node.data,
              value: "true",
              showType: "trueNode",
              label: { x: node.position.x, y: node.position.y },
            },
          };
        } else if (type === "falseNode") {
          updatedNode = {
            ...node,
            data: {
              ...node.data,
              value: "false",
              showType: "falseNode",
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
        } else if (type === "attributeNode") {
          updatedNode = {
            ...node,
            data: {
              ...node.data,
              value: "false",
              showType: "attributeNode",
              label: { x: node.position.x, y: node.position.y },
            },
          };
        } else if (type === "setNode") {
          updatedNode = {
            ...node,
            data: {
              ...node.data,
              value: "set",
              showType: "setNode",
              label: { x: node.position.x, y: node.position.y },
            },
          };
        }
        return updatedNode;
      };
      const updatedNodes = [];
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
          if (type !== "valueNode" && type !== "paramNode" && type !== "attributeNode") {
            const onAddNodeId = getId();

            const onAddNodePosition = {
              x: 0,
              y: node.position.y + NODE_HEIGHT + GRID_PADDING,
            };

            const onAddNode = {
              id: onAddNodeId,
              position: onAddNodePosition,
              type: "customInputNode",
              data: {
                showType: "addNode",
                label: onAddNodePosition,
                id: onAddNodeId,
                parentNode: node.id,
              },
              draggable: false,
            };

            const edgesOnAdd = [
              {
                id: `e1-${onAddNodeId}`,
                source: node.id,
                target: onAddNodeId,
                animated: true,
                style: { stroke: "#FFAA9A" },
                type: "smoothstep",
              },
            ];
            const childrenCount = edges.filter(
              (edge) => edge.source === node.id
            ).length;
            if (childrenCount < 1) {
              setEdges([...edges, ...edgesOnAdd]);
              updatedNodes.push(onAddNode);
            }
          }
          updatedNodes.push(updateNode(node, type));
          setNodes(sortNode(updatedNodes));
        }
      }
    }
  };

  const focusNode = () => {
    const positionX = [];
    const positionY = [];
    const minMax = {
      minX: 0,
      maxX: 0,
      minY: 0,
      maxY: 0,
    };
    for (let i = 0; i < nodes.length; i++) {
      positionX.push(nodes[i].position.x);
      positionY.push(nodes[i].position.y);
    }

    minMax.minX = Math.min(...positionX);
    minMax.maxX = Math.max(...positionX);
    minMax.minY = Math.min(...positionY);
    minMax.maxY = Math.max(...positionY);

    const x = (minMax.minX + minMax.maxX) / 2;
    const y = (minMax.minY + minMax.maxY) / 2;
    let zoom = 1;
    if (nodes.length == 2) {
      zoom = 0.9;
    }
    if (nodes.length == 3) {
      zoom = 0.8;
    }
    if (nodes.length >= 4) {
      zoom = 0.7;
    }
    if (nodes.length >= 6) {
      zoom = 0.6;
    }
    if (nodes.length >= 8) {
      zoom = 0.4;
    }
    setCenter(x, y, { zoom, duration: 1000 });
  };

  const handleEdgesChange = (changes: NodeChange[]) => {
    console.log(changes);
    changes.forEach((element) => {
      console.log("here", element);
    });
    // onEdgesChange(changes);
  };

  const handleNodesChange = (changes: NodeChange[]) => {
    changes.forEach((element) => {
      if (element.type === "remove") {
        const nodeIndex = nodes.findIndex((node) => node.id === element.id);
        console.log("-------------here", element);
        console.log("--1", element.id);
        console.log("--2", element.id);
        const cloneUpdatedNodes = [...nodes];
        console.log(cloneUpdatedNodes);
        cloneUpdatedNodes[nodeIndex] = {
          ...nodes[nodeIndex],
          data: {
            ...nodes[nodeIndex].data,
            showType: "addNode",
          },
        };
        setUpdatedNodes(cloneUpdatedNodes);
      }
      if (element.type !== "remove") {
        onNodesChange(changes);
      }
    });
    // onNodesChange(changes);
  };

  useEffect(() => {
    if (nodes.length > 1 && nodes.length < 10) {
      focusNode();
    }
  }, [nodes]);

  useEffect(() => {
    if (nodes.length > 1) {
      getDataFromNode();
    }
  }, [nodes, setNodes]);

  useEffect(() => {
    setSelectedAttribute(nodes[0].data.dataType);
    if (nodes[0].data.value && nodes.length < 2 && createFirstNode) {
      setCreateFirstNode(false);
      const onAddId = getId();
      const nodeOnAdd = {
        id: onAddId,
        position: { x: 0, y: 150 },
        type: "customInputNode",
        data: {
          showType: "addNode",
          label: { x: 0, y: 100 },
          id: onAddId,
          parentNode: 1,
        },
        draggable: false,
      };

      const edgesOnAdd = [
        {
          id: `e1-${onAddId}`,
          source: "1",
          target: onAddId,
          animated: true,
          style: { stroke: "#FFAA9A" },
          type: "smoothstep",
        },
      ];

      setNodes([...nodes, nodeOnAdd]);
      setEdges([...edges, ...edgesOnAdd]);
    }
  }, [nodes[0].data.value]);

  useEffect(() => {
    if (createFirstNode) {
      console.log("yo");
    }
  }, [createFirstNode]);

  const getDataFromNode = () => {
    const transformData = (nodes) => {
      const result = {};

      for (let i = 0; i < nodes.length; i++) {
        for (let j = 0; j < nodes.length; j++) {
          if (
            nodes[i].id === nodes[j].data.parentNode &&
            nodes[i].data.showType === "setNode" &&
            nodes[j].data.showType === "valueNode"
          ) {
            nodes[j].data.isSet = true;
          } else if (
            nodes[i].id === nodes[j].data.parentNode &&
            (nodes[i].data.showType === "increaseNode" ||
              nodes[i].data.showType === "decreaseNode") &&
            nodes[j].data.showType === "valueNode"
          ) {
            nodes[j].data.isSet = false;
          }
        }

        if (nodes[i].data.showType === "valueNode") {
          nodes[i].data.dataType = nodes[0].data.dataType
          console.log("1", nodes[i].data.dataType);
        }

        if (nodes[i].data.showType === "paramNode") {
          nodes[i].data.dataType = nodes[0].data.dataType
          console.log("1", nodes[i].data.dataType);
        }

        if (nodes[i].data.showType === "selectAttributeNode") {
          console.log("x");
          result.type = "meta_function";
          result.functionName =
            nodes[i].data.dataType === "float"
              ? "SetFloat"
              : nodes[i].data.dataType === "number"
                ? "SetNumber"
                : nodes[i].data.dataType === "boolean"
                  ? "SetBoolean"
                  : "SetString";
          result.attributeName = {
            type: "constant",
            dataType: "string",
            value: nodes[i].data.value,
          };
        } else if (
          nodes[i].data.showType === "increaseNode" ||
          nodes[i].data.showType === "decreaseNode" ||
          nodes[i].data.showType === "addNode"
        ) {
          result.value1 = {
            type:
              nodes[i].data.showType === "addNode"
                ? "addNode"
                : "math_operation",
            value:
              nodes[i].data.showType === "increaseNode"
                ? "+"
                : nodes[i].data.showType === "decreaseNode"
                  ? "-"
                  : "=",
            left: {
              type: "meta_function",
              functionName:
                result.functionName === "SetFloat"
                  ? "GetFloat"
                  : result.functionName === "SetNumber"
                    ? "GetNumber"
                    : result.functionName === "SetBoolean"
                      ? "GetBoolean"
                      : "GetString",
              attributeName: {
                type: "constant",
                dataType: "string",
                value: result.attributeName.value,
              },
            },
            right: {},
          };
        } else if (
          nodes[i].data.showType === "valueNode" &&
          nodes[i].data.isSet === true
        ) {
          result.value1 = {
            type: "constant",
            dataType: nodes[i].data.dataType,
            value: nodes[i].data.value,
          };
        } else if (
          nodes[i].data.showType === "valueNode" &&
          nodes[i].data.isSet === false
        ) {
          result.value1.right = {
            type: "constant",
            dataType: nodes[i].data.dataType,
            value: nodes[i].data.value,
          };
        } else if (nodes[i].data.showType === "paramNode") {
          result.value1 = {
            type: "param_function",
            functionName: nodes[i].data.dataType === "float" ? "GetFloat" : nodes[i].data.dataType === "number" ? "GetNumber" : nodes[i].data.dataType === "boolean" ? "GetBoolean" : "GetString",
            attributeName: {
              type: "constant",
              dataType: nodes[i].data.dataType,
              value: nodes[i].data.value,
            }

          };
        } else if (nodes[i].data.showType === "attributeNode") {
          result.value1 = {
            type: "meta_function",
            functionName: nodes[i].data.dataType === "float" ? "GetFloat" : nodes[i].data.dataType === "number" ? "GetNumber" : nodes[i].data.dataType === "boolean" ? "GetBoolean" : "GetString",
            attributeName: {
              type: "constant",
              dataType: nodes[i].data.dataType,
              value: nodes[i].data.value,
            }
          }
        }
      }

      console.log("----result", result);
      return result;
    };

    const object = Factory.createObject(transformData(nodes)).toString();
    console.log("--->obj", transformData(nodes))
    setMetaData(object);
    return object;
  };

  const sortNode = (nodes) => {
    const nodeSort = nodes.sort((a, b) => {
      const idA = parseInt(a.id);
      const idB = parseInt(b.id);

      if (idA < idB) return -1;
      if (idA > idB) return 1;
      return 0;
    });

    return nodeSort;
  };


  const [actionName, setactionName] = useState("")
  const FindSchemaCode = async () => {
    const apiUrl = `https://six-gen2-studio-nest-backend-api-traffic-gateway-1w6bfx2j.ts.gateway.dev/schema/get_schema_info/${getSCHEMA_CODE()}`; // Replace with your API endpoint
    const params = {
    };
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${getAccessTokenFromLocalStorage()}`,
    }
    // Make a GET request with parameters
    await axios.get(apiUrl, {
      params: params, // Pass parameters as an object
      headers: headers, // Pass headers as an object
    })
      .then((response) => {
        // Handle successful response here
        console.log('Response:', response.data);
        setactionName(response.data.data.schema_info.schema_info.onchain_data.actions[0].name)

      })
      .catch((error) => {
        // Handle errors here
        console.error('Error:', error);
      });
  }


  const saveAction = async () => {
    const apiUrl = 'https://six-gen2-studio-nest-backend-api-traffic-gateway-1w6bfx2j.ts.gateway.dev/schema/set_actions'; // Replace with your API endpoint
    const requestData = {
      "payload": {
        "schema_code": getSCHEMA_CODE(),
        "update_then": true,
        "name": getActionName(),
        "then": [metaData],
      }
    };

    await axios.post(apiUrl, requestData, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${getAccessTokenFromLocalStorage()}`,  // Set the content type to JSON
        // Add any other headers your API requires
      },
    })
      .then(response => {
        console.log('API Response saveOnchainCollectionAttributes :', response.data);
        console.log("Request :", requestData)
        // You can handle the API response here
      })
      .catch(error => {
        console.error('API Error:', error);
        // Handle errors here
      });

  }

  useEffect(() => {
    FindSchemaCode()
  }, [])

  const navigate = useNavigate();

  return (
    <div className="flex justify-between w-full">
      <div>
        <div className="w-[885px] h-16 overflow-scroll	">
          <SyntaxHighlighter
            language="go"
            wrapLongLines={true}
            codeTagProps={{
              style: {
                fontSize: "16px",
                lineHeight: "1",
              },
            }}
          >
            {metaData}
          </SyntaxHighlighter>
        </div>
        <div style={{ height: 536, width: 900 }}>
          <div ref={reactFlowWrapper} className="h-full">
            <ReactFlow
              nodes={nodes}
              edges={edges}
              nodeTypes={nodeTypes}
              onEdgesChange={handleEdgesChange}
              onNodesChange={handleNodesChange}
              onConnect={onConnect}
              onInit={onInit}
              onDrop={onDrop}
              onDragOver={onDragOver}
              fitView
              nodeOrigin={nodeOrigin}
            >
              <Controls position="top-left" />
              <MiniMap position="top-right"></MiniMap>
            </ReactFlow>
          </div>
        </div>

        <div>
          <div className="flex justify-center" onClick={async () => { await saveAction()  ; console.log(metaData) ;navigate("/newintregation/beginer") }}>
            <NormalButton BorderRadius={0} FontSize={32} TextTitle={"SAVE"}></NormalButton>
          </div>
          <button onClick={()=>console.log(nodes)}>log</button>
          <button onClick={()=>console.log(edges)}>log edges</button>
        </div>
      </div>
      <Flowbar selectedAttribute={selectedAttribute}></Flowbar>
    </div>
  );
};

export default function NewIntregationThenAttribute() {
  const [isShow, setIsShow] = React.useState(false);

  return (
    <div className="w-full flex justify-center ">
      <div className="w-full h-full fixed  flex justify-center items-center bg-gradient-24  from-white to-[#7A8ED7]">
        <div className="w-[1280px] h-[832px] bg-gradient-24 to-gray-700 from-gray-300 rounded-2xl flex justify-between p-4 shadow-lg shadow-black/20 dark:shadow-black/40">
          <div className="w-full h-full px-[20px]">
            <div className="flex justify-between">
              <div>
                <Stepper2 ActiveStep={6}></Stepper2>
                <div className="w-[931px] h-[1px] bg-[#D9D9D9]"></div>
              </div>
              <Conectwalet></Conectwalet>
            </div>
            <div className="mt-[20px] flex flex-col items-center justify-center">
              <ReactFlowProvider>
                <BasicFlow />
              </ReactFlowProvider>
            </div>
          </div>
          <Tooltip title={"help"}>
            <div
              onClick={() => {
                setIsShow(true);
              }}
              className=" z-[51] w-[50px] h-[50px] rounded-full bg-transparent  hover:bg-slate-200 flex justify-center items-center absolute text-[50px] mt-[750px] ml-[1180px] cursor-pointer hover:scale-150 hover:text-[#262f50] duration-500"
            >
              ?
            </div>
          </Tooltip>
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
