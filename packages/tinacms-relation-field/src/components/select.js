import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Select = ({
  input, field, options, noDataText,
}) => (
  <SelectElement>
    <select
      id={input.name}
      value={input.value}
      onChange={input.onChange}
      disabled={field.disabled}
      {...input}
    >
      {options ? (
        options.map((option) => (
          <option value={option.key} key={option.key}>
            {option.label}
          </option>
        ))
      ) : (
        <option>{noDataText}</option>
      )}
    </select>
  </SelectElement>
);

Select.propTypes = {
  noDataText: PropTypes.string.isRequired,
  input: PropTypes.shape({
    name: PropTypes.string,
    value: PropTypes.any,
    onChange: PropTypes.func,
  }).isRequired,
  field: PropTypes.shape({
    disabled: PropTypes.bool,
  }).isRequired,
  options: PropTypes.arrayOf(PropTypes.shape({
    key: PropTypes.string,
    label: PropTypes.string,
  })).isRequired,
};

export default Select;

const SelectElement = styled.div`
  display: block;
  position: relative;

  select {
    display: block;
    font-family: inherit;
    max-width: 100%;
    padding: var(--tina-padding-small);
    border-radius: var(--tina-radius-small);
    background: var(--tina-color-grey-0);
    font-size: var(--tina-font-size-2);
    line-height: 1.35;
    position: relative;
    background-color: var(--tina-color-grey-0);
    transition: all 85ms ease-out;
    border: 1px solid var(--tina-color-grey-2);
    width: 100%;
    margin: 0;
    appearance: none;
    outline: none;
    background-image: url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%23007CB2%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E');
    background-repeat: no-repeat;
    background-position: right 0.7em top 50%;
    background-size: 0.65em auto;

    &[disabled] {
      background-image: none;
    }
  }
`;
