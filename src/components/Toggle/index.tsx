import React, {
  InputHTMLAttributes,
  useState,
  useCallback,
  useRef,
  useEffect,
} from 'react';

import { ConteinerToggle } from './styles';
import { useField } from '@unform/core';

interface IToggleProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  id: string;
  available: boolean;
  toggleAvailable: (id: string, isAvailable: boolean) => void;
}

const Toggle: React.FC<IToggleProps> = ({
  name,
  id,
  available,
  toggleAvailable,
  ...rest
}) => {
  const [isAvailable, setIsAvailable] = useState(available);
  const inputRef = useRef<HTMLInputElement>(null);
  const { fieldName, registerField } = useField(name);

  const ativaInativaToggle = useCallback(async (id: string) => {
    setIsAvailable(!isAvailable);

    toggleAvailable(id, !isAvailable);
  }, [isAvailable, toggleAvailable]);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: 'checked',
    });
  }, [fieldName, registerField]);

  return (
    <ConteinerToggle className="availability-container">

      <label htmlFor={`available-switch-${id}`} className="switch">
        <input
          name={name}
          id={`available-switch-${id}`}
          type="checkbox"
          checked={isAvailable}
          onChange={() => ativaInativaToggle(id)}
          data-testid={`change-status-food-${id}`}
          ref={inputRef}
          {...rest}
        />
        <span className="slider" />
      </label>
    </ConteinerToggle>
  );
};

export default Toggle;
