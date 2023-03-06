import React from 'react';
import { ErrorMessage, useField } from 'formik';

const ConsentRoleSelectBox = ({ label, ...props}) => {
    const [field, meta] = useField(props);
    return (
            <div>
            <label htmlFor={field.name} className="form-label mt-3">{label}</label>
                <select 
                className={`form-control shadow-none ${meta.touched && meta.error && `is-invalid`}`}
                {...field} {...props}
                autoComplete="off" 
                >
                <option>Select Consent Role</option>    
                    <option value="RPM">RPM</option>
                    <option value="CCM">CCM</option>
                    <option value="Both">Both</option>
                </select>
            <ErrorMessage component="div" name={field.name} className="error" />
        </div>
    )
};

export default ConsentRoleSelectBox;
