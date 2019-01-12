/**
 * Main entry point for webpack. Keep it seperate from App.tsx so hot reload works
 */
import * as React from "react";
import { render } from "react-dom";
import { HotApp } from "./HotApp";

console.log(`Build [AIV]{version}[/AIV]`);

render(<HotApp />, document.getElementById("root"));
