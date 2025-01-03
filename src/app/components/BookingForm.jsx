"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation"; // Import useRouter for navigation

const BookingForm = () => {
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [guests, setGuests] = useState(1);
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [availableSlots, setAvailableSlots] = useState([]);
  const [bookingSummary, setBookingSummary] = useState(null);
  const router = useRouter(); // Initialize useRouter for navigation
  

  useEffect(() => {
    const fetchAvailability = async () => {
      if (date && time) {
        try {
          const response = await fetch(
            `http://localhost:3001/api/availability?date=${date}&time=${time}`
          );
          if (!response.ok) {
            throw new Error("Failed to fetch availability.");
          }
          const data = await response.json();
          setAvailableSlots(data);
        } catch (error) {
          console.log("Error fetching availability:", error.message);
        }
      }
    };

    fetchAvailability();
  }, [date, time]);

  const handleBooking = async (e) => {
    e.preventDefault();

    const requestData = {
      date,
      time,
      guests: parseInt(guests, 10),
      name,
      contact,
    };

    try {
      const response = await fetch("http://localhost:3001/api/bookings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to book a table.");
      }

      const data = await response.json();
      setBookingSummary(data.newBooking);

      // Navigate to confirmation page with booking details
      const queryParams = new URLSearchParams({
        date: data.newBooking.date,
        time: data.newBooking.time,
        guests: data.newBooking.guests,
        name: data.newBooking.name,
        contact: data.newBooking.contact,
      }).toString();
  
      router.push(`/confirmation?${queryParams}`);
    } catch (error) {
      console.log("Error during booking:", error.message);
      alert(error.message || "An error occurred while booking.");
    }
  };

  return (
    <div>
      <h1>Book a Table</h1>
      <form
        onSubmit={handleBooking}
        className="flex items-center justify-center size-5 p-5 border-x-8 border-y-8"
      >
        <label>Date:</label>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
        />

        <label>Time:</label>
        <input
          type="time"
          value={time}
          onChange={(e) => setTime(e.target.value)}
          required
        />

        <label>Number of Guests:</label>
        <input
          type="number"
          value={guests}
          onChange={(e) => setGuests(e.target.value)}
          min="1"
          max="100"
          required
        />

        <label>Name:</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <label>Contact:</label>
        <input
          type="text"
          value={contact}
          onChange={(e) => setContact(e.target.value)}
          minLength="10"
          maxLength="10"
          required
        />

        <button type="submit">Submit</button>
      </form>

      {availableSlots.length > 0 && (
        <div>
          <h3>Available Slots:</h3>
          <ul>
            {availableSlots.map((slot, index) => (
              <li key={index}>{slot}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default BookingForm;
