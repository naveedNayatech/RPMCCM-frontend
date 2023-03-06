import React from 'react';
import { ErrorMessage, useField } from 'formik';

const Selectbox = ({ label, ...props}) => {
    const [field, meta] = useField(props);
    return (
        <div className="mb-2">
            <label htmlFor={field.name} className="form-label mt-3">{label}</label>
                <select 
                className={`form-control shadow-none ${meta.touched && meta.error && `is-invalid`}`}
                {...field} {...props}
                autoComplete="off"
                placeholder="Enter your email" 
                >
                <option value="admin">Admin</option>
                <option value="doctor">Doctor</option>
                <option value="nurse">Nurse</option>
                </select>
            <ErrorMessage component="div" name={field.name} className="error" />
        </div>
    )
}

export default Selectbox
