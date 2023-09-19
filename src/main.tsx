import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { ChakraProvider } from '@chakra-ui/react'
import {store} from './store/store.ts'
import { Provider } from 'react-redux'
import ReactFlow from 'reactflow';
import 'reactflow/dist/style.css';

import {
  createBrowserRouter,
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
import Newintregation10 from './Pages/Newintregation10.tsx'
import Newintregation11 from './Pages/Newintregation11.tsx'

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
    path: "/newintregation/10",
    element: <Newintregation10></Newintregation10>
  },
  {
    path: "/newintregation/10",
    element: <Newintregation10></Newintregation10>
  },
  {
    path: "/newintregation/11",
    element: <Newintregation11></Newintregation11>
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(

  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>,

)
