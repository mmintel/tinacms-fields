import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { useDropzone } from 'react-dropzone';
import { IconButton } from '@tinacms/styles';
import { TrashIcon } from '@tinacms/icons';
import AttachmentIcon from './attachment-icon';

const DropArea = styled.div`
  border-radius: var(--tina-radius-small);
  flex: 1;
  display: flex;
  flex-direction: column;
  outline: none;
  cursor: pointer;
  margin-top: var(--tina-padding-small);
  margin-bottom: var(--tina-padding-small);
`;

const FilePlaceholder = styled.div`
  text-align: center;
  border-radius: var(--tina-radius-small);
  background-color: var(--tina-color-grey-2);
  color: var(--tina-color-grey-4);
  line-height: 1.35;
  padding: 12px 0;
  font-size: var(--tina-font-size-2);
  font-weight: 500;
  transition: all 85ms ease-out;
  &:hover {
    opacity: 0.6;
  }
`;

const FileUploadPreview = styled.div`
  max-width: 100%;
  min-height: 100px;
  border-radius: var(--tina-radius-small);
  transition: opacity var(--tina-timing-short) ease-out;
  margin: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #e1ddec;
  background-size: auto;
  background-position: center center;
  background-repeat: no-repeat;

  svg {
    width: 64px !important;
    height: 64px !important;
    color: var(--tina-color-grey-0);
  }
`;

const DeleteButton = styled(IconButton)`
  top: 8px;
  right: 8px;
  position: absolute;
  &:not(:hover) {
    fill: var(--tina-color-grey-0);
    background-color: transparent;
    border-color: transparent;
  }
`;

const FilePreviewContainer = styled.div`
  background-color: var(--tina-color-grey-4);
  position: relative;
  border-radius: var(--tina-radius-small);
  overflow: hidden;
  background-color: var(--tina-color-grey-8);
  &:hover {
    ${FileUploadPreview} {
      opacity: 0.6;
    }
  }
`;

const FileUpload = ({
  onDrop,
  onClear,
  value,
  accept,
}) => {
  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject,
  } = useDropzone({ accept, onDrop });

  return (
    <DropArea {...getRootProps({ isDragActive, isDragAccept, isDragReject })}>
      <input {...getInputProps()} />
      {value ? (
        <FilePreviewContainer>
          <FileUploadPreview>
            <AttachmentIcon />
          </FileUploadPreview>
          {onClear && (
            <DeleteButton
              onClick={(e) => {
                e.stopPropagation();
                onClear();
              }}
            >
              <TrashIcon />
            </DeleteButton>
          )}
        </FilePreviewContainer>
      ) : (
        <FilePlaceholder>
          Drag &apos;n&apos; drop some files here,
          <br />
          or click to select files
        </FilePlaceholder>
      )}
    </DropArea>
  );
};

FileUpload.defaultProps = {
  accept: undefined,
};

FileUpload.propTypes = {
  onDrop: PropTypes.func.isRequired,
  onClear: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
  accept: PropTypes.string,
};

export default FileUpload;
