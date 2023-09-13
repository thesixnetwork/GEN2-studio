import { useEffect, useState } from 'react'
import logo1 from '../pic/Keplr_Icon 1.png'
import logo2 from '../pic/Copy.png'
import logo3 from '../pic/Share.png'
import logo4 from '../pic/SIX_Token_Icon 1.png'
import logo5 from '../pic/X.png'
import { StargateClient } from "@cosmjs/stargate";
//Redux
import { useSelector } from "react-redux";
import {
    walletcounterSelector,
    setisloggin,
    setAddress,
    setBalance
} from "../store/slices/walletcounterSlice";
import { useAppDispatch } from "../store/store";
import { CircularProgress, LinearProgress, Skeleton } from '@mui/material'



const Conectwalet = () => {
    //Redux
    const dispatch = useAppDispatch();
    const walletcounterReducer = useSelector(walletcounterSelector);
    // Usetstate for storing wallets details state.
    const [web3, setWeb3] = useState(null);
    // Loading
    const [isLoading, setisLoading] = useState(false);
    // chain detail
    const [chainId, setChainId] = useState("fivenet")
    const [token, setToken] = useState("usix")
    const [rpcEndpoint, setRpcEndpoint] = useState("https://rpc1.fivenet.sixprotocol.net/")
    const [exponent, setExponent] = useState(1e6)
    const [tokenName, setTokenName] = useState("SIX")

    const buttonLogout = async () => {
        dispatch(setisloggin(false));
        dispatch(setAddress(""));
        dispatch(setBalance(0));
    }

    // Connect Keplr
    const buttonHandlerKeplrConnect = async () => {
        if (window.keplr) {
            setisLoading(true)
            // Unlock the wallet.
            await window.keplr.enable(chainId);
            // Use offlineSigner to get first wallet and public key.
            // Currently only first address is supported.
            const offlineSigner = await window.getOfflineSigner(chainId);
            const keplrAccounts = await offlineSigner.getAccounts();
            // Set state value as first address.
            console.log("KEPL ADREESS :" + keplrAccounts[0].address)

            dispatch(setAddress(keplrAccounts[0].address));
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
        const balanceAsCoin = await client.getBalance(walletcounterReducer.cosmosaddress, token);
        const balance = parseInt(balanceAsCoin.amount) * 1 / exponent;

        // Set state values.        
        dispatch(setBalance(balance.toFixed(2)));
        dispatch(setisloggin(true));
        setisLoading(false)

    };

    const initializeWeb3 = async () => {
        try {
            if (window.ethereum) {
                // Modern dapp browsers (like MetaMask)
                const web3Instance = new Web3(window.ethereum);
                setWeb3(web3Instance);
                // await connectToWallet();
            } else {
                console.error("No wallet detected.");
            }
        } catch (error) {
            console.error("Error initializing Web3:", error);
        }
    };

    // Get data for set web3
    useEffect(() => {
        initializeWeb3();
        // getData();

    }, []);

    useEffect(() => {
       getKeplrBalance()


    }, [walletcounterReducer.cosmosaddress]);

    return (
        <div className='w-[266px] h-[95px] border-[1px] border-white rounded-xl px-[12px] py-[9px]'>
            {isLoading ?
                <CircularProgress className='mt-[15px] ml-[100px]'></CircularProgress>
                :
                <div>
                    {walletcounterReducer.isloggin ?
                        <div>
                            <div className=' flex justify-between'>
                                <p className=' text-[20px] ml-2  text-gray-200'>{walletcounterReducer.cosmosaddress.substring(0, 8)}...{walletcounterReducer.cosmosaddress.substring(walletcounterReducer.cosmosaddress.length - 4, walletcounterReducer.cosmosaddress.length)}</p>
                                <div className='flex justify-between items-center w-[65px]'>
                                    <img src={logo1} className='w-[17px] h-[17px]'></img>
                                    <img src={logo2} className='w-[18px] h-[16px]'></img>
                                    <img src={logo3} className='w-[18px] h-[18px] mt-2'></img>
                                </div>
                            </div>
                            <div className='mt-3 flex '>
                                <div className='flex w-[50%]  items-center'>
                                    <img src={logo4} className='w-[31px] h-[31px]'></img>
                                    <p className='text-gray-200 text-[24px] mx-8'>{walletcounterReducer.cosmosbalance}</p>

                                </div>
                                <div className='flex w-[50%] justify-end items-center mx-13'>
                                    <p className='text-[#D9D9D9] text-[24px] border-[0.5px] border-white rounded-[100%] px-3 mr-2 '>5</p>
                                    <img src={logo5} onClick={buttonLogout} className='border-[0.5px] rounded-xl p-2 hover:scale-105 duration-500 cursor-pointer'></img>
                                </div>
                            </div>
                        </div>
                        :
                        <div className='flex justify-center items-center h-[80px]'>
                            <p className='text-3xl text-white cursor-pointer hover:scale-105 duration-500' onClick={buttonHandlerKeplrConnect}>Connect Wallet</p>
                        </div>
                    }
                </div>
            }
        </div>
    )
}

export default Conectwalet