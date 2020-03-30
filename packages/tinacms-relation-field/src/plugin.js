import React from 'react';
import PropTypes from 'prop-types';
import Relation from './components/relation';

export default class {
  constructor(tinacms) {
    this.tinacms = tinacms;
  }

  install(fields) {
    if (fields) {
      fields.forEach((field) => {
        this.add(field);
      });
    }

    this.tinacms.fields.add({
      name: 'relation',
      Component: Relation,
    });
  }

  add({
    name, hook, itemProps, noDataText, sortable, multiple,
  }) {
    const Component = ({ field, input, form }) => {
      const data = hook();

      const newField = {
        ...field,
        data,
        itemProps,
        noDataText,
        sortable,
        multiple,
      };

      return (
        <Relation
          form={form}
          input={input}
          field={newField}
        />
      );
    };

    Component.propTypes = {
      field: PropTypes.shape({}).isRequired,
      input: PropTypes.shape({}).isRequired,
      form: PropTypes.shape({}).isRequired,
    };

    this.tinacms.fields.add({
      name,
      Component,
    });
  }
}

export {
  Relation,
};
