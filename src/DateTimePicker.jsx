import React from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendar } from '@fortawesome/free-solid-svg-icons';

const DateTimePicker = ({ dueDate, setDueDate }) => {
    const handleChange = (date) => {
        setDueDate(date);
    };

    return (
        <div className="datetime-picker">
            <DatePicker
                selected={dueDate ? new Date(dueDate) : null}
                onChange={handleChange}
                showTimeSelect
                timeFormat="HH:mm"
                timeIntervals={15}
                dateFormat="Pp"
                placeholderText=""
                className="datepicker-input"
            />
            <FontAwesomeIcon icon={faCalendar} className="calendar-icon" />
        </div>
    );
};

export default DateTimePicker;
