import React from "react";
import { render } from "react-dom";
import App from "./components/App";

// render(
//     <React.StrictMode>
//         {/* <Router> */}
//         <App />
//         {/* </Router> */}
//     </React.StrictMode>,
//     document.getElementById("app")
// );

render(<App />, document.getElementById("app"));
