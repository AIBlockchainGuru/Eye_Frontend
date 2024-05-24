import CartInvoice from "@/components/cart/CartInvoice";
import CartProductCard from "@/components/cart/CartProductCard";
import React from "react";
import Wrapper from "@/components/Wrapper";

type Props = {};

const Cart = (props: Props) => {
  return (
    <Wrapper>
      <div className="flex w-full justify-between">
        <CartProductCard />
        {/* <CartInvoice /> */}
      </div>
    </Wrapper>
  );
};

export default Cart;
