import React, { useEffect, useState } from "react";
import { CircularProgress, Tooltip } from "@mui/material";

import Add from "../pic/Group 40.png";

import Conectwalet from "../component/Connectwallet";
import Stepper2 from "../component/Stepper2";
import Darkbg from "../component/Alert/Darkbg";
import AlertCard from "../component/Alert/AlertCard";

import Swal from "sweetalert2";
import AttributeBox from "../component/AttributeBox";
import NormalButton from "../component/NormalButton";
import { useNavigate } from "react-router-dom";
import GobackButton from "../component/GobackButton";
import { getAccessTokenFromLocalStorage, getOriginContractAddressFromLocalStorage, getSCHEMA_CODE } from "../helpers/AuthService";
import axios from "axios";

const NewIntregation7 = () => {
  const [currentState, setCurrentState] = useState(3)
  const [isLoadingHistory, setIsLoadingHistory] = useState(false)
  const [isShow, setIsShow] = useState(false);
  const [save, setSave] = useState(false);
  const navigate = useNavigate();
  const [text, setText] = useState([
    // {
    //   "name": "",
    //   "data_type": "",
    //   "required": false,
    //   "display_value_field": "",
    //   "display_option": {
    //     "bool_true_value": "",
    //     "bool_false_value": "",
    //     "opensea": {
    //       "display_type": "",
    //       "trait_type": "",
    //       "max_value": "0"
    //     }
    //   },
    //   "default_mint_value": null,
    //   "hidden_overide": false,
    //   "hidden_to_marketplace": false
    // },
    // {
    //   "name": "",
    //   "data_type": "",
    //   "required": false,
    //   "display_value_field": "",
    //   "display_option": {
    //     "bool_true_value": "",
    //     "bool_false_value": "",
    //     "opensea": {
    //       "display_type": "",
    //       "trait_type": "",
    //       "max_value": "0"
    //     }
    //   },
    //   "default_mint_value": null,
    //   "hidden_overide": false,
    //   "hidden_to_marketplace": false
    // },
    //  {
    //   "name": "",
    //   "data_type": "",
    //   "required": false,
    //   "display_value_field": "",
    //   "display_option": {
    //     "bool_true_value": "",
    //     "bool_false_value": "",
    //     "opensea": {
    //       "display_type": "",
    //       "trait_type": "",
    //       "max_value": "0"
    //     }
    //   },
    //   "default_mint_value": null,
    //   "hidden_overide": false,
    //   "hidden_to_marketplace": false
    // },

  ]);





  const searchError = () => {
    for (let i = 0; i < text.length; i++) {
      if (text[i].Error === "F") {
        document.getElementById(i).scrollIntoView({ behavior: 'smooth' });
        break
      }
    }
  }

  const checkALLError = () => {
    const specialChars = /[`!@#$%^&*()+\-=\[\]{};':"\\|,.<>\/?~ ]/;
    if (text.every((item) => item.name !== "" && item.display_option.opensea.trait_type !== "" && !specialChars.test(item.name))) {
      navigate('/newintregation/8')
    }
  }

  const LoadingCheckErro = () => {
    let timerInterval = 500
    Swal.fire({
      title: 'Loading ...',
      html: 'I will close in <b></b> milliseconds.',
      timer: 500,
      timerProgressBar: true,
      didOpen: () => {
        Swal.showLoading()
        const b = Swal.getHtmlContainer().querySelector('b')
        timerInterval = setInterval(() => {
          b.textContent = Swal.getTimerLeft()
        }, 100)
      },
      willClose: () => {
        clearInterval(timerInterval)
      }
    }).then((result) => {
      /* Read more about handling dismissals below */
      if (result.dismiss === Swal.DismissReason.timer) {
      }
    })

  }

  const handleSave = async () => {

    setSave(true);
    searchError()
    setTimeout(() => {
      checkALLError()
    }, 500);
    LoadingCheckErro()
    await saveOriginTokenAttributes()

  };

  const handleCreateAttribute = () => {
    const newAttribute = {
      "name": "",
      "data_type": "string",
      "required": false,
      "display_value_field": "",
      "display_option": {
        "bool_true_value": "",
        "bool_false_value": "",
        "opensea": {
          "display_type": "",
          "trait_type": "",
          "max_value": "0"
        }
      },
      "default_mint_value": null,
      "hidden_overide": false,
      "hidden_to_marketplace": false
    };
    setText([...text, newAttribute]);
  };

  const [helpStep, sethelpStep] = useState(0)

  const handleHelp = () => {
    console.log(text)
    const element0 = document.getElementById("0");
    const elementDelete2 = document.getElementById("delete2");
    const elementPlus = document.getElementById("plus");

    if (element0 && elementDelete2 && elementPlus) {
      element0.style.zIndex = "0";
      elementDelete2.style.zIndex = "0";
      elementPlus.style.zIndex = "0";
      sethelpStep(helpStep + 1);
    }
  };

  const saveOriginTokenAttributes = async () => {
    const apiUrl = `${import.meta.env.VITE_APP_API_ENDPOINT_SCHEMA_INFO}schema/set_schema_info`; // Replace with your API endpoint
    const requestData = {
      "payload": {
        "schema_info": {
          "origin_data": {
            "origin_attributes": text
          }
        },
        "schema_code": getSCHEMA_CODE(),
        "status": "Draft",
        "current_state": "3"
      }
    }
      ;

    await axios.post(apiUrl, requestData, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${getAccessTokenFromLocalStorage()}`,  // Set the content type to JSON
        // Add any other headers your API requires
      },
    })
      .then(response => {
        console.log('API Response saveOriginContractAddressAndOriginBaseURI :', response.data);
        console.log("Request :", requestData)
        // You can handle the API response here
      })
      .catch(error => {
        console.error('API Error:', error);
        // Handle errors here
      });

  }

  const getOriginAttributFromContract = async () => {

    const apiUrl = `${import.meta.env.VITE_APP_API_ENDPOINT_SCHEMA_INFO}schema/origin_attribute_from_baseuri/${getOriginContractAddressFromLocalStorage()}`; // Replace with your API endpoint
    const params = {

    };

    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${getAccessTokenFromLocalStorage()}`,
    }

    // Make a GET request with parameters
    await axios.get(apiUrl, {
      params: params, // Pass parameters as an object
      headers: headers, // Pass headers as an object
    })
      .then((response) => {
        // Handle successful response here
        // console.log('Response:', response.data.data.origin_attributes);

        // Map the "origin_attributes" data and update the state
        // const updatedText = response.data.data.origin_attributes.map((attribute, index) => ({
        //   name: attribute.name,
        //   dataType: attribute.data_type,
        //   traitType: attribute.display_option.opensea.trait_type,
        //   Error: "",
        // }));
        // console.log(response.data)
        if (response.data.data.origin_attributes === undefined) {
          setText([])
        } else {
          setText(response.data.data.origin_attributes);
          console.log("Text :", response.data.data.origin_attributes)
        }
      })
      .catch((error) => {
        // Handle errors here
        console.error('Error:', error);
      });
  }

  // useEffect(() => {
  //   getOriginAttributFromContract()

  // }, [])

  const GethistoryFormSchemaCode = async () => {
    // const updatedText = [...text];
    // updatedText[0].duplicate = true;
    setIsLoadingHistory(true)
    const apiUrl = `${import.meta.env.VITE_APP_API_ENDPOINT_SCHEMA_INFO}schema/get_schema_info/${getSCHEMA_CODE()}`; // Replace with your API endpoint
    const params = {
    };
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${getAccessTokenFromLocalStorage()}`,
    }
    // Make a GET request with parameters
    await axios.get(apiUrl, {
      params: params, // Pass parameters as an object
      headers: headers, // Pass headers as an object
    })
      .then(async (response) => {
        if(response.data.data.schema_info.current_state >=currentState){
          setCurrentState(response.data.data.schema_info.current_state)
        }
        
        console.log('Response:', response.data.data);
        if (response.data.data.schema_info.schema_info.origin_data.origin_attributes.length === 0) {
          await getOriginAttributFromContract()
        } else {
          setText(response.data.data.schema_info.schema_info.origin_data.origin_attributes);
        }
        // const updatedText = [...text];
        // updatedText[0].value = response.data.data.schema_info.schema_name;
        // updatedText[1].value = response.data.data.schema_info.schema_info.name;
        // updatedText[2].value = response.data.data.schema_info.schema_info.description;
        // console.log(text)
      })
      .catch((error) => {
        console.error('Error:', error);
      });
    setIsLoadingHistory(false)
  }


  useEffect(() => {
    console.log("SCHEMACODE:", getSCHEMA_CODE())
    if (getSCHEMA_CODE()) {
      GethistoryFormSchemaCode();
    }
  }, []);

  // useEffect(() => {
  //   document.getElementById("plus").style.zIndex = "0";
  //   document.getElementById("delete2").style.zIndex = "0";
  //   document.getElementById("0").style.zIndex = "0";
  //   if (helpStep === 1) {
  //     document.getElementById("0").style.zIndex = "50";
  //     document.getElementById("0").scrollIntoView({ behavior: 'smooth' });
  //   } else if (helpStep === 2) {
  //     document.getElementById("delete2").style.zIndex = "50";
  //     document.getElementById("delete2").scrollIntoView({ behavior: 'smooth' });
  //   } else if (helpStep === 3) {
  //     document.getElementById("plus").style.zIndex = "50";
  //     document.getElementById("plus").scrollIntoView({ behavior: 'smooth' });

  //   } else if (helpStep === 5) {
  //     setIsShow(false)
  //     sethelpStep(0)
  //   }

  // }, [helpStep]);

  const handleClickScroll = () => {
    const element = document.getElementById('10');
    if (element) {
      // 👇 Will scroll smoothly to the top of the next section
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };


  return (
    <div className="w-full flex justify-center ">
      <div className="w-full h-full fixed  flex justify-center items-center bg-gradient-24  from-white to-[#7A8ED7]">
        <div className="w-[1280px] h-[832px] bg-gradient-24 to-gray-700 from-gray-300 rounded-2xl flex justify-between p-4 shadow-lg shadow-black/20 dark:shadow-black/40">
          <div className="w-full h-full px-[20px] relative">
            {!isLoadingHistory &&
              <div className=' h-1/6'>
                <div className='flex flex-rows justify-between'>
                  <Stepper2 CurrentState={currentState} ActiveStep={3}></Stepper2>
                </div>
                <div className='w-[931px] h-[1px] bg-[#D9D9D9]'></div>
              </div>
            }
            <div className="w-full h-[80%] overflow-scroll flex  justify-start relative">
              {!isLoadingHistory &&
                <div className="grid-cols-3 grid gap-y-8 gap-x-10 px-2 py-3   absolute ">
                  {text !== undefined && text.map((item, index) => (
                    <AttributeBox
                      Title={["abc", "123", "Y/N"]}
                      Name={item.name}
                      DataType={item.data_type}
                      TraitType={item.display_option.opensea.trait_type}
                      // Value={null}   .display_option.opensea.trait_type
                      text={text}
                      setText={setText}
                      key={index}
                      index={index}
                      save={save}
                      setSave={setSave}
                      isShow={isShow}
                      setIsShow={setIsShow}
                      helpStep={helpStep}
                    // Enum={Enum}
                    // setEnum={setEnum}
                    />
                  ))}
                  <div
                    id="plus"
                    onClick={handleCreateAttribute}
                    className="w-[267px] h-[187px] flex justify-center items-center bg-transparent border border-white rounded-xl p-3 hover:scale-105 cursor-pointer duration-300  "
                  >
                    <img src={Add}></img>
                    {isShow && helpStep === 3 && (
                      <div className="">
                        <AlertCard
                          BG={1}
                          ML={-0}
                          MT={-240}
                          Width={266}
                          Height={140}
                          heaDer={`Add attributes`}
                          detailsText="You can add more attributes than the original on your origin base uri if you want"
                        ></AlertCard>
                      </div>
                    )}
                  </div>
                </div>
              }
              {isLoadingHistory &&
                <div className=' w-full h-full flex justify-center items-center scale-[500%]'>
                  <CircularProgress className=" text-white" sx={{
                    width: 1000,
                    color: 'white',
                  }}
                  ></CircularProgress>
                </div>
              }


            </div>
            <div className='  flex justify-start  absolute left-0 bottom-0 '>
              <div className={``}>
                <GobackButton BackPage='/newintregation/6'></GobackButton>
              </div>
            </div>
          </div>
          <div className="w-2/6 h-5/6 flex flex-col items-end justify-between  ">
            <Conectwalet></Conectwalet>
            <div className={`w-[266px] h-[414px] border-[1px] border-white rounded-xl mt-[30px] flex flex-col items-center py-[10px] z-${helpStep === 4 && "10"}`}>
              <p className="text-[24px] w-[231px] font-bold text-white text-center">
                Origin Token Attributes
              </p>
              <p className="text-[16px] w-[216px]  text-white pt-[15px]">
                &emsp;Mostly NFT token will need attributes of it called
                metadata. Origin attributes is the static type of metadata. And
                it cannot be change ( but it can be override by token attributes
                we will discuss next step ).
              </p>
              <p className="text-[16px] w-[216px]  text-white pt-[15px]">
                &emsp; You can edit value of attributes by double click the
                value and change to your proper design.
              </p>
            </div>
            <div

              className=" w-full mt-[20px] flex items-center justify-between px-2 "
            >
              <div onClick={getOriginAttributFromContract} >
                <NormalButton TextTitle="RESET" BorderRadius={0} FontSize={32}></NormalButton>
              </div>
              <div onClick={handleSave} >
                <NormalButton TextTitle="NEXT" BorderRadius={0} FontSize={32}></NormalButton>
              </div>

            </div>
            <Tooltip title={"help"}>
              <div
                // onClick={() => {
                //   setIsShow(true);
                //   handleHelp();
                // }}
                className=" z-[51] w-[50px] h-[50px] rounded-full bg-transparent  hover:bg-slate-200 flex justify-center items-center absolute text-[50px] mt-[730px] mr-[20px] cursor-pointer hover:scale-150 hover:text-[#262f50] duration-500"
              >
                ?
              </div>
            </Tooltip>
          </div>
        </div>
        {isShow && (
          <div
            className="absolute duration-500"
            onClick={() => {
              setIsShow(!isShow);
              sethelpStep(0)
            }}
          >
            <Darkbg></Darkbg>
          </div>
        )}
      </div>
    </div>
  );
};

export default NewIntregation7;