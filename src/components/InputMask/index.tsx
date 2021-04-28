import React, {
  useEffect,
  useRef,
  useState,
  useCallback,
} from 'react';

import ReactInputMask, { Props } from 'react-input-mask';

import { IconBaseProps } from 'react-icons';
import { FiAlertCircle } from 'react-icons/fi';
import { useField } from '@unform/core';

import { Container, Error } from './styles';

interface InputProps extends Props {
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

const InputMask: React.FC<InputProps> = ({
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
  const inputMaskRef = useRef(null);
  const [isFocused, setIsFocused] = useState(false);
  const [isFilled, setIsFilled] = useState(false);
  const { fieldName, defaultValue, error, registerField } = useField(name);

  const handleInputFocus = useCallback(() => {
    setIsFocused(true);
  }, []);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputMaskRef.current,
      path: 'value',
    });
  }, [fieldName, registerField]);

  const handleInputBlur = useCallback(() => {
    setIsFocused(false);

    setIsFilled(!!inputMaskRef.current);
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

      <ReactInputMask
        name={name}
        onFocus={handleInputFocus}
        onBlur={handleInputBlur}
        defaultValue={defaultValue}
        value={defaultValue}
        ref={inputMaskRef}
        disabled={disabled}
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

export default InputMask;
