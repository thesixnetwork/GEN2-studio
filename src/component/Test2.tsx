import React from "react";
import { useSelector } from "react-redux";
import {
    counter2Selector,
    increase,
    setValueAsync,
} from "../store/slices/counter2Slice";
import { counter1Selector } from "../store/slices/counter1Slice";
import { useAppDispatch } from "../store/store";

type Props = {};

export default function Test2({ }: Props) {
    const dispatch = useAppDispatch();
    const counter1Reducer = useSelector(counter1Selector);
    const counter2Reducer = useSelector(counter2Selector);

    return (
        <div className='w-full flex justify-center ' >
            <div className='w-full h-full fixed  flex flex-col justify-center items-center bg-gradient-to-r from-violet-200 to-pink-200'>
                
                <h4>Page2</h4>
                <button
                    onClick={() => {
                        dispatch(increase());
                    }}
                >
                    counter2 - {counter2Reducer.counter}
                </button>

                <button
                    onClick={() => {
                        dispatch(setValueAsync(0));
                    }}
                >
                    Async counter2 - {counter2Reducer.counter}
                </button>
            </div>
        </div>
    );
}
