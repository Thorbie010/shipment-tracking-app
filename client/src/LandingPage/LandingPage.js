import React, { useState } from 'react';
import cart from '../assets/cart.svg';
import flight from '../assets/flight.svg';
import notes from '../assets/notes.svg';
import box from '../assets/box.svg';
import ShipmentDetails from '../ShipmentDetails/ShipmentDetails';
import { Link } from "react-router-dom";
import hero_image from '../assets/hero_image.jpg'

function LandingPage( { isLargeScreen }) {
    const [trackingId, setTrackinId] = useState('');
    const [shipmentData, setShipmentData] = useState(null);
    const [error, setError] = useState(null);


    const trackShipment = async () => {
        try {
            const response = await fetch('', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ trackingId })
            });
            if (!response.ok) {
                throw new Error('Shipment not found');
            }
            const data = await response.json();
            setShipmentData(data);
            setError(null);
        } catch(error) {
            setError('Error tracking shipment: ' + error.message);
            console.error('Error tracking Shipment', error);
        }
    }
    
    


    return (
        <div className="flex flex-col">
           <div className="flex flex-col items-center justify-center bg-cover bg-center h-screen" style={{ backgroundImage: `url(${hero_image})` }}>
                <form className={`h-15 ${isLargeScreen ? 'w-2/5' : 'w-5/6'} bg-white p-2 text-sm flex `}>
                    <input
                    type="text"
                    value={trackingId}
                    onChange={(e) => setTrackinId(e.target.value)} 
                    placeholder="Input tracking ID / Alphacode"
                    className="w-3/4 placeholder-gray-500 text-gray-800 px-2 py1 focus:outline-none" />
                    <button type="button" className="ml-20 px-5 py-2 bg-red-500 text-white border rounded-md font-semibold" onClick={trackShipment}>Search</button>
                </form>
                <p className="text-white font-semibold mt-4">Track shipment / Find and ship a product using Alphacode</p>
                {shipmentData && <ShipmentDetails shipment={shipmentData} />}
                {error && <div>Error: {error}</div>}
           </div>
           <div>
                <p className='font-bold text-black-800 text-30 mt-20 text-center'>Seamless delivery services</p>
           </div>
           <div className={`${isLargeScreen ? 'flex flex-row items-center justify-center mx-20 px-10' : 'block mx-3'}`}>
                <div className={`${isLargeScreen ? 'flex flex-row w-7/10' : 'flex flex-col'} mt-10 bg-white border border-gray-500 border-solid`}>
                    <Link to={''} className={`${isLargeScreen ? 'w-1/4 border py-5 border-gray-800 border-solid' : 'w-full pb-10 border border-gray-500 border-solid flex flex-col items-center justify-center'}`}>
                        <img src={box} alt='ship now' className='h-70 px-5 py-2 mt-10'/>
                        <p className='font-semibold text-2xl px-5 pb-2 text-gray-800 mt-5'>Ship Now</p>
                        <p className='px-5 py-2'>Request Pick Up, Delivery or Xpress Drop Off</p>
                    </Link>
                    <Link to={''} className={`${isLargeScreen ? 'w-1/4 border py-5 border-gray-800 border-solid' : 'w-full pb-10 border border-gray-500 border-solid flex flex-col items-center justify-center'}`}>
                        <img src={flight} alt='ship now' className='h-70 px-5 py-2 mt-10'/>
                        <p className='font-semibold text-2xl px-5 pb-2 text-gray-800 mt-5'>Overseas Shipping</p>
                        <p className={`${isLargeScreen ? 'px-5 py-2' : 'px-5 py-2 text-center'}`}>Ship from UK, USA or China to Nigeria and Export to 230 locations worldwide</p>
                    </Link>
                    <Link to={''} className={`${isLargeScreen ? 'w-1/4 border py-5 border-gray-800 border-solid' : 'w-full pb-10 border border-gray-500 border-solid flex flex-col items-center justify-center'}`}>
                        <img src={notes} alt='ship now' className='h-70 px-5 py-2 mt-10'/>
                        <p className='font-semibold text-2xl px-5 pb-2 text-gray-800 mt-5'>Get a Quick Quote</p>
                        <p className='px-5 py-2'>Calculate cost estimate for local & international shipments</p>
                    </Link>
                    <Link to={''} className={`${isLargeScreen ? 'w-1/4 border py-5 border-gray-800 border-solid' : 'w-full pb-10 border border-gray-500 border-solid flex flex-col items-center justify-center'}`}>
                        <img src={cart} alt='ship now' className='h-70 px-5 py-2 mt-10'/>
                        <p className='font-semibold text-2xl px-5 pb-2 text-gray-800 mt-5'>Personal Shopper</p>
                        <p className='px-5 py-2'>We shop quality products for you & ship to your doorstep</p>
                    </Link>
                </div>
           </div>
        </div>
    );
}

export default LandingPage;
