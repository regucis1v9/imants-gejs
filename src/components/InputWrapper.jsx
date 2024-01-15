import React from 'react';

const InputWrapper = ({ type, placeholder, value, onChange, error }) => {
    return (
        <div className="input-container">
            <input className="form-input" type={type} placeholder={placeholder} value={value} onChange={onChange} />
            <p className='input-error'>{error}</p>
        </div>
    );
};

export default InputWrapper;
