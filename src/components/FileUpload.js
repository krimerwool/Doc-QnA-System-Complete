import React, {useState} from 'react';
import axios from 'axios';
import { ClipLoader } from "react-spinners"
// import '../styles/FileUpload.css'

const FileUpload = () => {
    const [file, setFile] = useState(null);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');

    //handle file selection
    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        console.log('Selected File:', selectedFile);
        setFile(selectedFile);
    };

    //handle file upload
    const handleUpload = async() =>{
        if(!file){
            setMessage('No file uploaded, Please Upload');
            return;
        }
        setLoading(true);
        setMessage("");
        const formData = new FormData();
        formData.append('file', file);
        console.log("Sending file to backend:", file);

        try{
            const response = await axios.post('http://127.0.0.1:8000/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            setMessage(response.data.message)
        }
        catch(error){
            console.error(error);
            setMessage('Error uploading file, Please try again.');
        }
        finally{
            setLoading(false);
        }
    };

    return (
        <div style = {{textAlign: 'center',marginTop: '20px'}}>
            <h2> Upload a PDF</h2>
            <input type="file" accept = ".pdf" onChange={handleFileChange} />
            <button onClick={handleUpload} disabled = {loading}>
                {loading ? "Uploading..." : "Upload"}
            </button>
            {loading && <ClipLoader color = "#007bff" size = {30}></ClipLoader>}
            {message && <p>{message}</p>}
        </div>
    )
}
export default FileUpload