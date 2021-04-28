import React, {
  InputHTMLAttributes,
  useEffect,
  useRef,
  useState,
  useCallback,
} from 'react';
import { IconBaseProps } from 'react-icons';
import { FiAlertCircle } from 'react-icons/fi';
import { useField } from '@unform/core';

import { Container, Error } from './styles';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  disabled?: boolean;
  readOnly?: boolean;
  labelInput?: string;
  containerStyle?: {};
  mudarCor?: string;
  className?: string;
  icon?: React.ComponentType<IconBaseProps>;
  iconEnd?: React.ComponentType<IconBaseProps>;
  setIsOpen?: () => void;
  titleBotao?: string;
}

const Input: React.FC<InputProps> = ({
  name,
  disabled,
  readOnly,
  labelInput,
  containerStyle,
  mudarCor,
  className,
  icon: Icon,
  iconEnd: IconEnd,
  setIsOpen,
  titleBotao,
  ...rest
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isFocused, setIsFocused] = useState(false);
  const [isFilled, setIsFilled] = useState(false);
  const { fieldName, defaultValue, error, registerField } = useField(name);

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
      readOnlyInput={!!readOnly}
    >
      { labelInput && <label> {labelInput} </label>}

      { Icon && <Icon size={20} />}

      <input
        name={name}
        onFocus={handleInputFocus}
        onBlur={handleInputBlur}
        defaultValue={defaultValue}
        ref={inputRef}
        disabled={disabled}
        readOnly={readOnly}
        {...rest}
      />

      { IconEnd &&
        <button type="button" onClick={setIsOpen} title={titleBotao}>
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

export default Input;
