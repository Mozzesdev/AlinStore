import { createContext, useEffect, useState } from "react";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    try {
      const productsLocalStorage = localStorage.getItem("cartProducts");
      return productsLocalStorage ? JSON.parse(productsLocalStorage) : [];
    } catch (error) {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem("cartProducts", JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (product) => {
    const inCart = cartItems.find(
      (productInCart) => productInCart.id === product.id
    );
    if (inCart) {
      if (inCart.amountOnCart === product.available) {
        setCartItems(
          cartItems.map((productInCart) => {
            if (productInCart.id === product.id) {
              return { ...inCart, amountOnCart: inCart.amountOnCart };
            } else return productInCart;
          })
        );
      } else {
        setCartItems(
          cartItems.map((productInCart) => {
            if (productInCart.id === product.id) {
              return { ...inCart, amountOnCart: inCart.amountOnCart + 1 };
            } else return productInCart;
          })
        );
      }
    } else {
      setCartItems([...cartItems, { ...product, amountOnCart: 1 }]);
    }
  };

  const addToCartWithAmount = (product, amount) => {
    const inCart = cartItems.find(
      (productInCart) => productInCart.id === product.id
    );
    if (inCart) {
      setCartItems(
        cartItems.map((productInCart) => {
          if (productInCart.id === product.id) {
            return {
              ...inCart,
              amountOnCart: inCart.amountOnCart + parseInt(amount),
            };
          } else return productInCart;
        })
      );
    } else {
      setCartItems([
        ...cartItems,
        { ...product, amountOnCart: parseInt(amount) },
      ]);
    }
  };

  const deleteItemOnCart = (product) => {
    const inCart = cartItems.find(
      (productInCart) => productInCart.id === product.id
    );

    if (inCart.amountOnCart === 1) {
      setCartItems(
        cartItems.filter((productInCart) => productInCart.id !== product.id)
      );
    } else {
      setCartItems(
        cartItems.map((productInCart) => {
          if (productInCart.id === product.id) {
            return { ...inCart, amountOnCart: inCart.amountOnCart - 1 };
          } else return productInCart;
        })
      );
    }
  };
  const deleteAllItemOnCart = (product) => {
    setCartItems(
      cartItems.filter((productInCart) => productInCart.id !== product.id)
    );
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        deleteItemOnCart,
        deleteAllItemOnCart,
        addToCartWithAmount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
