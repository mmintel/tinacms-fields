import React from 'react'
import PropTypes from 'prop-types'
import styled, { css } from 'styled-components'

import SingleRelation from './single-relation'
import MultipleRelations from './multiple-relations'

const Relation = ({ multiple, ...props }) => {
  if (multiple) {
    return <MultipleRelations {...props} />
  }

  return <SingleRelation {...props} />
}

Relation.defaultProps = {
  multiple: false
}

Relation.propTypes = {
  multiple: PropTypes.bool
}

export default Relation

export const RelationBody = styled.div`
  margin-bottom: 1.5rem;
`

export const RelationHeader = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.75rem;
`

export const FieldLabel = styled.label`
  margin: 0;
  font-size: var(--tina-font-size-1);
  font-weight: 600;
  flex: 1 1 auto;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  color: var(--tina-color-grey-7);
  transition: all 85ms ease-out;
  text-align: left;

  ${props =>
    props.error &&
    css`
      color: var(--tina-color-error) !important;
    `};
`
