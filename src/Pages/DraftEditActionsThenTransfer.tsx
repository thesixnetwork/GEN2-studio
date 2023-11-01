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
  NodeOrigin,
} from "reactflow";
import "reactflow/dist/base.css";
import { Factory } from "../function/ConvertObjectToMetadata/Factory";
import Flowbar from "../component/ReactFlow/Then/Flowbar";
import Customnode from "../component/node/Customnode";
import InputNode from "../component/ReactFlow/Then/CustomNode/InputNode";

import SyntaxHighlighter from "react-syntax-highlighter";

import { useParams } from "react-router-dom";
import parser_then from "../function/ConvertMetadataToObject/action_then";

import {
  Tree,
  adjustParents,
  adjustTreePosition,
  drawTree,
  generateTreeFromReactFlow,
} from "../function/auto-layout";
import NormalButton from "../component/NormalButton";
import { useNavigate } from "react-router-dom";
import {
  getAccessTokenFromLocalStorage,
  getActionName,
  getSCHEMA_CODE,
  saveSCHEMA_CODE,
} from "../helpers/AuthService";
import axios from "axios";

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
  const param = useParams();
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
  const [createFirstNode, setCreateFirstNode] = useState(true);
  const navigate = useNavigate();
  const [isDraft, setIsDraft] = useState(false);
  const [actionData, setActionData] = useState();
  const [actionThenArr, setActionThenArr] = useState([]);
  const [actionThenIndex, setActionThenIndex] = useState(null);

  const nodeWidthAndHeight = {
    width: 150,
    height: 57,
    width_input: 151.2,
    height_input: 35.2,
    grid_padding: 60,
  };

  const isBase64 = (str) => {
    try {
      return btoa(atob(str)) === str;
    } catch (error) {
      return false;
    }
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
          if (
            type !== "valueNode" &&
            type !== "paramNode" &&
            type !== "attributeNode"
          ) {
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

  const createToAmountNodes = () =>{
    const positionLeftNode = {
      x: nodes[0].position.x - nodeWidthAndHeight.width,
      y:
        nodes[0].position.y +
        nodeWidthAndHeight.height +
        nodeWidthAndHeight.grid_padding,
    };
    const positionRightNode = {
      x: nodes[0].position.x + nodeWidthAndHeight.width,
      y:
        nodes[0].position.y +
        nodeWidthAndHeight.height +
        nodeWidthAndHeight.grid_padding,
    };
    const positionLeftBottomNode = {
      x: nodes[0].position.x - nodeWidthAndHeight.width,
      y:
        (nodes[0].position.y +
          nodeWidthAndHeight.height +
          nodeWidthAndHeight.grid_padding) *
        2,
    };
    const positionRightBottomNode = {
      x: nodes[0].position.x + nodeWidthAndHeight.width,
      y:
        (nodes[0].position.y +
          nodeWidthAndHeight.height +
          nodeWidthAndHeight.grid_padding) *
        2,
    };
    const leftId = getId();
    const rightId = getId();
    const leftBottomId = getId();
    const rightBottomId = getId();

    const leftNode = {
      id: leftId,
      position: positionLeftNode,
      type: "customInputNode",
      data: {
        showType: "toNode",
        label: positionLeftNode,
        id: leftId,
        parentNode: nodes[0].id,
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
        showType: "amountNode",
        label: positionRightNode,
        id: rightId,
        parentNode: nodes[0].id,
        width: nodeWidthAndHeight.width,
        height: nodeWidthAndHeight.height,
      },
      draggable: false,
    };
    const leftBottomNode = {
      id: leftBottomId,
      position: positionLeftBottomNode,
      type: "customInputNode",
      data: {
        showType: "addNode",
        label: positionLeftBottomNode,
        id: leftBottomId,
        parentNode: leftId,
        width: nodeWidthAndHeight.width,
        height: nodeWidthAndHeight.height,
      },
      draggable: false,
    };
    const rightBottomNode = {
      id: rightBottomId,
      position: positionRightBottomNode,
      type: "customInputNode",
      data: {
        showType: "addNode",
        label: positionRightBottomNode,
        id: rightBottomId,
        parentNode: rightId,
        width: nodeWidthAndHeight.width,
        height: nodeWidthAndHeight.height,
      },
      draggable: false,
    };

    const newEdges = [
      {
        id: `e1-${leftId}`,
        source: nodes[0].id,
        target: leftId,
        animated: true,
        style: { stroke: "#FFAA9A" },
        type: "smoothstep",
      },
      {
        id: `e1-${rightId}`,
        source: nodes[0].id,
        target: rightId,
        animated: true,
        style: { stroke: "#FFAA9A" },
        type: "smoothstep",
      },
      {
        id: `e${leftId}-${leftBottomId}`,
        source: leftId,
        target: leftBottomId,
        animated: true,
        style: { stroke: "#FFAA9A" },
        type: "smoothstep",
      },
      {
        id: `e${rightId}-${rightBottomId}`,
        source: rightId,
        target: rightBottomId,
        animated: true,
        style: { stroke: "#FFAA9A" },
        type: "smoothstep",
      },
    ];

    setEdges([...edges, ...newEdges]);
    updatedNodes.push(leftNode, rightNode, leftBottomNode, rightBottomNode);
    setNodes(updatedNodes);
  }
  

  const FindSchemaCode = async () => {
    const apiUrl = `https://six-gen2-studio-nest-backend-api-traffic-gateway-1w6bfx2j.ts.gateway.dev/schema/get_schema_info/${param.schema_revision}`;
    const params = {};
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getAccessTokenFromLocalStorage()}`,
    };
    await axios
      .get(apiUrl, {
        params: params,
        headers: headers,
      })
      .then((response) => {
        setActionData(
          response.data.data.schema_info.schema_info.onchain_data.actions
        );
      })
      .catch((error) => {
        console.error("Error:", error);
      });
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
    const zoom = 1;
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

  const getDataFromNode = () => {
    const transformData = (nodes) => {
      let result = {};

      for (let i = 0; i < nodes.length; i++) {
        if (nodes[i].data.showType === "valueNode") {
          nodes[i].data.dataType = nodes[0].data.dataType;
          console.log("1", nodes[i].data.dataType);
        }

        if (nodes[i].data.showType === "paramNode") {
          nodes[i].data.dataType = nodes[0].data.dataType;
          console.log("1", nodes[i].data.dataType);
        }

        if (nodes[i].data.showType === "selectAttributeNode") {
          result.type = "meta_function";
          result.functionName = "TransferNumber";
          result.attributeName = {
            type: "constant",
            dataType: "string",
            value: nodes[i].data.value,
          };
        } else if (
          nodes[i].data.showType === "valueNode" ||
          nodes[i].data.showType === "attributeNode"
        ) {
          {
            nodes[i].id === "4"
              ? (result.value1 = {
                  type: "meta_function",
                  functionName: "GetString",
                  attributeName: {
                    type: "constant",
                    dataType: "string",
                    value: nodes[i].data.value,
                  },
                })
              : (result.value2 = {
                  type: "meta_function",
                  functionName: "GetNumber",
                  attributeName: {
                    type: "constant",
                    dataType: "string",
                    value: nodes[i].data.value,
                  },
                });
          }
        } else if (nodes[i].data.showType === "paramNode") {
          {
            nodes[i].id === "4"
              ? (result.value1 = {
                  type: "param_function",
                  functionName: "GetString",
                  attributeName: {
                    type: "constant",
                    dataType: "string",
                    value: nodes[i].data.value,
                  },
                })
              : (result.value2 = {
                  type: "param_function",
                  functionName: "GetNumber",
                  attributeName: {
                    type: "constant",
                    dataType: "string",
                    value: nodes[i].data.value,
                  },
                });
          }
        }
      }

      console.log("----result", result);
      return result;
    };

    const object = Factory.createObject(transformData(nodes)).toString();
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

  const saveAction = async () => {
    actionThenArr[actionThenIndex] = metaData;
    console.log("arr= ", actionThenArr);
    const apiUrl =
      "https://six-gen2-studio-nest-backend-api-traffic-gateway-1w6bfx2j.ts.gateway.dev/schema/set_actions"; // Replace with your API endpoint
    const requestData = {
      payload: {
        schema_code: param.schema_revision,
        update_then: false,
        name: param.action_name,
        then: actionThenArr,
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

  const convertObjectToNode = (outputObj) => {
    setIsDraft(true);
    console.log("-->out", outputObj);
    const tempNodeArray = [];
    const tempEdgeArray = [];
    const processNode = (node, parentNode = null, parentPositionY = 0) => {
        const nodeId = tempNodeArray.length + 1;

        const newNode = {
            width: 150,
            height: 57,
            id: nodeId.toString(),
            type: "customInputNode",
            position: { x: 0, y: parentPositionY },
            draggable: false,
            data: {
                showType: "",
                id: nodeId.toString(),
                parentNode: parentNode,
                label: { x: 0, y: parentPositionY },
                value: "",
                dataType: "",
            },
            positionAbsolute: { x: 0, y: parentPositionY },
        };

        tempNodeArray.push(newNode);

        if (node.attributeName) {
            newNode.data.showType = "selectAttributeNode";
            newNode.data.value = node.attributeName.value;
            newNode.data.dataType = node.attributeName.dataType;
        }

        if (node.value1) {
            const toNode = {
                width: 150,
                height: 57,
                id: (nodeId + 1).toString(),
                type: "customInputNode",
                position: { x: -150, y: parentPositionY + 150 },
                draggable: false,
                data: {
                    showType: "toNode",
                    id: (nodeId + 1).toString(),
                    parentNode: nodeId.toString(),
                    label: { x: 0, y: parentPositionY + 150 },
                    value: "toNode",
                    dataType: "toNode",
                },
            };

            if (node.value1.type === "param_function") {
                const paramNode = {
                    width: 150,
                    height: 57,
                    id: (nodeId + 2).toString(),
                    type: "customInputNode",
                    position: { x: -150, y: parentPositionY + 300 },
                    draggable: false,
                    data: {
                        showType: "paramNode",
                        id: (nodeId + 2).toString(),
                        parentNode: (nodeId + 1).toString(),
                        label: { x: -150, y: parentPositionY + 300 },
                        value: node.value1.attributeName.value,
                        dataType: node.value1.attributeName.dataType,
                    },
                };
                tempNodeArray.push(toNode, paramNode);
            } else {
                const attributeNode = {
                    width: 150,
                    height: 57,
                    id: (nodeId + 2).toString(),
                    type: "customInputNode",
                    position: { x: -150, y: parentPositionY + 300 },
                    draggable: false,
                    data: {
                        showType: "attributeNode",
                        id: (nodeId + 2).toString(),
                        parentNode: (nodeId + 1).toString(),
                        label: { x: -150, y: parentPositionY + 300 },
                        value: node.value1.attributeName.value,
                        dataType: node.value1.attributeName.dataType,
                    },
                };
                tempNodeArray.push(toNode, attributeNode);
            }

            const edge = {
                id: `e${nodeId}-${nodeId + 1}`,
                source: nodeId.toString(),
                target: (nodeId + 1).toString(),
                animated: true,
                style: { stroke: "#FFAA9A" },
                type: "smoothstep",
            };
            const edge2 = {
                id: `e${nodeId + 1}-${nodeId + 2}`,
                source: (nodeId + 1).toString(),
                target: (nodeId + 2).toString(),
                animated: true,
                style: { stroke: "#FFAA9A" },
                type: "smoothstep",
            };

            tempEdgeArray.push(edge, edge2);
        }

        if (node.value2) {
            const amountNode = {
                width: 150,
                height: 57,
                id: (nodeId + 3).toString(),
                type: "customInputNode",
                position: { x: 150, y: parentPositionY + 150 },
                draggable: false,
                data: {
                    showType: "amountNode",
                    id: (nodeId + 3).toString(),
                    parentNode: nodeId.toString(),
                    label: { x: 0, y: parentPositionY + 150 },
                    value: node.attributeName.value,
                    dataType: node.attributeName.dataType,
                },
            };

            if (node.value2.type === "param_function") {
                const paramNode = {
                    width: 150,
                    height: 57,
                    id: (nodeId + 4).toString(),
                    type: "customInputNode",
                    position: { x: 150, y: parentPositionY + 300 },
                    draggable: false,
                    data: {
                        showType: "paramNode",
                        id: (nodeId + 4).toString(),
                        parentNode: (nodeId + 3).toString(),
                        label: { x: 150, y: parentPositionY + 300 },
                        value: node.value2.attributeName.value,
                        dataType: node.value2.attributeName.dataType,
                    },
                };
                tempNodeArray.push(amountNode, paramNode);
            } else {
                const valueNode = {
                    width: 150,
                    height: 57,
                    id: (nodeId + 4).toString(),
                    type: "customInputNode",
                    position: { x: 150, y: parentPositionY + 300 },
                    draggable: false,
                    data: {
                        showType: "valueNode",
                        id: (nodeId + 4).toString(),
                        parentNode: (nodeId + 3).toString(),
                        label: { x: 150, y: parentPositionY + 300 },
                        value: node.value2.attributeName.value,
                        dataType: node.value2.attributeName.dataType,
                    },
                };
                tempNodeArray.push(amountNode, valueNode);
            }

            const edge = {
                id: `e${nodeId}-${nodeId + 3}`,
                source: nodeId.toString(),
                target: (nodeId + 3).toString(),
                animated: true,
                style: { stroke: "#FFAA9A" },
                type: "smoothstep",
            };
            const edge2 = {
                id: `e${nodeId + 3}-${nodeId + 4}`,
                source: (nodeId + 3).toString(),
                target: (nodeId + 4).toString(),
                animated: true,
                style: { stroke: "#FFAA9A" },
                type: "smoothstep",
            };

            tempEdgeArray.push(edge, edge2);
        }

        return nodeId;
    };

    processNode(outputObj);
    console.log("-->nodes", tempNodeArray);
    setNodes(tempNodeArray);
    setEdges(tempEdgeArray);
    return tempNodeArray;
};


  useEffect(() => {
    saveSCHEMA_CODE(param.schema_revision);
    console.log("param", param);
    const firstMetaData = param.meta_function;
    console.log("firstMetaData", firstMetaData);
    if (firstMetaData.startsWith("meta.TransferNumber")) {
      console.log("it's work");
      convertObjectToNode(parser_then.parse(firstMetaData));
      setMetaData(param.meta_function);
      console.log("metaData", metaData);
    }
  }, []);

  useEffect(() => {
    if (
      nodes[0].data.value &&
      nodes.length < 2 &&
      createFirstNode &&
      !isDraft
    ) {
      createToAmountNodes()
    }
  }, [nodes[0].data.value]);

  useEffect(() => {
    const convertFromBase64 = (str) => {
      console.log("str: ", str);
      return atob(str);
    };
    if (actionData !== undefined) {
      const getDataByName = (data, name) => {
        return data.find((item) => item.name === name);
      };
      if (isBase64(param.meta_function)) {
        const result = getDataByName(actionData, param.action_name);
        console.log("result: ", actionData);
        console.log("actionName: ", param.action_name);
        setActionThenArr(result.then);
        const index = actionThenArr.indexOf(
          convertFromBase64(param.meta_function)
        );
        console.log("--: ", index);
        setActionThenIndex(index);
      } else {
        const result = getDataByName(actionData, param.action_name);
        console.log("result: ", result);
        setActionThenArr(result.then);
        const index = actionThenArr.indexOf(param.meta_function);
        console.log("--: ", index);
        setActionThenIndex(index);
      }

      console.log("actionThenArr: ", actionThenArr);
    }
  }, [actionData]);

  useEffect(() => {
    FindSchemaCode();
  }, []);

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
            <button onClick={() => console.log(nodes)}>log node</button>
            <button onClick={() => console.log(edges)}>log edges</button>
          </div>
        </div>

        <div>
          <div
            className="flex justify-center"
            onClick={async () => {
              await saveAction();
              navigate(`/draft/actions/${param.schema_revision}`);
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
      <Flowbar selectedAttribute="none"></Flowbar>
    </div>
  );
};

export default function DraftEditActionsTransfer() {
  const [isShow, setIsShow] = React.useState(false);

  return (
    <div className="w-full flex justify-center ">
      <div className="w-full h-full fixed  flex justify-center items-center bg-gradient-24  from-white to-[#7A8ED7]">
        <div className="w-[1280px] h-[832px] bg-gradient-24 to-gray-700 from-gray-300 rounded-2xl flex justify-between p-4 shadow-lg shadow-black/20 dark:shadow-black/40">
          <div className="w-full h-full px-[20px]">
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
