import React, { useState } from 'react';
import axios from 'axios';
import {ClipLoader} from "react-spinners"

const QueryForm = () => {
    const [query, setQuery] = useState('');
    const [response, setResponse] = useState('');
    const [loader, setLoader] = useState(false);
    const [error, setError] = useState('');

    //handle query submission
    const handleQuery = async() => {
        if(!query){
            setResponse('Let your imagination run wild and ask any questions related to the PDF(s) uploaded')
            
            return;
        }

        setError('');
        setResponse('');
        setLoader(true);

        try{
            console.log('Sending query to backend', { text: query});

            const res = await axios.post('http://127.0.0.1:8000/query', { text: query }, {
                headers: {
                    'Content-Type' : 'application/json',
                },
            });
            console.log('Backend response:', res.data);
            setResponse(res.data.response);
        }
        catch(err){
            console.error("Error querying the backend", err);
            setResponse('Error processing query, please try again');
        }
        finally{
            setLoader(false);
        }
    };

    return (
        <div style = {{ textAlign: 'center', marginTop: '20px'}}>
            <h2>
                Ask a question
            </h2>
            <textarea
            placeholder="Type your query here..."
            value = {query}
            onChange = {(e) => setQuery(e.target.value)}
            rows ="4"
            cols = "50"
            style = {{resize: 'none', marginBottom: '10px' }}
            />
            <br />
            <button onClick = {handleQuery} disabled = {loader}>
                {loader ? 'Processing' : 'Submit Query'}
            </button>
            <br />
            {loader && (
                <div style = {{marginTop: '10px' }}>
                    <ClipLoader color = "#007bff" size = {30} />
                </div>
            )}
            {response && <p style={{ marginTop: '20px' }}>{response}</p>}
            {error && <p style={{ color: 'red', marginTop: '20px' }}>{error}</p>}
        </div>
    )
};
export default QueryForm;
