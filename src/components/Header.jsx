// Header.js

import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faUser } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import Cookies from 'js-cookie';

const Header = ({ onSearch, onSearchChange }) => {
  const [isSearching, setIsSearching] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [iconRedirect, setIconRedirect] = useState('');
  const [username, setUsername] = useState('');

  useEffect(() => {
    let storedUsername = Cookies.get('username') || 'Guest';
    setUsername(storedUsername);

    if (storedUsername === 'Guest') {
      setIconRedirect('/login');
    } else {
      setIconRedirect('/profile');
    }
  }, []);

  const showSearch = () => {
    setIsSearching(true);
  };

  const hideSearch = () => {
    setIsSearching(false);
  };

  const handleSearchInputChange = (event) => {
    setSearchValue(event.target.value);
    onSearch(event.target.value);
    onSearchChange(event.target.value);
  };

  return (
    <div className="header">
      <div className="search-bar-wrapper">
        <FontAwesomeIcon icon={faSearch} className="search-icon" />
        <input
          type="text"
          className={`search-bar ${isSearching ? 'search-bar-active' : ''}`}
          value={searchValue}
          onClick={showSearch}
          onBlur={hideSearch}
          onChange={handleSearchInputChange}
        />
      </div>
      <Link to={iconRedirect} className="account-button">
        <button className="account-icon">
          <FontAwesomeIcon icon={faUser} className="account-image" />
        </button>
        <span className="header-profile-text">{username}</span>
        <div className="margin-box"></div>
      </Link>
    </div>
  );
};

export default Header;
