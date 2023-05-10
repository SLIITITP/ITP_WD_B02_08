import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const MyForm = () => {
    const [subjectName, setSubjectName] = useState("");

    const handleChange = (e) => {
        const input = e.target.value;
        if (/^\d+$/.test(input)) {
            toast.error("Please enter text only");
            return;
        }
        setSubjectName(input);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // handle form submission
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label>
                    Subject Name:
                    <input type="text" value={subjectName} onChange={handleChange} />
                </label>
                <button type="submit">Submit</button>
            </form>
            <ToastContainer />
        </div>
    );
};

export default MyForm;
