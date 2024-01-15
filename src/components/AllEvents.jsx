import React, { useEffect, useState } from 'react';

const AllEvents = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:8888/ticketAPI/selectEvents.php?filter=vienalga');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setEvents(data);
        console.log(data); // Log the response data
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []); // Empty dependency array means this effect runs once after the initial render

  return (
    <div className="event-main">
        {/* Render your events here using the 'events' state */}
        {events.map((event) => (
          <div key={event.id} className='single-event'>
            <img src="" alt="" />
          </div>
        ))}
    </div>
  );
};

export default AllEvents;
