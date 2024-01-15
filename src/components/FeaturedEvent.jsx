// FeaturedEvent.js

import React from 'react';

const FeaturedEvent = () => {
  return (
    <div className="featured-event">
      <div className="featured-information">
        <div className="information-container">
          <div className="genre-section">
            <div className="genre">RALLY</div>
            <div className="genre">LATVIA</div>
            <div className="genre">MOTOSPORT</div>
          </div>
          <div className="title">TET RALLY LATVIA</div>
          <div className="date-location">
            <div className="date">18.07 - 21.07</div>
            <div className="location">Riga - Liepaja</div>
          </div>
          <div className="description">2024. gada vasarā Latvija pirmo reizi uzņems FIA pasaules rallija čempionāta posmu. Esi klātienē un vēro pasaules meistarīgākos rallija braucējus leģendārajos Kurzemes ātrumposmos cīņā par sekundēm un uzvaru!</div>
          <button className='buyButton'>BUY TICKETS</button>
        </div>
      </div>
      <img src={process.env.PUBLIC_URL + '/images/image1.png'} alt="My Image" />
    </div>
  );
}

export default FeaturedEvent;
