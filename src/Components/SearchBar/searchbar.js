import React, { useEffect, useState, useCallback } from 'react';
import './searchbar.css';

export default function SearchBar() {
  const [value, setValue] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);

  const fetchData = useCallback(async (query) => {
    if (!query.trim()) {
      setSuggestions([]);
      setShowSuggestions(false);
      return;
    }

    try {
      const response = await fetch(
        `https://fakestoreapi.com/products/search?q=${encodeURIComponent(query)}`
      );
      if (!response.ok) {
        console.error('Failed to fetch data:', response);
        return;
      }
      const products = await response.json();
      setSuggestions(products);
      setShowSuggestions(products.length > 0);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }, []);

  useEffect(() => {
    const debounceTimeout = setTimeout(() => {
      fetchData(value);
    }, 300);

    return () => clearTimeout(debounceTimeout);
  }, [value, fetchData]);

  const handleInputChange = (e) => {
    setValue(e.target.value);
    setSelectedIndex(-1);
  };

  const handleSuggestionClick = (suggestion) => {
    setValue(suggestion.title);
    setSuggestions([]);
    setShowSuggestions(false);
  };

  const handleKeyDown = (e) => {
    if (!showSuggestions || suggestions.length === 0) return;

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prevIndex) =>
        prevIndex < suggestions.length - 1 ? prevIndex + 1 : suggestions.length - 1
      );
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : -1));
    } else if (e.key === 'Enter' && selectedIndex !== -1) {
      handleSuggestionClick(suggestions[selectedIndex]);
    } else if (e.key === 'Escape') {
      setShowSuggestions(false);
      setSelectedIndex(-1);
    }
  };

  const handleBlur = () => {
    setTimeout(() => {
      setShowSuggestions(false);
      setSelectedIndex(-1);
    }, 150);
  };

  const handleFocus = () => {
    if (suggestions.length > 0 && value.trim() !== '') {
      setShowSuggestions(true);
    }
  };

  return (
    <div className="container">
      <div className="search-wrapper">
        <input
          type="text"
          className="textbox"
          placeholder="Search Books..."
          value={value}
          onChange={handleInputChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onKeyDown={handleKeyDown}
          aria-autocomplete="list"
          aria-expanded={showSuggestions}
          aria-controls="suggestions-list"
        />
        <i className="fas fa-search search-icon"></i>
      </div>
      {showSuggestions && (
        <ul className={`suggestions ${!showSuggestions ? 'hidden' : ''}`} id="suggestions-list">
          {suggestions.map((suggestion, index) => (
            <li
              key={suggestion.id}
              className={`suggestion ${index === selectedIndex ? 'active' : ''}`}
              onClick={() => handleSuggestionClick(suggestion)}
              onMouseEnter={() => setSelectedIndex(index)}
              aria-selected={index === selectedIndex}
            >
              {suggestion.title}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
