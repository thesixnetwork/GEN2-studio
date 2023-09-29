import React, { useEffect } from 'react'
import { TypeAnimation } from 'react-type-animation';
import DoubleArrowIcon from '@mui/icons-material/DoubleArrow';
import InputText from './InputText';
import EastIcon from '@mui/icons-material/East';
import NormalButton from './NormalButton';
import RedAleart from './Alert/RedAleart';
import { useNavigate } from 'react-router-dom';
interface MyComponentProps {
    Height: number;
    Width: number;
    detailsText: string;
    ML: number;
    MT: number;
    isSave:boolean;
    setIsSave: React.Dispatch<React.SetStateAction<boolean>>;

}


export default function EnterBox(props: MyComponentProps) {
    const navigate = useNavigate();
    const [showI, setshowI] = React.useState(false)
    const [showII, setshowII] = React.useState(false)
    const [partI, setPartI] = React.useState(false)
    const [partII, setPartII] = React.useState(false)
    const [errorMessageII,setErrorMessageII] = React.useState("Not avaliabe")
    const [errorMessageI,setErrorMessageI] = React.useState("Not avaliabe")
    const [iser, setIser] = React.useState(false)
    const [iserII, setIserII] = React.useState(false)
    const [text, setText] = React.useState(
        [{
          name: "",
          description:"",
        }]
      );

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            setshowI(true)
        }, 2300);

    }, [])

    function containsSpecialChars(str) {
        const specialChars = /[`!@#$%^&*()+\-=\[\]{};':"\\|,.<>\/?~]/;
        return specialChars.test(str);
    }

    function containsSpace(str) {
        const specialChars = / /;
        return specialChars.test(str);
    }

    function containsUppercase(str) {
        return /[A-Z]/.test(str);
    }


    const handleChange = (e,field) => {
    
        const updatedText = [...text];
        updatedText[0][field] = e.target.value;
       
        setText(updatedText);
        console.log(updatedText)
     
    };

    const CheckErrorI = async (e) => {
        setIser(false)
        setPartI(false)
        if (!e.target.value) {
            setErrorMessageI("Not Availible")
            setIser(true)
        }
        else if (containsSpecialChars(e.target.value)) {
            setErrorMessageI("Sp Chars")
            setIser(true)
        }
        else if (containsSpace(e.target.value)) {
            setErrorMessageI("Space")
            setIser(true)
        }
        else if (containsUppercase(e.target.value)) {
            setErrorMessageI("Uppercase")
            setIser(true)
        }

        else {
            setIser(false)
            setPartI(true)
        }
    }

    const saveCheckErrorI = async (str) => {

        setIser(false)
        setPartI(false)
        if (!str) {
            setErrorMessageI("Not Availible")
            setIser(true)
        }
        else if (containsSpecialChars(str)) {
            setErrorMessageI("Sp Chars")
            setIser(true)
        }
        else if (containsSpace(str)) {
            setErrorMessageI("Space")
            setIser(true)
        }
        else if (containsUppercase(str)) {
            setErrorMessageI("Uppercase")
            setIser(true)
        }

        else {
            setIser(false)
            setPartI(true)
        }


    }

    const saveCheckErrorII = async (str) => {
        setIserII(false)
        setPartII(false)
        if (!str) {
            setErrorMessageII("Not Availible")
            setIserII(true)
        }
        else if (containsSpace(str)) {
            setErrorMessageII("Space")
            setIserII(true)
        }
        else {
            setIserII(false)
            setPartII(true)
        }
    }

    useEffect(()=>{
        if(!partI){
          
            setshowII(false)
        }
         
    },[partI])

    useEffect(()=>{
        if(partI){
            saveCheckErrorII(text[0].description)
        } ;
       

        if(partI && partII){
            navigate("/newintregation/beginer/2")
        }else{
            props.setIsSave(false)
        } ;
       
    },[props.isSave])

    useEffect(()=>{
        if(props.isSave){
            saveCheckErrorI(text[0].name)
        } ;
        if(partI){setshowII(true)};
      
    },[props.isSave])

    return (
        <div style={{ width: `${props.Width}px`, height: `${props.Height}px`, marginLeft: `${props.ML}px`, marginTop: `${props.MT}px` }}
            className='flex-col p-3 border text-white border-white bg-transparent  rounded-xl  flex  justify-start items-start  shadow-md '>
            <TypeAnimation
                className=' text-gray-200'
                sequence={[
                    `Welcome to Actions\nLet’s begin the adventure`,
                    2000,
                    `Welcome to Actions\nLet’s begin the adventure`,
                ]}
                speed={50}
                style={{ whiteSpace: 'pre-line', fontSize: '15px', }}
                repeat={0}
                preRenderFirstString={false}
            />
            {showI &&
                <div>
                    <h1 className='text-[20px] font-bold mt-4'>Enter your “Action” name</h1>
                    <div className=' w-full flex justify-center items-center mt-[15px] '>
                        <div className=''>
                            <EastIcon  ></EastIcon>
                        </div>
                        <div  className='ml-[15px]'>
                            <input
                                id='1'
                                type="text"
                                autoFocus
                                className={`bg-transparent text-[14px] border-[1px] border-transparent focus:border-[#D9D9D9DD] placeholder-gray-300 border-dashed p-1 focus:outline-none focus:scale-105 duration-1000 w-[350px] h-[${20}px]`}
                                placeholder={""}
                                onChange={async (e) => {
                                    await handleChange(e,"name");
                                    await CheckErrorI(e); 
                                }}
                            />
                        </div>
                        <div className='ml-[15px]' onClick={() => {if(partI){setshowII(true)} ; saveCheckErrorI(text[0].name)  }}>
                            <NormalButton BorderRadius={0} FontSize={0} TextTitle={'Next'}></NormalButton>
                        </div>
                    </div>
                    {iser &&
                        <RedAleart
                            Height={20}
                            Width={260}
                            Rotate={0}
                            ML={80}
                            MT={5}
                            detailsText={errorMessageI}
                        />
                    }
                </div>
            }
            {showII &&
                <div>
                    <h1 className='text-[20px] font-bold mt-8'>Enter your description of the action</h1>
                    <div className=' w-full flex justify-center items-center mt-[15px] '>

                        <EastIcon  ></EastIcon>
                        <div className='ml-[15px]'>
                            <input
                                type="text"
                                autoFocus
                                className={`bg-transparent text-[14px] border-[1px] border-transparent focus:border-[#D9D9D9DD] placeholder-gray-300 border-dashed p-1 focus:outline-none focus:scale-105 duration-1000 w-[350px] h-[${20}px]`}
                                placeholder={""}
                                onChange={async (e) => {
                                    await handleChange(e,"description");
                                    saveCheckErrorII(text[0].description)
                                }}
                            />
                        </div>
                     
                    </div>
                    {iserII &&
                        <RedAleart
                            Height={20}
                            Width={260}
                            Rotate={0}
                            ML={80}
                            MT={5}
                            detailsText={errorMessageII}
                        />
                    }
                </div>
            }
        </div>
    )
}