import { Button, Input, CloseSVG } from '@ensdomains/thorin'
import styled, { css } from 'styled-components'
import React, { ComponentProps, forwardRef, Ref, ReactNode } from 'react'
import UnsupportedSVG from '@app/assets/Unsupported.svg'
import { useDefaultRef } from '../../../hooks/useDefaultRef'

const Container = styled.div(
  () => css`
    display: flex;
    align-items: flex-end;
    gap: 5px;
    position: relative;
  `,
)

const InputWrapper = styled.div<{ $error: boolean }>(
  ({ theme, $error }) => css`
    flex: 1;
    position: relative;
    ${$error && `margin-bottom: -${theme.space['2']};`}
  `,
)

const ButtonContainer = styled.div<{ $readOnly?: boolean }>(
  ({ theme }) => css`
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    width: ${theme.space['8']};
    height: ${theme.space['8']};
    margin-bottom: ${theme.space['3.5']};
    margin-right: -10px;
    svg {
      display: block;
      path {
        fill: ${theme.colors.textSecondary};
      }
    }
  `,
)

const ErrorWrapper = styled.div(
  ({ theme }) => css`
    position: absolute;
    right: ${theme.space['4']};
    top: 0;
  `,
)

type ThorinInputProps = ComponentProps<typeof Input>
type Props = {
  validated?: boolean
  showDefaultPrefix?: boolean
  label?: string
  onDelete?: () => void
  onClear?: () => void
  option?: {
    value: string
    label?: string
    prefix?: ReactNode
  }
} & Omit<ThorinInputProps, 'label'>

export const RecordInput = forwardRef(
  (
    {
      value,
      readOnly,
      error: errorProp,
      validated,
      showDefaultPrefix = false,
      showDot,
      onDelete,
      onClear,
      showDot: showDotProp,
      prefix: prefixProp,
      label: labelProp,
      option,
      placeholder = 'Enter value here',
      ...props
    }: Props,
    ref: Ref<HTMLInputElement>,
  ) => {
    const inputRef = useDefaultRef<HTMLInputElement>(ref)

    const prefix =
      prefixProp ||
      option?.prefix ||
      (showDefaultPrefix ? <UnsupportedSVG /> : undefined)

    const error = errorProp ? (
      <ErrorWrapper>{errorProp}</ErrorWrapper>
    ) : undefined

    const label = labelProp || option?.label || option?.value || ''

    const handleButtonClick = () => {
      if (onDelete) onDelete()
    }

    return (
      <Container data-testid={`record-input-${label}`}>
        <InputWrapper $error={!!error}>
          <Input
            size="medium"
            value={value}
            ref={inputRef}
            prefix={prefix}
            showDot={showDot}
            label={label}
            padding="3.5"
            error={error}
            placeholder={placeholder}
            labelPlacement={{ error: 'bottom' }}
            data-testid="record-input-input"
            validated={validated}
            {...props}
          />
        </InputWrapper>
        <ButtonContainer>
          <Button
            size="extraSmall"
            variant="transparent"
            shadowless
            onClick={handleButtonClick}
            data-testid="record-input-delete"
          >
            <CloseSVG />
          </Button>
        </ButtonContainer>
      </Container>
    )
  },
)
