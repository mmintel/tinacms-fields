import React from 'react';
import PropTypes from 'prop-types';

import SingleRelation from './single-relation';
import MultipleRelations from './multiple-relations';

const Relation = (props) => {
  if (props.field.multiple) {
    return <MultipleRelations {...props} />;
  }

  return <SingleRelation {...props} />;
};

Relation.defaultProps = {
  field: {},
};

Relation.propTypes = {
  field: PropTypes.shape({
    multiple: PropTypes.bool,
  }),
};

export default Relation;
