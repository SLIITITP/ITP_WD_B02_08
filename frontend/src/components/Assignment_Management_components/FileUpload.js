import React ,{Fragment,useState} from 'react';
import axios from 'axios';


const FileUpload = ()  =>{

    //setting up status and handling status

    const [file,setFile] = useState('');
    const [filename,setFilename] = useState('Choose File');
    const [uploadedFiles,setUploadedFile] = useState({});
    const [message,setMessage,setUploadPercentage] = useState(0);

    const onChange = e=>{

        //single file upload
        setFile(e.target.files[0]);
        setFilename(e.target.files[0].name);
    }

    const onSubmit = async e =>{

        e.preventDefault();

        const formData = new FormData();
    }
}


