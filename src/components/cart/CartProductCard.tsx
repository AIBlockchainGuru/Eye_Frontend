import React from "react";
import { FaTruckMoving } from "react-icons/fa";
import Image from "next/image";
const productData = {
  estimatedDeliveryTime: "2-7 Days",
  productName: "Keep Rocking..",
  productDescription: "Men's Heavy Weight Hoodie",
  price: 14.5,
  mrp: 2299,
  color: "Black",
  size: "M",
  quantity: 1,
};

const CartProductCard = () => {
  return (
    <div className="bg-white p-4 rounded-lg flex justify-between gap-[4em] ">
      
      <div className="  mb-2 w-[10em] h-[10em] ">
        <Image src="/sample.png" alt="k" width={230} height={230}></Image>
      </div>

      <div className="flex  gap-x-8 justify-between mb-4 flex-col">
        <div className="flex flex-col items-start justify-between mb-4">
          <h2 className="text-2xl font-bold">{productData.productName}</h2>
          <span className="text-black/60 text-xs my-1">
            {productData.productDescription}
          </span>
        </div>
        <div className="flex flex-col items-start justify-between mb-4">
          <span className="text-2xl font-bold text-accent">${productData.price}</span>
          <span className="text-black/80 mt-1 text-[0.6em]">
            MRP Rs. {productData.mrp} incl. of All Taxes
          </span>
        </div>
        <div className="flex items-center">
          <span className="text-black/70 text-sm font-semibold mr-2">Color ~</span>
          <span
            className={`bg-${productData.color.toLowerCase()} w-3 h-3 inline-block rounded-full`}
          ></span>
          <p className="text-black text-xs font-semibold ml-2">{productData.color}</p>
        </div>

        <div className=" flex mt-3 ">
          <div className=" text-xs flex  justify-center items-center p-0 m-0  ">
            <span className="text-white font-semibold  bg-black/80 pl-2 pr-2 border-r-2 border-gray-500 p-3 ">Size </span>
            <select className=" text-white rounded-none pt-[0.09em] bg-black/80  pl-2 pr-1 mr-1 p-6' ">
              <option className="p-3 ">{productData.size}</option>
            </select>
          </div>
          <div className="text-xs">
            <span className="text-gray-700 font-semibold mr-2">Qty </span>
            <input
              type="number"
              defaultValue={productData.quantity}
              min={1}
              className="w-16 bg-trasparent text-xs"
            />
          </div>
        </div>
      </div>

      {/* <div className="flex items-center justify-between">
        <button className="bg-gray-800 text-white px-4 py-2 rounded">
          Edits
        </button>
      </div> */}

    </div>
  );
};

export default CartProductCard;
