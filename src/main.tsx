import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { ChakraProvider } from '@chakra-ui/react'
import {store} from './store/store.ts'
import { Provider, useSelector } from 'react-redux'
import ReactFlow from 'reactflow';
import 'reactflow/dist/style.css';
import { walletcounterSelector } from './store/slices/walletcounterSlice.ts'

import {
  createBrowserRouter,
  Route,
  RouterProvider,
} from "react-router-dom";
import Connect from './Pages/Connect.tsx'
import Root from "./routes/root";
import Home from './Pages/Home.tsx'

import NewIntregation1 from './Pages/Newintregation1.tsx'
import NewIntregation2 from './Pages/Newintregation2.jsx';
import NewIntregation3 from './Pages/Newintregation3.jsx';
import NewIntregation4 from './Pages/Newintregation4.jsx';
import NewIntregation5 from './Pages/Newintregation5.jsx';
import NewIntregation6 from './Pages/Newintregation6.jsx';
import NewIntregation7 from './Pages/Newintregation7.jsx';
import Test from './component/TEST/Test.tsx'
import Page1 from './component/TEST/Page1.tsx'
import Test2 from './component/TEST/Test2.tsx'
import Test3 from './component/TEST/Test3.tsx'
import Newintregation8 from './Pages/Newintregation8.tsx'
import Newintregation9 from './Pages/Newintregation9.tsx'
import Newintregationb from './Pages/Newintregationb.tsx'
import Newintregationb1 from './Pages/Newintregationb1.tsx'
import Newintregationb2 from './Pages/Newintregationb2.tsx'
import Newintregationb3 from './Pages/Newintregationb3.tsx'
import CollisionDetectionFlow from './component/TEST/CollisionDetectionFlow.tsx'
import Newintregationb4 from './Pages/Newintregationb4.tsx'
import Newintregationb2copy from './Pages/Newintregationb2copy.tsx'
import NewIntregationThenAttribute from './Pages/NewIntregationThenAttribute.tsx'
import NewIntregationThenTransfer from './Pages/NewIntregationThenTransfer.tsx'
import NewIntregationThenTransform from './Pages/NewintregationThenTransform.tsx'
import NewIntregationThenTransformDynamic from './Pages/NewintregationThenTransformDynamic.tsx'
import NewIntregationThenTransformStatic from './Pages/NewIntregationThenTransformStatic.tsx'
import NewIntregationThen from './Pages/NewIntregationThen.tsx'
const user = false ;



const router = createBrowserRouter([
  {
    path: "/",
    element: <Home></Home>,
  },
  {
    path: "/connect",
    element: <Connect></Connect>,
  },
  {
    path: "/newintregation/1",
    element: <NewIntregation1></NewIntregation1>,
  },
  {
    path: "/newintregation/2",
    element: <NewIntregation2></NewIntregation2>,
  },
  {
    path: "/newintregation/3",
    element: <NewIntregation3></NewIntregation3>,
  },
  {
    path: "/newintregation/4",
    element: <NewIntregation4></NewIntregation4>
  },
  {
    path: "/newintregation/5",
    element: <NewIntregation5></NewIntregation5>
  },
  {
    path: "/newintregation/6",
    element: <NewIntregation6></NewIntregation6>
  },
  {
    path: "/newintregation/7",
    element: <NewIntregation7></NewIntregation7>
  },
  {
    path: "/test",
    element: <Test></Test>
  },
  {
    path: "/test2",
    element: <Test2></Test2>
  },
  {
    path: "/test3",
    element: <Test3></Test3>
  },
  {
    path: "/newintregation/8",
    element: <Newintregation8></Newintregation8>
  },
  {
    path: "/newintregation/9",
    element: <Newintregation9></Newintregation9>
  },
  {
    path: "/newintregation/beginer",
    element: <Newintregationb></Newintregationb>
  },
  {
    path: "/newintregation/beginer/1",
    element: <Newintregationb1></Newintregationb1>
  },
  {
    path: "/newintregation/beginer/2",
    element: <Newintregationb2></Newintregationb2>
  },
  {
    path: "/newintregation/beginer/3",
    element: <Newintregationb3></Newintregationb3>
  },
  {
    path: "/newintregation/beginer/4",
    element: <Newintregationb4></Newintregationb4>
  },
  {
    path: "/newintregation/beginer/then",
    element: <NewIntregationThen></NewIntregationThen>
  },
  {
    path: "/newintregation/beginer/then/attribute",
    element: <NewIntregationThenAttribute></NewIntregationThenAttribute>
  },
  {
    path: "/newintregation/beginer/then/transfer",
    element: <NewIntregationThenTransfer></NewIntregationThenTransfer>
  },
  {
    path: "/newintregation/beginer/then/transform",
    element: <NewIntregationThenTransform></NewIntregationThenTransform>
  },
  {
    path: "/newintregation/beginer/then/transform/static",
    element: <NewIntregationThenTransformStatic></NewIntregationThenTransformStatic>
  },
  {
    path: "/newintregation/beginer/then/transform/dynamic",
    element: <NewIntregationThenTransformDynamic></NewIntregationThenTransformDynamic>
  },
  {
    path: "testflow",
    element: <Newintregationb2copy></Newintregationb2copy>
  },

]);

ReactDOM.createRoot(document.getElementById('root')!).render(

  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>,

)
