import React, {
  useEffect,
  useRef,
  useState,
  useCallback,
  TextareaHTMLAttributes
} from 'react';
import { IconBaseProps } from 'react-icons';
import { FiAlertCircle } from 'react-icons/fi';
import { useField } from '@unform/core';

import { Container, Error } from './styles';

interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  name: string;
  disabled?: boolean;
  labelTextArea?: string;
  containerStyle?: {};
  mudarCor?: string;
  className?: string;
  icon?: React.ComponentType<IconBaseProps>;
  iconEnd?: React.ComponentType<IconBaseProps>;
  setIsOpen?: () => void;
}

const TextArea: React.FC<TextAreaProps> = ({
  name,
  disabled,
  labelTextArea,
  containerStyle,
  mudarCor,
  className,
  icon: Icon,
  iconEnd: IconEnd,
  setIsOpen,
  ...rest
}) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [isFocused, setIsFocused] = useState(false);
  const [isFilled, setIsFilled] = useState(false);
  const { fieldName, defaultValue, error, registerField } = useField(name);

  const handleTextAreaFocus = useCallback(() => {
    setIsFocused(true);
  }, []);

  const handleTextAreaBlur = useCallback(() => {
    setIsFocused(false);

    setIsFilled(!!textareaRef.current?.value);
  }, []);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: textareaRef.current,
      path: 'value',
    });
  }, [fieldName, registerField]);

  return (
    <Container
      style={containerStyle}
      isErrored={!!error}
      isFilled={isFilled}
      isFocused={isFocused}
      data-testid="TextArea-container"
      mudarCor={!!mudarCor}
      className={className}
      disabledTextArea={!!disabled}
    >
      { labelTextArea && <label> {labelTextArea} </label>}

      { Icon && <Icon size={20} />}

      <textarea
        name={name}
        onFocus={handleTextAreaFocus}
        onBlur={handleTextAreaBlur}
        defaultValue={defaultValue}
        ref={textareaRef}
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

export default TextArea;
