import React from 'react';
import { ErrorMessage, useField } from 'formik';

const GenderSelectbox = ({ label, ...props}) => {
    const [field, meta] = useField(props);
    return (
            <div>
            <label htmlFor={field.name} className="form-label mt-3">{label}</label>
                <select 
                className={`form-control shadow-none ${meta.touched && meta.error && `is-invalid`}`}
                {...field} {...props}
                autoComplete="off" 
                defaultValue={'Select Gender'}
                >
                <option>Select Gender</option>    
                <option value="male">Male</option>
                <option value="female">Female</option>
                </select>
            <ErrorMessage component="div" name={field.name} className="error" />
        </div>
    )
};

export default GenderSelectbox;
