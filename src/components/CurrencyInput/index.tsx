import React, {
  useEffect,
  useRef,
  useState,
  useCallback,
  useMemo,
} from 'react';
import { IconBaseProps } from 'react-icons';
import { FiAlertCircle } from 'react-icons/fi';
import { useField } from '@unform/core';

import MaskedInput, { MaskedInputProps } from 'react-text-mask';
import createNumberMask from 'text-mask-addons/dist/createNumberMask';

import { Container, Error } from './styles';

interface InputProps extends MaskedInputProps {
  name: string;
  disabled?: boolean;
  labelInput?: string;
  containerStyle?: {};
  mudarCor?: string;
  className?: string;
  icon?: React.ComponentType<IconBaseProps>;
  iconEnd?: React.ComponentType<IconBaseProps>;
  setIsOpen?: () => void;
}

interface IMaskedInput extends MaskedInput, HTMLInputElement{}

const CurrencyInput: React.FC<InputProps> = ({
  name,
  disabled,
  labelInput,
  containerStyle,
  mudarCor,
  className,
  icon: Icon,
  iconEnd: IconEnd,
  setIsOpen,
  ...rest
}) => {
  let inputRef = useRef<IMaskedInput>(null);
  const [isFocused, setIsFocused] = useState(false);
  const [isFilled, setIsFilled] = useState(false);
  const { fieldName, defaultValue, error, registerField } = useField(name);

  const [inputValue, setInputValue] = useState(defaultValue);

  useEffect(() => {
    setInputValue(defaultValue);
  }, [defaultValue]);

  const currencyMask = useMemo(() => {
    const defaultMaskOptions = {
      prefix: '',
      suffix: '',
      includeThousandsSeparator: true,
      thousandsSeparatorSymbol: '',
      allowDecimal: true,
      decimalSymbol: '.',
      decimalLimit: 2, // how many digits allowed after the decimal
      integerLimit: 7, // limit length of integer numbers
      allowNegative: false,
      allowLeadingZeroes: false,
    };

    return createNumberMask(defaultMaskOptions);
  }, []);

  const handleInputFocus = useCallback(() => {
    setIsFocused(true);
  }, []);

  const handleInputBlur = useCallback(() => {
    setIsFocused(false);

    setIsFilled(!!inputRef.current?.value);
  }, []);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: 'value',
    });
  }, [fieldName, registerField]);

  const handleInputOnKeyUp = useCallback((e) => {
    const valor = e.target.value;

    setInputValue(valor);
  }, []);

  return (
    <Container
      style={containerStyle}
      isErrored={!!error}
      isFilled={isFilled}
      isFocused={isFocused}
      data-testid="input-container"
      mudarCor={!!mudarCor}
      className={className}
      disabledInput={!!disabled}
    >
      { labelInput && <label> {labelInput} </label>}

      { Icon && <Icon size={20} />}

      <input
        name={name}
        defaultValue={inputValue}
        ref={inputRef}
        type="hidden"
        {...rest}
      />

      <MaskedInput
        mask={currencyMask} 
        name={name}
        onFocus={handleInputFocus}
        onBlur={handleInputBlur}
        defaultValue={inputValue}
        disabled={disabled}
        onKeyUp={e => { handleInputOnKeyUp(e) }}
        {...rest}
      />

      { IconEnd &&
        <button type="button" onClick={setIsOpen}>
          <IconEnd size={20} />
        </button>
      }

      {error && (
        <Error title={error}>
          <FiAlertCircle color="#c53030" size={20} />
        </Error>
      )}
    </Container>
  );
};

export default CurrencyInput;
