import React, { useEffect, useState } from 'react';
import { Col, Table } from 'reactstrap';
import { toast } from 'react-toastify';
import nodata from '../../../images/nodata.svg';
import { useSelector } from 'react-redux';

const ShareZoneFileUpload = () => { // Pass roomname as a prop or state
    const [file, setFile] = useState(null);
    const [uploadedFiles, setUploadedFiles] = useState([]);

    const { actionData } = useSelector((state) => (state?.utilityCallFunctionSlice));
    // Handle file selection
    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
    };

    // Handle file upload
    const handleFileUpload = async () => {
        if (file) {
            const formData = new FormData();
            formData.append('file', file);

            try {
                const response = await fetch(`http://127.0.0.1:8000/upload/?roomname=${encodeURIComponent(actionData)}`, {
                    method: 'POST',
                    body: formData,
                });

                const result = await response.json();
                if (response.ok) {
                    setFile(null); // Clear file input
                    toast.success('File uploaded successfully');
                    fetchUploadedFiles(); // Fetch the list of uploaded files after upload
                } else {
                    toast.error(`Upload failed: ${result.message}`);
                }
            } catch (error) {
                toast.error('An error occurred while uploading the file');
            }
        } else {
            toast.warning('Please select a file');
        }
    };

    // Fetch the list of uploaded files
    const fetchUploadedFiles = async () => {
        try {
            const response = await fetch(`http://127.0.0.1:8000/files/${encodeURIComponent(actionData)}`);
            const result = await response.json();
            if (response.ok) {
                setUploadedFiles(result.data);
            } else {
                toast.error('Failed to fetch files');
            }
        } catch (error) {
            toast.error('An error occurred while fetching the files');
        }
    };

    // Handle file deletion
    const handleFileDelete = async (filename) => {
        try {
            const response = await fetch(`http://127.0.0.1:8000/files/${filename}/?roomname=${encodeURIComponent(actionData)}`, {
                method: 'DELETE',
            });

            const result = await response.json();
            if (response.ok) {
                toast.success('File deleted successfully');
                fetchUploadedFiles(); // Refresh the list of uploaded files
            } else {
                toast.error(`Deletion failed: ${result.message}`);
            }
        } catch (error) {
            toast.error('An error occurred while deleting the file');
        }
    };

    useEffect(() => {
        if (actionData) {
            fetchUploadedFiles(); // Fetch files when the component mounts
        }
    }, [actionData]);

    console.log("sharefileupload=>", actionData)
    return (
        <React.Fragment>
            <div className='al-pad pb-1'>
                <Col className='d-flex align-items-center'>
                    <input
                        type="file"
                        id="file"
                        name="file"
                        hidden
                        onChange={handleFileChange}
                    />
                    <div id="al_blockele">
                        <label htmlFor="file" className="al_choose">
                            <i className='icon_alfred_plus me-2'></i>
                            Add File
                        </label>
                    </div>
                    <button type="button" className="al_savebtn mb-1" onClick={handleFileUpload}>
                        Upload files
                    </button>
                </Col>
                <div>{file?.name}</div>
                <div className='wflexScroll d-flex flex-column mb-2'>
                    <div className='flex-grow-1'>
                        {uploadedFiles && uploadedFiles.length > 0 ?
                            <Table borderless responsive className='al_listtable pt-2 al-pad mb-0 al_approveusers'>
                                <thead>
                                    <tr>
                                        <th>Uploaded Files</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {uploadedFiles.map((file) => (
                                        <tr key={"one"}>
                                            <td><div className='al_text_link d-inline-block'>s00392-022-01996-2 (1).pdf</div></td>
                                            <td>
                                                <div className='d-flex gap-2'>
                                                    <button
                                                        type="button"
                                                        className='al_button_sm al_testbtn'
                                                    // onClick={() => handleFileDelete(file.filename)}
                                                    >
                                                        Delete
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>
                            :
                            <div className="d-flex flex-column align-items-center pt-5">
                                <img src={nodata} width={220} alt="No data" />
                                <h6 className="mt-3 mb-0">No data found!</h6>
                            </div>}
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
};

export default ShareZoneFileUpload;
