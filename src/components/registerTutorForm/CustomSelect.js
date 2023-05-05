import React from 'react';
import Select from 'react-select';

const customSelect = ({ onChange, options, value, className }) => {

    const defaultValue = (options, value) => {
        return options ? options.find(option => option.value === value) : "";
    };

    return (
        <div className={className} data-testid={className}>
            <Select
                id={className}
                name={className}
                placeholder="Select a subject"
                type='text'
                value={defaultValue(options, value)}
                onChange={value => {
                    onChange(value)

                }} options={options} />
        </div>

    )
}

export default customSelect