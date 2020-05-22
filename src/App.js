import React from 'react';
import Secure from './containers/Secure/Secure'
import {BrowserRouter} from 'react-router-dom';
import './App.css';

function App() {
    return (
        <BrowserRouter>
            <div className="App">
                <Secure/>
            </div>
        </BrowserRouter>
    );
}

export default App;
