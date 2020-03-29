import styled, { css } from 'styled-components'

export const FormBody = styled.div`
  margin-bottom: 1.5rem;
`

export const FormHeader = styled.div`
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

  ${(props) => props.error &&
    css`
      color: var(--tina-color-error) !important;
    `};
`
