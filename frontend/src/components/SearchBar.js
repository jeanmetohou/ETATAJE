import React from 'react';
import { Button, FormControl, InputGroup } from 'react-bootstrap';
import { FaSearch } from 'react-icons/fa';



const SearchBar = () => {
    return (
        <InputGroup className="w-25">
        <FormControl placeholder="Search..." />
        <Button variant="outline-secondary">
          <FaSearch />
        </Button>
      </InputGroup>
    );
};

export default SearchBar;