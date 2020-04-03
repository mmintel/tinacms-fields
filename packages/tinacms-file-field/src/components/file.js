import PropTypes from 'prop-types';
import React from 'react';
import { useCMS } from 'tinacms';
import styled, { css } from 'styled-components';
import FileUpload from './file-upload';

const FieldLabel = styled.label`
  display: block;
  font-size: var(--tina-font-size-1);
  font-weight: 600;
  flex: 1 1 auto;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  color: var(--tina-color-grey-7);
  transition: all 85ms ease-out;
  text-align: left;

  ${(props) => props.error
    && css`
      color: var(--tina-color-error) !important;
    `};
`;

const FieldDescription = styled.p`
  color: var(--tina-color-grey-6);
  font-size: var(--tina-font-size-0);
  font-style: italic;
  font-weight: lighter;
  padding-top: 4px;
  white-space: normal;
  margin: 0;
`;


const File = ({ input, field, form }) => {
  const cms = useCMS();

  const defaultUploadDir = (formValues) => {
    const path = formValues.fileRelativePath.split('/').slice(0, -1).join('/');
    return path;
  };
  const uploadDir = field.uploadDir || defaultUploadDir;

  return (
    <FileUploadField>
      { field.label && (
        <FieldLabel>{field.label}</FieldLabel>
      )}
      { field.description && (
        <FieldDescription>{field.description}</FieldDescription>
      )}
      <FileUpload
        value={input.value}
        accept={field.accept}
        onDrop={async ([file]) => {
          const directory = uploadDir(form.getState().values);
          const [media] = await cms.media.store.persist([
            {
              directory,
              file,
            },
          ]);
          if (media) {
            input.onChange(media.filename);
          } else {
          // TODO Handle failure
          }
        }}
        onClear={
        field.clearable === false
          ? undefined
          : () => {
            input.onChange('');
          }
      }
      />
    </FileUploadField>
  );
};

const FileUploadField = styled.div`
  margin-bottom: var(--tina-padding-big);
`;

File.propTypes = {
  input: PropTypes.shape({
    value: PropTypes.any,
    onChange: PropTypes.func,
  }).isRequired,
  field: PropTypes.shape({
    label: PropTypes.string,
    accept: PropTypes.string,
    description: PropTypes.string,
    uploadDir: PropTypes.func,
    clearable: PropTypes.bool,
  }).isRequired,
  form: PropTypes.shape({
    getState: PropTypes.func,
  }).isRequired,
};

export default File;
