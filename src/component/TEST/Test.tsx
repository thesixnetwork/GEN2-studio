import React from "react";
import { useSelector } from "react-redux";
import {
    counter1Selector,
    increase,
    setValueAsync,
} from "../../store/slices/counter1Slice";

import { useAppDispatch } from "../../store/store";
import { counter2Selector } from "../../store/slices/counter2Slice";

type Props = {};

export default function Test({ }: Props) {
    
    const dispatch = useAppDispatch();
    const counter1Reducer = useSelector(counter1Selector);
    const counter2Reducer = useSelector(counter2Selector);

    return (
        <div className='w-full flex justify-center ' >
            <div className='w-full h-full fixed  flex flex-col justify-center items-center bg-gradient-to-r from-violet-200 to-pink-200'>
            {counter1Reducer.loading && "Loading.."} {counter1Reducer.counter}/
                <h4>Page1</h4>
                <button
                    onClick={() => {
                        dispatch(increase());
                    }}
                >
                    counter1 - {counter1Reducer.counter}
                </button>

                <button
                    onClick={() => {
                        dispatch(setValueAsync(0));
                    }}
                >
                    Async counter1 - {counter1Reducer.counter}
                </button>
            </div>
        </div>
    );
}
