import React from 'react'
import { useState } from 'react';
import '../style.css'

type SelectOption={
    label: string
    value: any
}

type SelectProps={
    options: SelectOption[]
    onChange:(value:SelectOption | undefined) => void
    value?:SelectOption
}

export function Selector({ value, onChange, options, placeholder = "Press me" }) {
    const [selectedValues, setSelectedValues] = useState(value || []);
  
    const handleOptionClick = (option) => {
      let updatedValues;
      if (selectedValues.includes(option.value)) {
        updatedValues = selectedValues.filter(v => v !== option.value);
      } else {
        updatedValues = [...selectedValues, option.value];
      }
      setSelectedValues(updatedValues);
      if (onChange) {
        onChange(updatedValues);
      }
    };
  
    const handleRemoveClick = (value) => {
      const updatedValues = selectedValues.filter(v => v !== value);
      setSelectedValues(updatedValues);
      if (onChange) {
        onChange(updatedValues);
      }
    };
  
    return (
      <div tabIndex={0} className="container_selector">
        <div className="container_selector_values">
          {selectedValues.length === 0 && <span className="container_selector_placeholder">{placeholder}</span>}
          {selectedValues.map(val => (
            <span key={val} className="container_selector_selected">
              {options.find(option => option.value === val).label}
              <span className="container_selector_remove" onClick={() => handleRemoveClick(val)}>✖</span>
            </span>
          ))}
        </div>
        <div className="container_selector_caret"></div>
        <ul className="container_selector_options">
          {options.map(option => (
            <li
              key={option.value}
              className={`container_selector_option ${selectedValues.includes(option.value) ? 'selected' : ''}`}
              onClick={() => handleOptionClick(option)}
            >
              {option.label}
            </li>
          ))}
        </ul>
      </div>
    );
  }