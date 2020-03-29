import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';
import { FieldsBuilder } from '@tinacms/form-builder';

const Condition = ({ input, field, form }) => {
  const nestedFields = field.fields(input.value);
  let conditionalFields = [];

  if (nestedFields) {
    conditionalFields = nestedFields.map((f) => {
      let { name } = f;

      if (name.includes('frontmatter')) {
        name = name.replace('frontmatter', 'rawFrontmatter');
      }

      if (field.name.includes('rawJson')) {
        const fieldPath = field.name.split('.').slice(0, -1);
        name = fieldPath.concat(name).join('.');
      }

      return {
        ...f,
        name,
      };
    });
  }

  const fields = [
    {
      ...field.trigger,
      name: field.name,
      label: field.label,
    },
    ...conditionalFields,
  ];

  return (
    <ConditionalField>
      <FieldsBuilder fields={fields} form={form} />
    </ConditionalField>
  );
};

const ConditionalField = styled.div`
  margin-top: calc(var(--tina-padding-big) * -1);
  margin-left: calc(var(--tina-padding-big) * -1);
  margin-right: calc(var(--tina-padding-big) * -1);
`;

Condition.propTypes = {
  input: PropTypes.shape({
    value: PropTypes.any,
  }).isRequired,
  field: PropTypes.shape({
    name: PropTypes.string,
    label: PropTypes.string,
    trigger: PropTypes.shape({
      component: PropTypes.string,
    }),
    fields: PropTypes.func,
  }).isRequired,
  form: PropTypes.shape({}).isRequired,
};

export default Condition;
