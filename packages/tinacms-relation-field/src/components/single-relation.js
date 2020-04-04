import React from 'react';
import PropTypes from 'prop-types';

import { FormHeader, FormBody, FieldLabel } from './form';
import Select from './select';

const SingleRelation = ({ input, field, form }) => {
  let { data } = field;
  const { values } = form.getState();

  if (field.filter) {
    data = data.filter((item) => field.filter(item, values));
  }

  const options = data.map((item) => field.itemProps(item));
  const selectOptions = [
    {
      key: null,
      label: '---',
    },
    ...options,
  ];

  return (
    <>
      <FormHeader>
        <FieldLabel>{field.label}</FieldLabel>
      </FormHeader>
      <FormBody>
        <Select
          input={input}
          field={field}
          options={selectOptions}
          noDataText={field.noDataText}
        />
      </FormBody>
    </>
  );
};

SingleRelation.propTypes = {
  input: PropTypes.shape({}).isRequired,
  field: PropTypes.shape({
    label: PropTypes.string,
    noDataText: PropTypes.string,
    data: PropTypes.arrayOf(PropTypes.object),
    itemProps: PropTypes.func,
    filter: PropTypes.func,
  }).isRequired,
  form: PropTypes.shape({
    getState: PropTypes.func,
  }).isRequired,
};

export default SingleRelation;
