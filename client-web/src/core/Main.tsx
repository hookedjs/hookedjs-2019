/**
 * Main entry point for webpack. Keep it seperate from App.tsx so hot reload works
 */
import React from "react";
import {render} from "react-dom";
import {HotApp} from "./HotApp";

render(<HotApp />, document.getElementById("root"));
