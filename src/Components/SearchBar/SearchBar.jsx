import React from 'react';
import { InputGroup, FormControl, Button } from 'react-bootstrap';

const SearchBar = ({ placeholder, searchQuery, onInputChange, onSearch }) => {
  return (
    <InputGroup className="mb-3 mt-3" style={{ maxWidth: '1200px' }}>
      <FormControl
        placeholder={placeholder || 'Search...'}
        value={searchQuery}
        onChange={(e) => onInputChange(e.target.value)}
        style={{ borderRadius: '5px', padding: '10px' }}
      />
      <Button
        variant="secondary"
        onClick={onSearch}
        style={{ marginLeft: '10px', borderRadius: '5px', padding: '10px 15px' }}
      >
        Search
      </Button>
    </InputGroup>
  );
};

export default SearchBar;