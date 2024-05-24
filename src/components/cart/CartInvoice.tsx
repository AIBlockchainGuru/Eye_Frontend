import React from 'react';

const CartInvoice = () => {
  const orderValue = 2999.9;
  const deliveryCharge = 80.0;
  const gst = 180.0;
  const total = orderValue + deliveryCharge + gst;

  return (
    <div className="bg-white p-4 rounded-lg ">
      <div className="mb-4">
        <label htmlFor="coupon" className="block text-gray-700 font-semibold mb-2">Apply Coupons</label>
        <div className="flex">
          <input
            type="text"
            id="coupon"
            placeholder="Enter Your Code"
            className="flex-grow border border-gray-300 rounded-l px-3 py-2"
          />
          <button
            type="button"
            className="bg-gray-800 text-white px-4 py-2 rounded-r"
          >
            Apply
          </button>
        </div>
      </div>
      <div className="mb-4">
        <h3 className="text-lg font-semibold mb-2">Billing Details</h3>
        <div className="flex justify-between mb-2">
          <span className="text-gray-700">Order Value</span>
          <span className="text-gray-700">Rs {orderValue.toFixed(2)}</span>
        </div>
        <div className="flex justify-between mb-2">
          <span className="text-gray-700">Delivery Charge</span>
          <span className="text-gray-700">Rs {deliveryCharge.toFixed(2)}</span>
        </div>
        <div className="flex justify-between mb-4">
          <span className="text-gray-700">GST</span>
          <span className="text-gray-700">Rs {gst.toFixed(2)}</span>
        </div>
        <div className="flex justify-between border-t border-gray-300 pt-4">
          <span className="text-lg font-semibold">Total</span>
          <span className="text-lg font-semibold">Rs {total.toFixed(2)}</span>
        </div>
      </div>
      <button
        type="button"
        className="w-full bg-orange-500 text-white py-3 rounded-lg font-semibold"
      >
        Place Order
      </button>
    </div>
  );
};

export default CartInvoice;