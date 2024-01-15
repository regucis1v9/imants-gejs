import React, { useState, useMemo } from "react";
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";
import {
  Combobox,
  ComboboxInput,
  ComboboxPopover,
  ComboboxList,
  ComboboxOption,
} from "@reach/combobox";
import "@reach/combobox/styles.css";

export default function Places() {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: 'AIzaSyAhA6Tjk9wtsf2nB11TFJE-Q7SESHngF-A',
    libraries: ["places"],
  });

  const center = useMemo(() => ({ lat: 57.31, lng: 25.28 }), []);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [selectedCoordinates, setSelectedCoordinates] = useState(null);
  const [eventTitle, setEventTitle] = useState("");
  const [eventDescription, setEventDescription] = useState("");
  const [tickets, setTickets] = useState([{ name: "", price: "", quantity: "" }]);

  const handleLogAddress = async () => {
    const startDateInput = document.getElementsByClassName('date-selector')[0];
    const endDateInput = document.getElementsByClassName('date-selector')[1];
    const startDate = startDateInput ? startDateInput.value : null;
    const endDate = endDateInput ? endDateInput.value : null;

    // Validate all required inputs
    if (
      eventTitle.trim() === "" ||
      eventDescription.trim() === "" ||
      selectedAddress === null ||
      selectedCoordinates === null ||
      startDate === null ||
      endDate === null ||
      tickets.some((ticket) => ticket.name.trim() === "" || ticket.price === "" || ticket.quantity === "")
    ) {
      console.log("Please fill out all required fields.");
      return;
    }

    const eventData = {
      title: eventTitle,
      description: eventDescription,
      startDate: startDate,
      endDate: endDate,
      location: selectedAddress,
    };



    try {
      const eventResponse = await fetch('http://localhost:8888/ticketAPI/createEvent.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(eventData),
      });

      const eventResult = await eventResponse.json();
      console.log('Event Server response:', eventResult);

      let eventID = eventResult.eventId;
      if (eventResult.message === "Creation successful") {
        await handleImageUpload(eventID);
        await handleCreateTickets(eventID);
      }
    } catch (error) {
      console.error('Error sending event data:', error);
    }
  };

  const handleImageUpload = async (eventID) => {
    const fileInput = document.getElementById('imageUpload');
    if (fileInput && fileInput.files.length > 0) {
      const selectedImage = fileInput.files[0];

      const reader = new FileReader();
      reader.onloadend = async () => {
        const base64Image = reader.result.split(',')[1];

        const imagePayload = {
          base64Image,
          eventID,
        };

        try {
          const imageResponse = await fetch('http://localhost:8888/ticketAPI/uploadImage.php', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(imagePayload),
          });

          const imageResult = await imageResponse.json();
          console.log('Image Server response:', imageResult);

        } catch (error) {
          console.error('Error uploading image:', error);
        }
      };

      reader.readAsDataURL(selectedImage);
    } else {
      console.log('No image selected');
    }
  };

  const handleCreateTickets = async (eventID) => {
    for (const ticket of tickets) {
      const ticketData = {
        eventID: eventID,
        name: ticket.name,
        price: ticket.price,
        quantity: ticket.quantity,
      };
      console.log(ticketData)
      try {
        const ticketResponse = await fetch('http://localhost:8888/ticketAPI/createTicket.php', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(ticketData),
        });

        const ticketResult = await ticketResponse.json();
        console.log('Ticket Server response:', ticketResult);

      } catch (error) {
        console.error('Error sending ticket data:', error);
      }
    }
  };

  const handleAddTicket = () => {
    setTickets([...tickets, { name: "", price: "", quantity: "" }]);
  };

  const handleRemoveTicket = () => {
    if (tickets.length > 1) {
      const updatedTickets = [...tickets];
      updatedTickets.pop();
      setTickets(updatedTickets);
    }
  };

  if (!isLoaded) return <div>Loading...</div>;

  return (
    <>
      <div className="basic-info-container">
        <input
          type="text"
          className="event-title"
          placeholder="Your event's title"
          value={eventTitle}
          onChange={(e) => setEventTitle(e.target.value)}
        />
        <textarea
          name=""
          id=""
          className="event-description"
          placeholder="Describe your event"
          value={eventDescription}
          onChange={(e) => setEventDescription(e.target.value)}
        ></textarea>
      </div>
      <div className="section-title"></div>
      <div className="places-container">
        <PlacesAutocomplete
          setSelectedAddress={(address) => setSelectedAddress(address)}
          setSelectedCoordinates={(coordinates) => setSelectedCoordinates(coordinates)}
        />
      </div>

      <GoogleMap
        zoom={10}
        center={center}
        mapContainerClassName="map-container"
      >
        {selectedCoordinates && <Marker position={selectedCoordinates} />}
      </GoogleMap>
      <div className="date-selection-box">
        <div className="date-container">
          Select a start date  
          <input type="datetime-local" className="date-selector"/>
        </div>
        <div className="date-container">
          Select an end date
          <input type="datetime-local" className="date-selector"/>
        </div>
      </div>
      <div className="ticket-container">
        <div className="ticket-title">Create tickets</div>
        <button className="ticket-button" onClick={handleAddTicket}>ADD</button>
        {tickets.map((ticket, index) => (
          <div key={index} className="ticket-input-container">
            <input
              type="text"
              className="ticket-name-input"
              placeholder="Name of the ticket (VIP, Standard, etc)"
              value={ticket.name}
              onChange={(e) => {
                const updatedTickets = [...tickets];
                updatedTickets[index].name = e.target.value;
                setTickets(updatedTickets);
              }}
            />
            <input
              type="number"
              className="ticket-price-input"
              placeholder="Price"
              step="0.01"
              min="0.01"
              value={ticket.price}
              onChange={(e) => {
                const updatedTickets = [...tickets];
                updatedTickets[index].price = e.target.value;
                setTickets(updatedTickets);
              }}
            />
            <input
              type="number"
              className="ticket-quantity-input"
              placeholder="Amount"
              step="1"
              min="1"
              value={ticket.quantity}
              onChange={(e) => {
                const updatedTickets = [...tickets];
                updatedTickets[index].quantity = e.target.value;
                setTickets(updatedTickets);
              }}
            />
            <button
              className="remove-ticket"
              onClick={handleRemoveTicket}
              disabled={tickets.length === 1}
            >
              REMOVE
            </button>
          </div>
        ))}
      </div>
      <div className="image-upload-container">
        <label htmlFor="imageUpload">Upload cover photo:</label>
        <input
          type="file"
          id="imageUpload"
          accept="image/*"
          onChange={(e) => handleImageUpload(e)}
        />
      </div>
      <button onClick={handleLogAddress} className="create-event-button">Create event</button>
    </>
  );
}

const PlacesAutocomplete = ({ setSelectedAddress, setSelectedCoordinates }) => {
  const {
    ready,
    value,
    setValue,
    suggestions: { status, data },
    clearSuggestions,
  } = usePlacesAutocomplete();

  const handleSelect = async (address) => {
    setValue(address, false);
    clearSuggestions();

    setSelectedAddress(address);

    const results = await getGeocode({ address });
    const { lat, lng } = await getLatLng(results[0]);
    setSelectedCoordinates({ lat, lng });
  };

  return (
    <Combobox onSelect={handleSelect}>
      <ComboboxInput
        value={value}
        onChange={(e) => setValue(e.target.value)}
        disabled={!ready}
        className="combobox-input"
        placeholder="Search for an address"
      />
      <ComboboxPopover>
        <ComboboxList>
          {status === "OK" &&
            data.map(({ place_id, description }) => (
              <ComboboxOption key={place_id} value={description} />
            ))}
        </ComboboxList>
      </ComboboxPopover>
    </Combobox>
  );
};
