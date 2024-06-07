import React from 'react';

function ShipmentDetails({ shipment }) {
    return (
        <div className="bg-gray-200 border rounded-md p-5">
            <h2><strong>Shipment Details</strong></h2>
            <p><strong>Tracking ID:</strong> {shipment.trackingId}</p>
            <p><strong>Status:</strong> {shipment.status}</p>
            <p><strong>Location:</strong> {shipment.location}</p>
        </div>
    );
}

export default ShipmentDetails;