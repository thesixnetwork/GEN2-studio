import { useEffect, useState } from "react";
import logo1 from "../pic/Keplr_Icon 1.png";
import logo2 from "../pic/Copy.png";
import logo3 from "../pic/Share.png";
import logo4 from "../pic/SIX_Token_Icon 1.png";
import logo5 from "../pic/X.png";
import { StargateClient } from "@cosmjs/stargate";
import { Navigate, useNavigate } from "react-router-dom";
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
//Redux
import { useSelector } from "react-redux";
import {
  walletcounterSelector,
  setisloggin,
  setAddress,
  setBalance,
  setLoading,
} from "../store/slices/walletcounterSlice";
import { useAppDispatch } from "../store/store";
import {
  CircularProgress,
  LinearProgress,
  Skeleton,
  Tooltip,
} from "@mui/material";
import axios from 'axios'

import { clearOriginContractAddressFromLocalStorage, clearSCHEMA_CODE, clearTokensFromLocalStorage, getAccessTokenFromLocalStorage, getRefreshTokenFromLocalStorage, saveTokensToLocalStorage, } from '../helpers/AuthService';
import { ABCDE } from "../App";


const Conectwalet = () => {
  //Redux
  const dispatch = useAppDispatch();
  const walletcounterReducer = useSelector(walletcounterSelector);
  // Usetstate for storing wallets details state.
  // Loading
  const [isLoading, setisLoading] = useState(false);
  // chain detail
  const [chainId, setChainId] = useState("fivenet");
  const [token, setToken] = useState("usix");
  const [rpcEndpoint, setRpcEndpoint] = useState(
    import.meta.env.VITE_APP_RPC1_ENDPOINT_SIX_FIVENET
  );
  const [exponent, setExponent] = useState(1e6);

  const [cosmosAddress, setCosmosAddress] = useState("");

  const [copied, setCopied] = useState(false);

  const message = import.meta.env.VITE_APP_SIGN_MESSAGE


  const navigate = useNavigate();

  const buttonLogout = async () => {

    Swal.fire({
      title: 'Are you sure to logout?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#7A8ED7',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, Logout '
    }).then((result) => {
      if (result.isConfirmed) {
        clearTokensFromLocalStorage()
        Swal.fire(
          'Logout Complete!',
          'Your file has been deleted.',
          'success'
        )
        dispatch(setisloggin(false));
        dispatch(setAddress(""));
        dispatch(setBalance(0));
        navigate("/connect")
        localStorage.clear();
      }
    })
  };

  // Connect Keplr
  const buttonHandlerKeplrConnect = async () => {
    if (window.keplr) {
      dispatch(setLoading(true));
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

  //Get balance
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
  };

  const getSignature = async () => {
    if (cosmosAddress) {
      try {
        const offlineSigner = window.getOfflineSigner(chainId);
        const signedMessage = await offlineSigner.keplr.signArbitrary(
          chainId,
          cosmosAddress,
          message
        );
        // console.log(signedMessage.signature);
        // console.log(signedMessage.pub_key);
        const verified = await offlineSigner.keplr.verifyArbitrary(
          chainId,
          cosmosAddress,
          message,
          signedMessage
        );
        console.log("verified= ", verified);
      } catch (error) {
        console.error("Error:", error);
      }
    }
  };

  const copyToClipboard = (value) => {
    navigator.clipboard.writeText(value);
    setCopied(true);
  };

  useEffect(() => {
    {
      walletcounterReducer.isloggin && getKeplrBalance();
    }
    getSignature();
    LoginApi();
  }, [cosmosAddress]);

  // useEffect(() => {
  //   getKeplrBalance();
  // }, [walletcounterReducer.cosmosaddress]);

  const LoginApi = async () => {
    const offlineSigner = window.getOfflineSigner(chainId);
    const keplrAccounts = await offlineSigner.getAccounts();
    // console.log("KEPL ADREESS :" + keplrAccounts[0].address);
    // console.log("gust")
    const signedMessage = await offlineSigner.keplr.signArbitrary(
      chainId,
      cosmosAddress,
      message
    );
    console.log(signedMessage)
    // DB request
    const apiUrl = `${import.meta.env.VITE_APP_API_ENDPOINT_SCHEMA_INFO}auth/login`; // Replace with your API endpoint
    const requestData = {
      "channel": "Keply",
      "ssoID": `${keplrAccounts[0].address}`,
      "messagge": message,
      "signature": `${signedMessage.signature}`
    };
    console.log(signedMessage)
    await  axios.post(apiUrl, requestData, {
      headers: {
        'Content-Type': 'application/json', // Set the content type to JSON
        // Add any other headers your API requires
      },
    })
      .then(response => {
        // console.log('API Response:', response.data);
        // console.log('Access_token:', response.data.data.access_token);
        // console.log('Refresh_token:', response.data.data.refresh_token);
        // console.log('Refresh_token:', response.data.data.id);
        saveTokensToLocalStorage(response.data.data.access_token, response.data.data.refresh_token);
        const accessToken = getAccessTokenFromLocalStorage();
        const refreshToken = getRefreshTokenFromLocalStorage();
        console.log("Access-: ", accessToken)
        console.log("Refresh: ", refreshToken)
        // You can handle the API response here
      })
      .catch(error => {
        console.error('API Error:', error);
        // Handle errors here
      });

    dispatch(setLoading(false));
    dispatch(setisloggin(true))
  }
  console.log(">>", message)
  return (
    <div className="w-[266px] h-[95px] border-[1px] border-white rounded-xl px-[12px] py-[9px] flex justify-center items-center">
      {walletcounterReducer.loading ? (
        <CircularProgress className=" text-white"   sx={{
          width: 300,
          color: 'white',
        }}
      ></CircularProgress>
      ) : (
        <div>
          {(getAccessTokenFromLocalStorage() == null) ? (
            <Tooltip title="Connect to keplr wallet">
              <div className="flex justify-center items-center h-[80px]">
                <p
                  className="text-3xl text-white cursor-pointer hover:scale-105 duration-500"
                  onClick={()=>{buttonHandlerKeplrConnect(); ABCDE();}}
                >
                  Connect Wallet
                </p>
              </div>
            </Tooltip>
          ) : (
            <div>
              <div className=" flex justify-between">
                <p className=" text-[20px] ml-2  text-gray-200">
                  {walletcounterReducer.cosmosaddress.substring(0, 8)}...
                  {walletcounterReducer.cosmosaddress.substring(
                    walletcounterReducer.cosmosaddress.length - 4,
                    walletcounterReducer.cosmosaddress.length
                  )}
                </p>
                <div className="flex justify-between items-center w-[65px]">
                  <img src={logo1} className="w-[17px] h-[17px]"></img>
                  <Tooltip
                    title={copied ? "Copied" : "Copy to Clipboard"}
                    arrow
                  >
                    <img
                      src={logo2}
                      className="w-[18px] h-[16px] cursor-pointer"
                      onClick={() =>
                        copyToClipboard(walletcounterReducer.cosmosaddress)
                      }
                    ></img>
                  </Tooltip>
                  <Tooltip title={"Home"}>

                    <img src={logo3} onClick={()=>{navigate('/'); clearSCHEMA_CODE() ; clearOriginContractAddressFromLocalStorage();}} className="w-[18px] h-[18px] mt-2 hover:scale-125 duration-500 cursor-pointer"></img>
                  </Tooltip>
                </div>
              </div>
              <div className="mt-3 flex ">
                <div className="flex w-[50%]  items-center">
                  <img src={logo4} className="w-[31px] h-[31px]"></img>
                  <p className="text-gray-200 text-[24px] mx-8">
                    {walletcounterReducer.cosmosbalance}
                  </p>
                </div>
                <div className="flex w-[50%] justify-end items-center mx-13">
                  <p className="text-[#D9D9D9] text-[24px] border-[0.5px] border-white rounded-[100%] px-3 mr-2 ">
                    5
                  </p>
                  <Tooltip title="Logout">
                    <img
                      src={logo5}
                      onClick={buttonLogout}
                      className="border-[0.5px] rounded-xl p-2 hover:scale-105 duration-500 cursor-pointer"
                    ></img>
                  </Tooltip>

                </div>
              </div>
            </div>
          )
          }
        </div>
      )}
    </div>
  );
};

export default Conectwalet;
