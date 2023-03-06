import React from 'react';
import { ErrorMessage, useField } from 'formik';

const BrokenDeviceSelectBox = ({ label, ...props}) => {
    const [field, meta] = useField(props);
    return (
            <div>
            <label htmlFor={field.name} className="form-label mt-3">{label}</label>
                <select 
                className={`form-control shadow-none ${meta.touched && meta.error && `is-invalid`}`}
                {...field} {...props}
                defaultValue={'Broken Status'}
                placeholder="Select Broken Status" 
                >
                <option>Select broken status</option>   
                <option value="false">Unbroken</option>
                <option value="true">Broken</option>
                </select>
            <ErrorMessage component="div" name={field.name} className="error" />
        </div>
    )
};

export default BrokenDeviceSelectBox;
