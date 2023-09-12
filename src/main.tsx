import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { ChakraProvider } from '@chakra-ui/react'
import {store} from './store/store.ts'
import { Provider } from 'react-redux'

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Connect from './component/Connect.tsx'
import Root from "./routes/root";
import Home from './component/Home.tsx'
import About from './component/About.tsx'
import NewIntregation1 from './component/Newintregation1.tsx'
import NewIntregation2 from './component/Newintregation2.jsx';
import NewIntregation3 from './component/Newintregation3.jsx';
import NewIntregation4 from './component/Newintregation4.jsx';
import NewIntregation5 from './component/Newintregation5.jsx';
import NewIntregation6 from './component/Newintregation6.jsx';
import NewIntregation7 from './component/Newintregation7.jsx';
import Test from './component/Test.tsx'
import Page1 from './component/Page1.tsx'
import Test2 from './component/Test2.tsx'
import Test3 from './component/Test3.tsx'

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home></Home>,
  },
  {
    path: "/about",
    element: <About></About>,
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
]);

ReactDOM.createRoot(document.getElementById('root')!).render(

  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>,

)
