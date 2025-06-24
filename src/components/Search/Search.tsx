import React, { FC, useState, useCallback } from 'react';
import { classNames } from '@/css/classnames';
import './Search.css';

// Import the search icon from local assets
import searchIcon from '@/assets/icons/search_28.svg';

export interface SearchProps {
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
  onFocus?: () => void;
  onBlur?: () => void;
  disabled?: boolean;
  className?: string;
}

export const Search: FC<SearchProps> = ({
  placeholder = "Знайти рецепт",
  value = "",
  onChange,
  onFocus,
  onBlur,
  disabled = false,
  className
}) => {
  const [inputValue, setInputValue] = useState(value);
  const [isFocused, setIsFocused] = useState(false);

  const handleInputChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    setInputValue(newValue);
    onChange?.(newValue);
  }, [onChange]);

  const handleFocus = useCallback(() => {
    setIsFocused(true);
    onFocus?.();
  }, [onFocus]);

  const handleBlur = useCallback(() => {
    setIsFocused(false);
    onBlur?.();
  }, [onBlur]);

  const showPlaceholder = !inputValue && !isFocused;

  return (
    <div 
      className={classNames(
        'search',
        disabled && 'search--disabled',
        isFocused && 'search--focused',
        className
      )}
    >
      <div className="search__container">
        <div className="search__content">
          <div className="search__icon">
            <img 
              src={searchIcon} 
              alt="Search" 
              className="search__icon-image"
            />
          </div>
          
          <input
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
            disabled={disabled}
            className="search__input"
            placeholder={isFocused ? placeholder : ""}
          />
          
          {showPlaceholder && (
            <div className="search__placeholder">
              {placeholder}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Search; 