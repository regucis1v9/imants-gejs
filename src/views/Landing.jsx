// Landing.js

import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import FeaturedEvent from '../components/FeaturedEvent';
import EventRow from '../components/EventRow';
import AllEvents from '../components/AllEvents'; 
import '../css/style.css';

const Landing = () => {
  const [isSearching, setIsSearching] = useState(false);
  const [renderFadeContainer, setRenderFadeContainer] = useState(true);

  useEffect(() => {
    if (isSearching) {
      // Start rendering the fade-container immediately upon searching
      setRenderFadeContainer(true);

      // Stop rendering the fade-container 0.2 seconds after starting the search
      const timeoutId = setTimeout(() => {
        setRenderFadeContainer(false);
      }, 200);

      return () => {
        // Clear the timeout if the component unmounts or the search changes
        clearTimeout(timeoutId);
      };
    }
  }, [isSearching]);

  const handleSearchChange = (searchValue) => {
    setIsSearching(searchValue !== '');
  };

  const handleSearch = (searchValue) => {
    // Perform any search-related functionality here
    console.log(`Search query: ${searchValue}`);
  };

  return (
    <div className="main">
      <Header onSearch={handleSearch} onSearchChange={handleSearchChange} />
      {renderFadeContainer ? (
        <div className={`fade-container ${isSearching ? 'fade-out' : ''}`}>
          <FeaturedEvent />
          <div className="gradient-corner"></div>
          <EventRow title="newest" />
          <EventRow title="upcoming" />
          <EventRow title="random" />
        </div>
      ) : (
          <AllEvents />
      )}
    </div>
  );
};

export default Landing;
