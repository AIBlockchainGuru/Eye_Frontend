import React from 'react';

const OrderSummary: React.FC = () => {
  return (
    <div className="max-w-sm mt-[4em] mx-auto bg-transparent p-4 rounded-lg ">
      <div className="mb-4">
        <div className="flex items-center">
          <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
            <path d="M14.5 7.5a2.5 2.5 0 100-5 2.5 2.5 0 000 5zm-9 0a2.5 2.5 0 100-5 2.5 2.5 0 000 5z" />
            <path fillRule="evenodd" d="M10 2a8 8 0 100 16 8 8 0 000-16zM5.5 12.5a2.5 2.5 0 115 0 2.5 2.5 0 01-5 0z" clipRule="evenodd" />
          </svg>
          <span className="text-gray-700 font-medium">Apply Coupons</span>
        </div>
        <div className="mt-2 flex">
          <input type="text" placeholder="Enter Your Code" className="flex-grow border rounded-l-full px-3 py-1.5 text-sm" />
          <button className="bg-gray-200 text-gray-700 px-4 py-1.5 rounded-r-full text-sm">Apply</button>
        </div>
      </div>

      <div className="mb-4">
        <h3 className="font-medium mb-2">Billing Details</h3>
        <div className="flex justify-between text-sm mb-1">
          <span className="text-gray-600">Order Value</span>
          <span>Rs 2999.90</span>
        </div>
        <div className="flex justify-between text-sm mb-1">
          <span className="text-gray-600">Delivery Charge</span>
          <span>Rs 80.00</span>
        </div>
        <div className="flex justify-between text-sm mb-1">
          <span className="text-gray-600">GST</span>
          <span>Rs 180.00</span>
        </div>
        <div className="flex justify-between font-medium mt-2">
          <span>Total</span>
          <span>Rs 3179.00</span>
        </div>
      </div>

      <button className="w-full bg-orange-500 text-white py-1.5  rounded-full font-medium mb-4">
        Place Order
      </button>

      <div className="text-sm text-gray-600 mb-4">
        We accept
        {/* <div className="flex items-center mt-2 space-x-2">
          <span>Cash on Delivery</span>
          <img src="/path-to-mastercard-logo.png" alt="Mastercard" className="h-6" />
          <img src="/path-to-visa-logo.png" alt="Visa" className="h-6" />
        </div>
        <div className="flex items-center mt-2 space-x-2">
          <span>EMI</span>
          <img src="/path-to-rupay-logo.png" alt="RuPay" className="h-6" />
          <img src="/path-to-upi-logo.png" alt="UPI" className="h-6" />
          <img src="/path-to-directbank-logo.png" alt="Direct Bank" className="h-6" />
        </div> */}
      </div>

      <p className="text-xs text-gray-500 mb-4">
        Prices and delivery costs are not confirmed until youve reached the checkout.
        15 days free returns. Read more about return and refund policy.
        Customers avail return on SMS/WhatsApp notifications regarding deliveries on the registered phone number
      </p>

      <button className="w-full border border-orange-500 text-orange-500 py-1.5 rounded-full font-medium hover:bg-orange-500 transitions-all durations-200 hover:text-white">
        Delivery And Return Policy
      </button>
    </div>
  );
};

export default OrderSummary;