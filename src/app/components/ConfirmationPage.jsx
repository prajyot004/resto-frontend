"use client";

import { useSearchParams } from "next/navigation";

const ConfirmationPage = () => {
  const searchParams = useSearchParams();
  

  return (
    <div className="confirmation-page">
      <h1>Booking Confirmation</h1>
      <div className="summary-details">
        <p><strong>Date:</strong> {searchParams.get("date")}</p>
        <p><strong>Time:</strong> {searchParams.get("time")}</p>
        <p><strong>Guests:</strong> {searchParams.get("guests")}</p>
        <p><strong>Name:</strong> {searchParams.get("name")}</p>
        <p><strong>Contact:</strong> {searchParams.get("contact")}</p>
      </div>
      <button
        onClick={() => window.location.replace("/")}
        className="return-button"
      >
        Return to Home
      </button>
    </div>
  );
};

export default ConfirmationPage;
