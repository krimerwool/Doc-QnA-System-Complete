import React from 'react';
import FileUpload from './components/FileUpload';
import QueryForm from './components/QueryForm';
//port './styles/base.css';
import './App.css';

const App = () => {
    return (
        <div className="App" style = {{ textAlign: 'center', color: 'white',}}>
            <h1>QUERIFY        </h1>
            <FileUpload />
            <hr style={{ margin: '20px 0' }} />
            <QueryForm />
        </div>
    );
};

export default App;