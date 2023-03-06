import React from 'react';
import { ErrorMessage, useField } from 'formik';

const DeviceTypeSelectbox = ({ label, ...props}) => {
    const [field, meta] = useField(props);
    return (
            <div>
            <label htmlFor={field.name} className="form-label mt-3">{label}</label>
                <select 
                className={`form-control shadow-none ${meta.touched && meta.error && `is-invalid`}`}
                {...field} {...props}
                placeholder="Select Device Type" 
                >
                <option>Select device type</option>
                <option value="bp">Cuff</option>
                <option value="weight">Weight</option>
                <option value="spO2">Spo2</option>
                </select>
            <ErrorMessage component="div" name={field.name} className="error" />
        </div>
    )
};

export default DeviceTypeSelectbox;
