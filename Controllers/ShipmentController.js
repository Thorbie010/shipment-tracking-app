const shipments = [
    { trackingId: '123456', status: 'In Transit', location: 'New York' },
    { trackingId: '789012', status: 'Delivered', location: 'Los Angeles' },
    { trackingId: '345678', status: 'Out for Delivery', location: 'Chicago' },
    { trackingId: '901234', status: 'Arrived', location: 'Houston' },
    // Add more sample shipments here
];

// Endpoint to get shipment data by tracking ID
const singleShipment = (req, res) => {
    const { trackingId } = req.body;
    const shipment = shipments.find(item => item.trackingId === trackingId); // Find shipment by tracking ID
    if (shipment) {
        res.json(shipment);
    } else {
        res.status(404).json({ error: 'Shipment not found' }); // Return error if shipment not found
    }
};

module.exports = {singleShipment}