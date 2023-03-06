import React from 'react'
import { ErrorMessage, useField } from 'formik';


const TextField = ({ label, placeholder, ...props }) => {
    
    const [field, meta] = useField(props); 

    return (
        <div className="mb-2">
            <label htmlFor={field.name} className="form-label mt-3">{label}</label>
            <input 
                className={`form-control shadow-none ${meta.touched && meta.error && `is-invalid`}`}
                {...field} {...props}
                placeholder={placeholder}
                autocomplete="new-password"
            />
            <ErrorMessage component="div" name={field.name} className="error" /> 
        </div>
    )
}

export default TextField
