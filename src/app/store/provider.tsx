"use client";

import { Provider } from "react-redux";
import store from "./store";
import { Children } from "react";

export function Providers({ children }: { children: any }) {
	return <Provider store={store}>{children}</Provider>;
}
