// import logo from './logo.svg';
// import './App.css';

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

// export default App;

import React, { useState } from "react";

const App = () => {
    const [inputCode, setInputCode] = useState("");
    const [convertedCode, setConvertedCode] = useState("");
    const [targetLanguage, setTargetLanguage] = useState("JavaScript");

    const convertCode = async () => {
        const response = await fetch("http://127.0.0.1:8000/convert_code/", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ input_code: inputCode, target_language: targetLanguage })
        });

        const data = await response.json();
        setConvertedCode(data.converted_code);

    };

    return (
        <div>
            <h1>Python Code Converter</h1>
            <textarea 
                value={inputCode} 
                onChange={(e) => setInputCode(e.target.value)} 
                placeholder="Enter Python code"
            />
            <select value={targetLanguage} onChange={(e) => setTargetLanguage(e.target.value)}>
              <option value="JavaScript">JavaScript</option>
              <option value="C++">C++</option>
              <option value="Java">Java</option>
            </select>
            <button onClick={convertCode}>Convert</button>
            <h2>Converted Code:</h2>
            <pre>{convertedCode}</pre>
        </div>
    );
};

export default App;
