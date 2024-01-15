import React, { useRef, useState, useEffect } from 'react';

const EventRow = ({ title }) => {
  const eventRowRef = useRef(null);
  const [isLeftButtonHidden, setIsLeftButtonHidden] = useState(true);
  const [isRightButtonHidden, setIsRightButtonHidden] = useState(false);
  const rowTitle =
    title === 'newest' ? 'Newest events' : title === 'upcoming' ? 'Upcoming events' : 'You might like';
  const filter = title;

  const [events, setEvents] = useState([]);

  const handleScroll = () => {
    if (eventRowRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = eventRowRef.current;

      // Check if scroll is at the left end
      setIsLeftButtonHidden(scrollLeft === 0);

      // Check if scroll is at the right end
      setIsRightButtonHidden(scrollLeft + clientWidth >= scrollWidth);
    }
  };

  const scrollLeft = () => {
    if (eventRowRef.current) {
      eventRowRef.current.scrollLeft -= 1000;
    }
  };

  const scrollRight = () => {
    if (eventRowRef.current) {
      eventRowRef.current.scrollLeft += 1000;
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:8888/ticketAPI/selectEvents.php?filter=${filter}`);
        const data = await response.json();
        setEvents(data); // Assuming the response is an array of events, adjust as needed
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [filter]);

  useEffect(() => {
    const handleScrollEvent = () => {
      handleScroll();
    };

    if (eventRowRef.current) {
      eventRowRef.current.addEventListener('scroll', handleScrollEvent);
    }

    return () => {
      // Remove the event listener on component unmount
      if (eventRowRef.current) {
        eventRowRef.current.removeEventListener('scroll', handleScrollEvent);
      }
    };
  }, []); // Empty dependency array means this effect runs once on mount

  // Render your events based on the fetched data
  const eventElements = events.map((event) => (
    <div key={event.id} className="image-wrapper">
      <img className="row-image" src={`http://localhost:8888/ticketAPI/images/${event.id}_image.jpg`} alt="" />
      <div className="overlay-text">{event.title}</div>
    </div>
  ));

  return (
    <div className="event-row">
      <div className="row-title">{rowTitle}</div>
      <div className="event-container" ref={eventRowRef}>
        {eventElements}
      </div>
      <button className={`scroll-button-left ${isLeftButtonHidden ? 'hidden' : ''}`} onClick={scrollLeft}>
        {'<'}
      </button>
      <button className={`scroll-button ${isRightButtonHidden ? 'hidden' : ''}`} onClick={scrollRight}>
        {'>'}
      </button>
    </div>
  );
};

export default EventRow;
