import React, { useEffect, useState } from 'react';
// import AppRouter from './component/AppRouter'
import './App.css'
import {
  createBrowserRouter,
  Route,
  RouterProvider,
} from "react-router-dom";
import Connect from './Pages/Connect.tsx'
import Home from './Pages/Home.tsx'
import NewIntregation1 from './Pages/Newintregation1.tsx'
import NewIntregation2 from './Pages/Newintregation2.jsx';
import NewIntregation3 from './Pages/Newintregation3.jsx';
import NewIntregation4 from './Pages/Newintregation4.jsx';
import NewIntregation5 from './Pages/Newintregation5.jsx';
import NewIntregation6 from './Pages/Newintregation6.jsx';
import NewIntregation7 from './Pages/Newintregation7.jsx';
import Newintregation8 from './Pages/Newintregation8.tsx'
import Newintregation9 from './Pages/Newintregation9.tsx'
import Newintregationb from './Pages/Newintregationb.tsx'
import Newintregationb1 from './Pages/Newintregationb1.tsx'
import Newintregationb2 from './Pages/Newintregationb2.tsx'
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
import DraftAttributesType from './Pages/DraftAttributesType.tsx'
import DraftActions from './Pages/DraftActions.tsx';
import DraftDeployment from './Pages/DraftDeployment.tsx';
import Testto from './Pages/Testto.tsx';
import DraftEditActionsWhen from './Pages/DraftEditActionsWhen.tsx';
import DraftEditActionsThen from './Pages/DraftEditActionsThen.tsx';
import DraftEditActionsThenAttribute from './Pages/DraftEditActionsThenAttribute.tsx';
import DraftEditActionsThenTransform from './Pages/DraftEditActionsThenTransform.tsx';
import DraftEditActionsThenTransfer from './Pages/DraftEditActionsThenTransfer.tsx';
import DraftEditActionsThenTranformStatic from './Pages/DraftEditActionsThenTranformStatic.tsx';
import DraftEditActionsThenTranformDynamic from './Pages/DraftEditActionsThenTranformDynamic.tsx';
import DraftEditOriginData from './Pages/DraftEditOriginData.tsx';
export const ABCDE = () => {
  console.log("ABC")
}
// import dotenv from "dotenv";

// dotenv.config({ path: path.resolve(__dirname, "../.env") });
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
    path: "/draft/origindata/:schema_revision",
    element: <DraftEditOriginData></DraftEditOriginData>
  },
  {
    path: "/draft/attributes/:attribute_type/:schema_revision",
    element: <DraftAttributesType></DraftAttributesType>
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
    path: "/draft/actions/edit/then/transform/:action_name/:meta_function/:schema_revision",
    element: <DraftEditActionsThenTransform/>
  },
  {
    path: "/draft/actions/edit/then/transfer/:action_name/:meta_function/:schema_revision",
    element: <DraftEditActionsThenTransfer/>
  },
  {
    path: "/draft/actions/edit/then/transform/static/:action_name/:meta_function/:schema_revision",
    element: <DraftEditActionsThenTranformStatic/>
  },
  {
    path: "/draft/actions/edit/then/transform/dynamic/:action_name/:meta_function/:schema_revision",
    element: <DraftEditActionsThenTranformDynamic/>
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
    import.meta.env.VITE_APP_RPC1_ENDPOINT_SIX_FIVENET
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
      const apiUrl = `${import.meta.env.VITE_APP_API_ENDPOINT_SCHEMA_INFO}auth/refreshToken`; // Replace with your API endpoint
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
