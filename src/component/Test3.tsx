import React from "react";
import { useSelector } from "react-redux";
import Page1 from "./Page1";
import Page2 from "./Page2";
import { counter1Selector } from "../store/slices/counter1Slice";
import { counter2Selector } from "../store/slices/counter2Slice";

type Props = {};

export default function test3({}: Props) {
  const counter1Reducer = useSelector(counter1Selector);
  const counter2Reducer = useSelector(counter2Selector);
  console.log("counter1Reducer:", counter1Reducer)

  return (
    <div className="bg-gradient-to-r from-blue-200 to-cyan-200">
      <h1>App</h1>
      <span>
        {counter1Reducer.loading && "Loading.."} {counter1Reducer.counter}/
        {counter2Reducer.loading && "Loading.."} {counter2Reducer.counter}
      </span>
      <Page1 />
      <hr />
      <Page2 />
    </div>
  );
}
