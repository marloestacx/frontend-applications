import logo from './logo.svg';
import './App.css';
import Fetch from './chart/fetch';
import React from 'react';
import { useEffect, useState } from 'react';
import BarChart from "./components/BarChart";
import { dataByYear } from "./data2";
import { songData } from './data';

// function App() {

//   const [json, setJson] = useState(null);
//   useEffect(() => {
//      Fetch().then(songData => setJson(songData));
//   })

//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <pre>
//           {JSON.stringify(json, null, 3)}
//         </pre>
//       </header>
//     </div>
//   );
// }

export default function App() {
  return (
    <div className="App">
      <h1>Just Another Demo</h1>
      <h2>https://codesandbox.io/s/hva-demo-dag3-tnn6g</h2>

      <BarChart data={songData} />
    </div>
  );
}


// export default App;
