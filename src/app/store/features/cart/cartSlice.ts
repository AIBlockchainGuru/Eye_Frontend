import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Payload } from "recharts/types/component/DefaultLegendContent";

interface CartState {
	cartItems: CartItem[];
}

export interface CartItem {
	id: string;
	quantity: number;
	attributes: {
		size: string;
		color: string;
		price: number;
	};
	oneQuantityPrice: number;
}

const initialState: CartState = {
	cartItems: [],
};

export const cartSlice = createSlice({
	name: "cart",
	initialState,
	reducers: {
		addToCart: (state, action: PayloadAction<CartItem>) => {
			const item = state.cartItems.find((p) => p.id === action.payload.id);
			if (item) {
				item.quantity++;
				item.attributes.price = item.oneQuantityPrice * item.quantity;
			} else {
				state.cartItems.push({ ...action.payload, quantity: 1 });
			}
		},
		updateCart: (state, action) => {
			state.cartItems = state.cartItems.map((p) => {
				if (p.id === action.payload.id) {
					if (action.payload.key === "quantity") {
						p.attributes.price = p.oneQuantityPrice * action.payload.val;
					}
					return { ...p, [action.payload.key]: action.payload.val };
				}
				return p;
			});
		},
		removeFromCart: (state, action) => {
			state.cartItems = state.cartItems.filter(
				(p) => p.id !== action.payload.id
			);
		},
	},
});

// Action creators are generated for each case reducer function
export const { addToCart, updateCart, removeFromCart } = cartSlice.actions;

export default cartSlice.reducer;
