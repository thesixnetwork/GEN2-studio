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

const user = false ;

ReactDOM.createRoot(document.getElementById('root')!).render(

  <React.StrictMode>
    <Provider store={store}>
     <App/>
    </Provider>
  </React.StrictMode>,

)
