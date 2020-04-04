import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import {
  AddIcon, DragIcon, ReorderIcon, TrashIcon,
} from '@tinacms/icons';
import {
  IconButton,
} from '@tinacms/styles';
import { FormHeader, FormBody, FieldLabel } from './form';

const MultipleRelations = ({ input, field, form }) => {
  const [visible, setVisible] = React.useState(false);
  const [availableData, setAvailableData] = React.useState(field.data);
  const value = input.value || [];

  React.useEffect(() => {
    setAvailableData(field.data);
  }, [field.data]);

  React.useEffect(() => {
    const newAvailableData = field.data.filter((i) => !value.includes(i.key));
    setAvailableData(newAvailableData);
  }, [value]);

  const addRelation = React.useCallback(
    (value) => {
      form.mutators.insert(field.name, 0, value);
    },
    [field.name, form.mutators],
  );

  const moveArrayItem = React.useCallback(
    (result) => {
      if (!result.destination || !form) return;
      const name = result.type;
      form.mutators.move(
        name,
        result.source.index,
        result.destination.index,
      );
    },
    [form],
  );

  const removeRelation = (index, field) => {
    form.mutators.remove(field.name, index);
  };

  return (
    <DragDropContext onDragEnd={moveArrayItem}>
      <FormHeader>
        <FieldLabel>{field.label}</FieldLabel>
        { !!availableData.length && (
          <>
            <IconButton
              primary
              small
              onClick={() => setVisible(!visible)}
              open={visible}
            >
              <AddIcon />
            </IconButton>
            <RelationMenu open={visible}>
              <RelationMenuList>
                {availableData.map((item) => {
                  const props = field.itemProps(item);
                  return (
                    <RelationOption
                      // eslint-disable-next-line react/prop-types
                      key={props.key}
                      onClick={() => {
                        // eslint-disable-next-line react/prop-types
                        addRelation(props.key);
                        setVisible(false);
                      }}
                    >
                      { // eslint-disable-next-line react/prop-types
                        props.label
                      }
                    </RelationOption>
                  );
                })}
              </RelationMenuList>
            </RelationMenu>
          </>
        )}
      </FormHeader>
      <Droppable droppableId={field.name} type={field.name}>
        {(provider) => (
          <FormBody ref={provider.innerRef}>
            {field.data.length === 0 && (
              <EmptyList>{field.noDataText}</EmptyList>
            )}
            {value.map((key, index) => {
              const item = field.data.find((item) => field.itemProps(item).key === key);
              return (
                <RelationListItem
                  item={field.itemProps(item)}
                  form={form}
                  field={field}
                  index={index}
                  key={key}
                  onRemove={removeRelation}
                  isDragDisabled={field.sortable === false || value.length <= 1}
                />
              );
            })}
            {provider.placeholder}
          </FormBody>
        )}
      </Droppable>
    </DragDropContext>
  );
};

MultipleRelations.propTypes = {
  input: PropTypes.shape({
    value: PropTypes.any,
  }).isRequired,
  field: PropTypes.shape({
    itemProps: PropTypes.func,
    data: PropTypes.arrayOf(PropTypes.object),
    noDataText: PropTypes.string,
    name: PropTypes.string,
    label: PropTypes.string,
    sortable: PropTypes.bool,
  }).isRequired,
  form: PropTypes.shape({
    mutators: PropTypes.shape({
      insert: PropTypes.func,
      move: PropTypes.func,
      remove: PropTypes.func,
    }),
  }).isRequired,
};

export default MultipleRelations;

const RelationListItem = ({
  item, form, field, index, onRemove, isDragDisabled,
}) => {
  const handleRemove = React.useCallback(() => {
    onRemove(index, field);
  }, [form, field, index]);

  return (
    <Draggable
      key={index}
      type={field.name}
      draggableId={`${field.name}.${index}`}
      index={index}
      isDragDisabled={isDragDisabled}
    >
      {(provider, snapshot) => (
        <ListItem
          ref={provider.innerRef}
          isDragging={snapshot.isDragging}
          {...provider.draggableProps}
          {...provider.dragHandleProps}
        >
          { !isDragDisabled && (
            <DragHandle />
          )}
          <ItemLabel>
            {item && item.label ? (
              item.label
            ) : (
              <Placeholder>Unknown Item</Placeholder>
            )}
          </ItemLabel>
          <DeleteButton onClick={handleRemove}>
            <TrashIcon />
          </DeleteButton>
        </ListItem>
      )}
    </Draggable>
  );
};

RelationListItem.propTypes = {
  index: PropTypes.number.isRequired,
  field: PropTypes.shape({
    name: PropTypes.string,
    mutators: PropTypes.shape({
      insert: PropTypes.func,
      move: PropTypes.func,
      remove: PropTypes.func,
    }),
  }).isRequired,
  form: PropTypes.shape({}).isRequired,
  item: PropTypes.shape({
    key: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    label: PropTypes.string,
  }).isRequired,
  onRemove: PropTypes.func.isRequired,
  isDragDisabled: PropTypes.bool.isRequired,
};

const Placeholder = styled.span`
  opacity: 0.3;
  text-transform: italic;
`;

const DragHandle = styled(({ ...styleProps }) => (
  <div {...styleProps}>
    <DragIcon />
    <ReorderIcon />
  </div>
))`
  margin: 0;
  flex: 0 0 auto;
  width: 2rem;
  position: relative;
  fill: inherit;
  padding: 0.75rem 0;
  transition: all 85ms ease-out;
  svg {
    position: absolute;
    left: 50%;
    top: 50%;
    width: 1.25rem;
    height: 1.25rem;
    transform: translate3d(-50%, -50%, 0);
    transition: all 85ms ease-out;
  }
  svg:last-child {
    opacity: 0;
  }
`;

const EmptyList = styled.div`
  text-align: center;
  border-radius: var(--tina-radius-small);
  background-color: var(--tina-color-grey-2);;
  color: var(--tina-color-grey-4);
  line-height: 1.35;
  padding: 0.75rem 0;
  font-size: var(--tina-font-size-2);
  font-weight: 500;
`;

const ItemLabel = styled.label`
  margin: 0;
  font-size: var(--tina-font-size-2);
  font-weight: 500;
  flex: 1 1 auto;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  align-self: center;
  color: inherit;
  transition: all 85ms ease-out;
  text-align: left;
  padding: 0 0.5rem;
  pointer-events: none;

  ${(props) => props.error
    && css`
      color: var(--tina-color-error) !important;
    `};
`;

const DeleteButton = styled.button`
  text-align: center;
  flex: 0 0 auto;
  border: 0;
  background: transparent;
  cursor: pointer;
  padding: 0.75rem 0.5rem;
  margin: 0;
  transition: all 85ms ease-out;
  &:hover {
    background-color: var(--tina-color-grey-2);
  }
`;

const ListItem = styled.div`
  position: relative;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: stretch;
  background-color: white;
  border: 1px solid var(--tina-color-grey-2);
  margin: 0 0 -1px 0;
  overflow: visible;
  line-height: 1.35;
  padding: 0;
  font-size: var(--tina-font-size-2);
  font-weight: 500;

  ${ItemLabel} {
    color: #282828;
    align-self: center;
    max-width: 100%;
  }

  svg {
    fill: var(--tina-color-grey-3);
    width: 1.25rem;
    height: auto;
    transition: fill 85ms ease-out;
  }

  &:hover {
    background-color: #f6f6f9;
    cursor: grab;

    ${ItemLabel} {
      color: #0084ff;
    }
    ${DeleteButton} {
      svg {
        fill: var(--tina-color-grey-4);
      }
      &:hover {
        svg {
          fill: var(--tina-color-grey-8);
        }
      }
    }
    ${DragHandle} {
      svg {
        fill: var(--tina-color-grey-8);
      }
      svg:first-child {
        opacity: 0;
      }
      svg:last-child {
        opacity: 1;
      }
    }
  }

  &:first-child {
    border-radius: 0.25rem 0.25rem 0 0;
  }

  &:nth-last-child(2) {
    border-radius: 0 0 0.25rem 0.25rem;
    &:first-child {
      border-radius: var(--tina-radius-small);
    }
  }

  ${(p) => p.isDragging
    && css`
      border-radius: var(--tina-radius-small);
      box-shadow: 0px 2px 3px rgba(0, 0, 0, 0.12);

      svg {
        fill: var(--tina-color-grey-8);
      }
      ${ItemLabel} {
        color: #0084ff;
      }

      ${DragHandle} {
        svg:first-child {
          opacity: 0;
        }
        svg:last-child {
          opacity: 1;
        }
      }
    `};
`;

const RelationMenu = styled.div`
  min-width: 12rem;
  border-radius: var(--tina-radius-small);
  border: 1px solid #efefef;
  display: block;
  position: absolute;
  top: 0;
  right: 0;
  transform: translate3d(0, 0, 0) scale3d(0.5, 0.5, 1);
  opacity: 0;
  pointer-events: none;
  transition: all 150ms ease-out;
  transform-origin: 100% 0;
  box-shadow: var(--tina-shadow-big);
  background-color: white;
  overflow: hidden;
  z-index: 100;
  ${(props) => props.open
    && css`
      opacity: 1;
      pointer-events: all;
      transform: translate3d(0, 2.25rem, 0) scale3d(1, 1, 1);
    `};
`;

const RelationMenuList = styled.div`
  display: flex;
  flex-direction: column;
`;

const RelationOption = styled.button`
  position: relative;
  text-align: center;
  font-size: var(--tina-font-size-0);
  padding: var(--tina-padding-small);
  font-weight: 500;
  width: 100%;
  background: none;
  cursor: pointer;
  outline: none;
  border: 0;
  transition: all 85ms ease-out;
  &:hover {
    color: var(--tina-color-primary);
    background-color: #f6f6f9;
  }
  &:not(:last-child) {
    border-bottom: 1px solid #efefef;
  }
`;
