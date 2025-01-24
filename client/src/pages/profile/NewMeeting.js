import { DateTimePicker } from '@mui/x-date-pickers'
import { useState } from 'react';
import dayjs from 'dayjs';
import { Snackbar, Alert } from '@mui/material';
import axiosInstance from 'utils/axiosInstance';

// supposed to be modular

function NewMeeting() {
    const [formData, setFormData] = useState({
        student: '',
        datetime: dayjs(),
    });
    const [message, setMessage] = useState('');
    const [severity, setSeverity] = useState('error');
    const [open, setOpen] = useState(false);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleDateChange = (newValue) => {
        setFormData((prev) => ({ ...prev, datetime: newValue }));
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axiosInstance.post('/create-meeting', formData);
            console.log("response", response.data);

            setMessage(response.data.message);
            setSeverity('success');
            formData.student = '';
            formData.datetime = dayjs();
            setOpen(true);
        } catch (error) {
            setMessage('Error: cannot create meeting. Please try again later.');
            setSeverity('error');
            setOpen(true);
        }
    };

    return (
        <div className="container mt-5">
            <h2>Create New Meeting</h2>
            <Snackbar
                open={open}
                autoHideDuration={5000} // Auto close after 5 seconds
                onClose={handleClose}
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }} // Positioning
            >
                <Alert onClose={handleClose} severity={severity} sx={{ width: '100%' }}>
                    {message}
                </Alert>
            </Snackbar>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="student">Name:</label> {/* edit to choose available students to make meeting with.. */}
                    <input
                        type="text"
                        id="student"
                        name="student"
                        value={formData.student}
                        onChange={handleInputChange}
                        className="form-control"
                        required
                    />

                    <br />

                    <label>Date and Time:</label>
                    <br />
                    <DateTimePicker
                        value={formData.datetime}
                        onChange={handleDateChange}
                        sx={{
                            '& .MuiInputBase-root': {
                                backgroundColor: 'white', // input box white
                                color: 'black',
                            }
                        }}
                    />
                </div>

                <br />

                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    );
}

export default NewMeeting;