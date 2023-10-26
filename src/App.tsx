import React, { useEffect, useState } from 'react';
// import AppRouter from './component/AppRouter'
import './App.css'
import {
  createBrowserRouter,
  Route,
  RouterProvider,
} from "react-router-dom";
import { Button } from '@mui/material'
import Conectwalet from './component/Connectwallet'
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
import { getAccessTokenFromLocalStorage, getRefreshTokenFromLocalStorage, isAccessTokenExpired, saveTokensToLocalStorage } from './helpers/AuthService.tsx';
import axios from 'axios';
import { useAppDispatch } from './store/store.ts';
import { useSelector } from 'react-redux';
import {
  walletcounterSelector,
  setisloggin,
  setAddress,
  setBalance,
  setLoading,
} from "./store/slices/walletcounterSlice.ts";
import { StargateClient } from '@cosmjs/stargate';
import NewIntregationThen from './Pages/NewIntregationThen.tsx';
import NewIntregationThenAttribute from './Pages/NewIntregationThenAttribute.tsx';
import NewIntregationThenTransfer from './Pages/NewIntregationThenTransfer.tsx';
import NewIntregationThenTransform from './Pages/NewintregationThenTransform.tsx';
import NewIntregationThenTransformStatic from './Pages/NewIntregationThenTransformStatic.tsx';
import NewIntregationThenTransformDynamic from './Pages/NewIntregationThenTransformDynamic.tsx';
import DraftAttributes from './Pages/DraftAttributes.tsx';
import DraftActions from './Pages/DraftActions.tsx';
import DraftDeployment from './Pages/DraftDeployment.tsx';
import Testto from './Pages/Testto.tsx';
import DraftEditActionsWhen from './Pages/DraftEditActionsWhen.tsx';
import DraftEditActionsThen from './Pages/DraftEditActionsThen.tsx';
import DraftEditActionsThenAttribute from './Pages/DraftEditActionsThenAttribute.tsx';



export const ABCDE = () => {
  console.log("ABC")
}


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
    path: "testflow",
    element: <Newintregationb2copy></Newintregationb2copy>
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
    path: "/draft/attributes/:schema_revision",
    element: <DraftAttributes></DraftAttributes>
  },
  {
    path: "/draft/actions/:schema_revision",
    element: <DraftActions></DraftActions>
  },
  {
    path: "/draft/deployment/:schema_revision",
    element: <DraftDeployment/>
  },
  {
    path: "/draft/actions/edit/when/:action_name/:meta_function/:schema_revision",
    element: <DraftEditActionsWhen/>
  },
  {
    path: "/draft/actions/edit/then/:action_name/:meta_function/:schema_revision",
    element: <DraftEditActionsThen/>
  },
  {
    path: "/draft/actions/edit/then/attribute/:action_name/:meta_function/:schema_revision",
    element: <DraftEditActionsThenAttribute/>
  },
  {
    path: "/testto",
    element: <Testto/>
  },
]);

function App() {

  //Redux
  const dispatch = useAppDispatch();
  const walletcounterReducer = useSelector(walletcounterSelector);

  const [chainId, setChainId] = useState("fivenet");
  const [token, setToken] = useState("usix");
  const [rpcEndpoint, setRpcEndpoint] = useState(
    "https://rpc1.fivenet.sixprotocol.net/"
  );
  const [exponent, setExponent] = useState(1e6);

  const [cosmosAddress, setCosmosAddress] = useState("");

  const HandlerKeplrConnect = async () => { //<--Get cosmos address <--
    if (window.keplr) {
      dispatch(setLoading(true))
      // setisLoading(true);
      // Unlock the wallet.
      await window.keplr.enable(chainId);
      // Use offlineSigner to get first wallet and public key.
      // Currently only first address is supported.
      const offlineSigner = await window.getOfflineSigner(chainId);
      const keplrAccounts = await offlineSigner.getAccounts();
      // Set state value as first address.
      // console.log("KEPL ADREESS :" + keplrAccounts[0].address);
      dispatch(setAddress(keplrAccounts[0].address));
      setCosmosAddress(keplrAccounts[0].address);
    } else {
      alert("Keplr extension is not installed.");
    }
  };

  const getKeplrBalance = async () => {
    // Use StargateClient and RPC because of its lightweight payloads and high performance.
    const client = await StargateClient.connect(rpcEndpoint);
    // Get balance as Coin.
    // Amount is the number of coins, while denom is the identifier of the coins.
    const balanceAsCoin = await client.getBalance(
      walletcounterReducer.cosmosaddress,
      token
    );
    const balance = (parseInt(balanceAsCoin.amount) * 1) / exponent;
    // Set state values.
    dispatch(setBalance(balance.toFixed(2)));
    dispatch(setLoading(false))
  };

  useEffect(() => {
    if (!(getAccessTokenFromLocalStorage() == null)) {

      console.log("have access token")
      HandlerKeplrConnect();

    }
  }, [])

  useEffect(() => {
    getKeplrBalance();

  }, [cosmosAddress]);

  setTimeout(() => {
    if (isAccessTokenExpired()) {
      const apiUrl = 'https://six-gen2-studio-backend-traffic-workers-oxdveggapq-as.a.run.app/auth/refreshToken'; // Replace with your API endpoint
      const requestData = {
        "refresh_token": `${getRefreshTokenFromLocalStorage()}`,
      };
      axios.post(apiUrl, requestData, {
        headers: {
          // Set the content type to JSON
          'Authorization': `Bearer ${getAccessTokenFromLocalStorage()}`,
          // Add any other headers your API requires
        },
      })
        .then(response => {
          console.log('API Response from refresh :', response.data);
          saveTokensToLocalStorage(response.data.data.access_token, response.data.data.refresh_token)
          const accessToken = getAccessTokenFromLocalStorage();
          const refreshToken = getRefreshTokenFromLocalStorage();
          console.log("New Access: ", accessToken)
          console.log("New Refresh: ", refreshToken)
        })
        .catch(error => {
          console.error('API Error:', error);
          // Handle errors here
        });
    }
  }, 300000);



  return (
    <RouterProvider router={router} />
  )
}

export default App
