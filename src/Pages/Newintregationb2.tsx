import React, { useEffect, useMemo } from "react";
import { Tooltip } from "@mui/material";
import Conectwalet from "../component/Connectwallet";
import Stepper2 from "../component/Stepper2";
import Darkbg from "../component/Alert/Darkbg";
import NextPageButton from "../component/NextPageButton";
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
  NodeChange,
} from "reactflow";
import "reactflow/dist/base.css";
import { Factory } from "../function/ConvertObjectToMetadata/Factory";
import Flowbar from "../component/ReactFlow/When/Flowbar";
import InputNode from "../component/ReactFlow/When/CustomNode/InputNode";

import {
  Tree,
  adjustParents,
  adjustTreePosition,
  drawTree,
  generateTreeFromReactFlow,
} from "../function/auto-layout/";
import { update } from "lodash";
import NormalButton from "../component/NormalButton";
import {
  getAccessTokenFromLocalStorage,
  getSCHEMA_CODE,
} from "../helpers/AuthService";
import axios from "axios";
import { useNavigate } from "react-router-dom";

// const nodeTypes = {
//   custom: Customnode,
//   customInputNode: InputNode,
// };

interface NodeProps {
  id: string;
  type: string;
  position: { x: number; y: number };
  draggable: boolean;
  data: {
    id: string;
    showType: string;
    value: string;
    dataType: string;
    label: { x: number; y: number };
  };
}

interface ResultProps {
  type: string | number | boolean;
  value: string | number | boolean;
  left?: ResultProps;
  right?: ResultProps;
  functionName?: string;
  dataType?: string;
  attributeName?: {
    type: string;
    dataType: string;
    value: string;
  };
}

let id = 2;

const getId = () => `${id++}`;

const nodeWidthAndHeight = {
  width: 150,
  height: 57,
  width_input: 151.2,
  height_input: 35.2,
  grid_padding: 60,
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
      width: nodeWidthAndHeight.width,
      height: nodeWidthAndHeight.height,
    },
  },
];

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
  const { setCenter } = useReactFlow();
  const [redraw, setRedraw] = useState(false);
  const [actionName, setactionName] = useState("");


  const onConnect = (params: Connection | Edge) =>
    setEdges((eds) => addEdge(params, eds));
  const onInit = (rfi: ReactFlowInstance) => setReactFlowInstance(rfi);

  const onDragOver = (event: DragEvent) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  };

  const getDataFromNode = () => {
    const tempArr: NodeProps[] = [];
    nodes.forEach((node) => {
      tempArr.push(node.data);
    });

    const transformData = (data: NodeProps, id: string) => {
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

          if (
            nodes[i].data.parentNode === nodes[j].data.parentNode &&
            nodes[i].data.showType === "paramNode" &&
            nodes[j].data.showType === "valueNode"
          ) {
            const dataType = nodes[j].data.value;
            console.log("1", nodes[i].data);
            if (dataType.includes(".")) {
              nodes[i].data.dataTypeFromValue = "float";
              nodes[j].data.dataType = "float";
            } else {
              const parsedValue = parseInt(dataType);
              if (!isNaN(parsedValue)) {
                nodes[i].data.dataTypeFromValue = typeof parsedValue;
                nodes[j].data.dataType = typeof parsedValue;
              } else if (
                dataType.toLowerCase() === "true" ||
                dataType.toLowerCase() === "false"
              ) {
                nodes[i].data.dataTypeFromValue = "boolean";
                nodes[j].data.dataType = "bool";
              } else {
                nodes[i].data.dataTypeFromValue = "string";
                nodes[j].data.dataType = "string";
              }
            }
            nodes[j].data.dataType === nodes[i].data.dataType;
          }
        }
      }
      const node = data.find((item) => item.id === id);
      if (!node) return null;

      const result: ResultProps = {};
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
          result.functionName = "GetBoolean";
        } else if (node.dataType === "string") {
          result.functionName = "GetString";
        } else if (node.dataType === "number") {
          result.functionName = "GetNumber";
        } else if (node.dataType === "float") {
          result.functionName = "GetFloat";
        }
        result.attributeName = {
          type: "constant",
          dataType: "string",
          value: node.value,
        };
      } else if (node.showType === "paramNode") {
        result.type = "meta_function";
        if (node.dataTypeFromValue === "boolean") {
          result.functionName = "GetBoolean";
        } else if (node.dataTypeFromValue === "string") {
          result.functionName = "GetString";
        } else if (node.dataTypeFromValue === "number") {
          result.functionName = "GetNumber";
        } else if (node.dataTypeFromValue === "float") {
          result.functionName = "GetFloat";
        }

        result.attributeName = {
          type: "param_function",
          functionName:
            node.dataType === "boolean"
              ? "GetBoolean"
              : node.dataType === "number"
              ? "GetNumber"
              : node.dataType === "float"
              ? "GetFloat"
              : "GetString",
          attributeName: {
            type: "constant",
            dataType: "string",
            value: node.value,
          },
        };
      } else if (node.showType === "valueNode") {
        result.type = "constant";
        result.dataType = node.dataType;
        result.value =
          node.dataType === "number"
            ? parseInt(node.value)
            : node.dataType === "float"
            ? parseFloat(node.value)
            : node.value.toLowerCase() === "true"
            ? true
            : node.value.toLowerCase() === "false"
            ? false
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
    setMetaData(object);
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
        // const halfWidth = width / 2;
        // const halfHeight = height / 2;

        // return (
        //   position.x >= startX - halfWidth &&
        //   position.x <= startX + halfWidth &&
        //   position.y >= startY - halfHeight &&
        //   position.y <= startY + halfHeight
        // );

        return (
          position.x >= startX &&
          position.x <= startX + width &&
          position.y >= startY &&
          position.y <= startY + height
        );
      };

      const updateNode = (node: NodeProps, type: string) => {
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
              width: nodeWidthAndHeight.width_input,
              height: nodeWidthAndHeight.height_input,
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
              width: nodeWidthAndHeight.width_input,
              height: nodeWidthAndHeight.height_input,
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
              width: nodeWidthAndHeight.width_input,
              height: nodeWidthAndHeight.height_input,
              dataTypeFromValue: "",
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

      const updatedNodes = [];
      let dropped = false;

      for (let i = 0; i < nodes.length; i++) {
        const node = nodes[i];

        if (
          !isInsideLength(
            mousePosition,
            node.position.x,
            node.position.y,
            node.data.width,
            node.data.height
          )
        ) {
          console.log(type);
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
                x: node.position.x + nodeWidthAndHeight.width,
                y:
                  node.position.y +
                  nodeWidthAndHeight.height +
                  nodeWidthAndHeight.grid_padding,
              };
              const positionRightNode = {
                x: node.position.x - nodeWidthAndHeight.width,
                y:
                  node.position.y +
                  nodeWidthAndHeight.height +
                  nodeWidthAndHeight.grid_padding,
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
                  width: nodeWidthAndHeight.width,
                  height: nodeWidthAndHeight.height,
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
                  width: nodeWidthAndHeight.width,
                  height: nodeWidthAndHeight.height,
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
              const childrenCount = edges.filter(
                (edge) => edge.source === node.id
              ).length;
              if (childrenCount < 2) {
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
      setRedraw(false);
      const treeNodes = generateTreeFromReactFlow(nodes, edges);

      const tree = new Tree(treeNodes);
      console.log("=>", tree)
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

  const handleEdgesChange = (changes: NodeChange[]) => {
    console.log(changes);
    changes.forEach((element) => {
      console.log("here-", element);
    });
    // onEdgesChange(changes);
  };

  const handleNodesChange = (changes: NodeChange[]) => {
    changes.forEach((element) => {
      if (element.type === "remove") {
        const nodeIndex = nodes.findIndex((node) => node.id === element.id);
        const cloneUpdatedNodes = [...nodes];
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
    if (nodes.length > 5) {
      zoom = 0.8;
    }
    if (nodes.length > 8) {
      zoom = 0.6;
    }
    if (nodes.length > 11) {
      zoom = 0.4;
    }
    setCenter(x, y, { zoom, duration: 1000 });
  };

  useEffect(() => {
    setNodes(updatedNodes);
    if (nodes.length > 1) {
      setTimeout(() => {
        focusNode();
      }, 100);
    }
  }, [updatedNodes]);

  useEffect(() => {
    if (nodes.length > 1) {
      getDataFromNode();
    }
  }, [nodes, setNodes]);

  const reset = () => {
    setNodes(initialNodes);
    setEdges([]);
    setUpdatedNodes(initialNodes);
    setMetaData("please add item");
  };

  const FindSchemaCode = async () => {
    const apiUrl = `https://six-gen2-studio-nest-backend-api-traffic-gateway-1w6bfx2j.ts.gateway.dev/schema/get_schema_info/${getSCHEMA_CODE()}`; // Replace with your API endpoint
    const params = {};
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getAccessTokenFromLocalStorage()}`,
    };
    // Make a GET request with parameters
    await axios
      .get(apiUrl, {
        params: params, // Pass parameters as an object
        headers: headers, // Pass headers as an object
      })
      .then((response) => {
        // Handle successful response here
        console.log("Response:", response.data);
        const Actions =
          response.data.data.schema_info.schema_info.onchain_data.actions;
        setactionName(
          response.data.data.schema_info.schema_info.onchain_data.actions[
            Actions.length - 1
          ].name
        );
        console.log(
          "actionName:",
          response.data.data.schema_info.schema_info.onchain_data.actions[0]
            .name
        );
      })
      .catch((error) => {
        // Handle errors here
        console.error("Error:", error);
      });
  };

  useEffect(() => {
    FindSchemaCode();
  }, []);

  const saveAction = async () => {
    const apiUrl =
      "https://six-gen2-studio-nest-backend-api-traffic-gateway-1w6bfx2j.ts.gateway.dev/schema/set_actions"; // Replace with your API endpoint
    const requestData = {
      payload: {
        schema_code: getSCHEMA_CODE(),
        name: actionName,
        when: metaData,
      },
    };

    await axios
      .post(apiUrl, requestData, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getAccessTokenFromLocalStorage()}`, // Set the content type to JSON
          // Add any other headers your API requires
        },
      })
      .then((response) => {
        console.log(
          "API Response saveOnchainCollectionAttributes :",
          response.data
        );
        console.log("Request :", requestData);
        // You can handle the API response here
      })
      .catch((error) => {
        console.error("API Error:", error);
        // Handle errors here
      });
  };

  const navigate = useNavigate();

  return (
    <div>
      <Flowbar metaData={metaData}></Flowbar>
      <div style={{ height: 500, width: 1200 }}>
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
          >
            <Controls position="top-left" />
            <MiniMap position="top-right"></MiniMap>
          </ReactFlow>
        </div>
        {/* <SyntaxHighlighter language="javascript">{metaData}</SyntaxHighlighter> */}
        <div>
          <div className="flex justify-center">
            <button onClick={()=>console.log(edges)}>log</button>
            <div
              onClick={async () => {
                await getDataFromNode();
                await saveAction();
                navigate("/newintregation/beginer/");
              }}
            >
              <NormalButton
                BorderRadius={0}
                FontSize={32}
                TextTitle={"SAVE"}
              ></NormalButton>
            </div>
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
``;
