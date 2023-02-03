import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const initialState = {
  cartItems: localStorage.getItem("cartItems")
    ? JSON.parse(localStorage.getItem("cartItems"))
    : [],

  cartItems2: localStorage.getItem("cartItems2")
    ? JSON.parse(localStorage.getItem("cartItems2"))
    : [],

  cartTotalQuantity: 0,
  cartTotalQuantity2: 0,
  cartTotalAmount: 0,
  previousURL: "",
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    ADD_TO_CART(state, action) {
      //   console.log(action.payload);
      const productIndex = state.cartItems.findIndex(
        (item) => item.id === action.payload.id
      );

      if (productIndex >= 0) {
        // Item already exists in the cart
        // Increase the cartQuantity
        state.cartItems[productIndex].cartQuantity += 1;
        toast.info(`${action.payload.name} hozzáaadva`, {
          position: "top-left",
        });
      } else {
        // Item doesn't exists in the cart
        // Add item to the cart
        const tempProduct = { ...action.payload, cartQuantity: 1 };
        state.cartItems.push(tempProduct);
        toast.success(`${action.payload.name} rendeléshez adva`, {
          position: "top-left",
        });
      }
      // save cart to Localstorage
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },

    ADD_TO_CART2(state, action) {
      //   console.log(action.payload);
      const productIndex = state.cartItems2.findIndex(
        (item) => item.id === action.payload.id
      );

      if (productIndex >= 0) {
        // Item already exists in the cart
        // Increase the cartQuantity
        state.cartItems2[productIndex].cartQuantity += 1;
        toast.info(`${action.payload.name} hozzáaadva`, {
          position: "center",
        });
      } else {
        // Item doesn't exists in the cart
        // Add item to the cart
        const tempProduct = { ...action.payload, cartQuantity: 1 };
        state.cartItems2.push(tempProduct);
        toast.success(`${action.payload.name} rendeléshez adva`, {
          position: "center",
        });
      }
      // save cart to Localstorage
      localStorage.setItem("cartItems2", JSON.stringify(state.cartItems2));
    },

    DECREASE_CART(state, action) {
      console.log(action.payload);
      const productIndex = state.cartItems.findIndex(
        (item) => item.id === action.payload.id
      );

      if (state.cartItems[productIndex].cartQuantity > 1) {
        state.cartItems[productIndex].cartQuantity -= 1;
        toast.info(`${action.payload.name} mennyisége csökkentve`, {
          position: "top-left",
        });
      } else if (state.cartItems[productIndex].cartQuantity === 1) {
        const newCartItem = state.cartItems.filter(
          (item) => item.id !== action.payload.id
        );
        state.cartItems = newCartItem;
        toast.success(`${action.payload.name} eltávolítva a rendelésből`, {
          position: "top-left",
        });
      }
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },
    DECREASE_CART2(state, action) {
      console.log(action.payload);
      const productIndex = state.cartItems2.findIndex(
        (item) => item.id === action.payload.id
      );

      if (state.cartItems2[productIndex].cartQuantity > 1) {
        state.cartItems2[productIndex].cartQuantity -= 1;
        toast.info(`${action.payload.name} mennyisége csökkentve`, {
          position: "top-left",
        });
      } else if (state.cartItems2[productIndex].cartQuantity === 1) {
        const newCartItem = state.cartItems2.filter(
          (item) => item.id !== action.payload.id
        );
        state.cartItems2 = newCartItem;
        toast.success(`${action.payload.name} eltávolítva a rendelésből`, {
          position: "top-left",
        });
      }
      localStorage.setItem("cartItems2", JSON.stringify(state.cartItems2));
    },

    REMOVE_FROM_CART(state, action) {
      const newCartItem = state.cartItems.filter(
        (item) => item.id !== action.payload.id
      );

      state.cartItems = newCartItem;
      toast.success(`${action.payload.name} rendelés törölve`, {
        position: "top-left",
      });

      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },

    REMOVE_FROM_CART2(state, action) {
      const newCartItem = state.cartItems2.filter(
        (item) => item.id !== action.payload.id
      );

      state.cartItems2 = newCartItem;
      toast.success(`${action.payload.name} rendelés törölve`, {
        position: "top-left",
      });

      localStorage.setItem("cartItems2", JSON.stringify(state.cartItems2));
    },

    CLEAR_CART(state, action) {
      state.cartItems = [];
      toast.info(`Rendelés lista kiürítve`, {
        position: "top-left",
      });

      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },

    CLEAR_CART2(state, action) {
      state.cartItems2 = [];
      toast.info(`Rendelés lista kiürítve`, {
        position: "top-left",
      });

      localStorage.setItem("cartItems2", JSON.stringify(state.cartItems2));
    },

    CALCULATE_SUBTOTAL(state, action) {
      const array = [];
      state.cartItems.map((item) => {
        const { price, cartQuantity } = item;
        const cartItemAmount = price * cartQuantity;
        return array.push(cartItemAmount);
      });
      const totalAmount = array.reduce((a, b) => {
        return a + b;
      }, 0);
      state.cartTotalAmount = totalAmount;
    },

    CALCULATE_SUBTOTAL2(state, action) {
      const array = [];
      state.cartItems2.map((item) => {
        const { price, cartQuantity } = item;
        const cartItemAmount = price * cartQuantity;
        return array.push(cartItemAmount);
      });
      const totalAmount = array.reduce((a, b) => {
        return a + b;
      }, 0);
      state.cartTotalAmount = totalAmount;
    },

    CALCULATE_TOTAL_QUANTITY(state, action) {
      const array = [];
      state.cartItems.map((item) => {
        const { cartQuantity } = item;
        const quantity = cartQuantity;
        return array.push(quantity);
      });
      const totalQuantity = array.reduce((a, b) => {
        return a + b;
      }, 0);
      state.cartTotalQuantity = totalQuantity;
    },

    CALCULATE_TOTAL_QUANTITY2(state, action) {
      const array = [];
      state.cartItems2.map((item) => {
        const { cartQuantity } = item;
        const quantity = cartQuantity;
        return array.push(quantity);
      });
      const totalQuantity = array.reduce((a, b) => {
        return a + b;
      }, 0);
      state.cartTotalQuantity2 = totalQuantity;
    },

    SAVE_URL(state, action) {
      //console.log(action.payload);
      state.previousURL = action.payload;
    },
  },
});

export const {
  ADD_TO_CART,
  ADD_TO_CART2,
  DECREASE_CART,
  DECREASE_CART2,
  REMOVE_FROM_CART,
  REMOVE_FROM_CART2,
  CLEAR_CART,
  CLEAR_CART2,
  CALCULATE_SUBTOTAL,
  CALCULATE_SUBTOTAL2,
  CALCULATE_TOTAL_QUANTITY,
  CALCULATE_TOTAL_QUANTITY2,
  SAVE_URL,
} = cartSlice.actions;

export const selectCartItems = (state) => state.cart.cartItems;
export const selectCartItems2 = (state) => state.cart.cartItems2;
export const selectCartTotalQuantity = (state) => state.cart.cartTotalQuantity;
export const selectCartTotalQuantity2 = (state) =>
  state.cart.cartTotalQuantity2;
export const selectCartTotalAmount = (state) => state.cart.cartTotalAmount;
export const selectPreviousURL = (state) => state.cart.previousURL;

export default cartSlice.reducer;
