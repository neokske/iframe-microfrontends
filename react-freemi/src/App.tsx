import React, {useEffect, useState} from 'react';
import './App.css';

type ReactData = {
    message: string;
    data?: any;
    appName: string;
}

const sendToParentApp = (data: ReactData) => {
    window.top.postMessage(data, '*');
};

const App = () => {
    const [messageReceived, setMessageReceived] = useState("");
    const [dataToSend, setDataToSend] = useState();
    useEffect(() => {
        window.onmessage = (e: MessageEvent) => {
            if (e.data) {
                setMessageReceived(e.data)
            }
        };
    }, []);

    const sendData = () => {
        sendToParentApp({appName: "react-app", message: dataToSend})
    };

    return (
        <div className="App">
            <p>
                {messageReceived}
            </p>
            <input onChange={(e) => setDataToSend(e.target.value)}/>
            <button onClick={sendData}>Send to angular</button>
        </div>
    );
};

export default App;
