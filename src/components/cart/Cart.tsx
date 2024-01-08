import { useEffect, useRef, useState } from "react";
import {
  cartIsToOpen,
  incrementCartItem,
  decrementCartItem,
  removeCartItem,
} from "../../redux/silce/cartSlice";
import { useAppDispatch, useAppSelector } from "../../redux/hooks/storeHook";
import FlipKart_logo from "../../assets/image/logo_lite.png";
import { IoClose } from "react-icons/io5";
import { MdDelete } from "react-icons/md";
import * as FiIcons from "react-icons/fi";
import "./Cart.css";

const Cart = () => {
  const cartRef = useRef<HTMLDivElement>(null);
  const [animate, setAnimate] = useState<string>("cart-open");
  const dispatch = useAppDispatch();
  const { cartItem, cartCount, totalAmount } = useAppSelector(
    (state) => state.cartRedu
  );

  const handleKeybaordEvent = (event: KeyboardEvent) => {
    const { key } = event;
    if (key === "Escape") {
      setAnimate("cart-close");
      setTimeout(() => {
        dispatch(cartIsToOpen());
      }, 300);
    }
  };
  useEffect(() => {
    console.log(cartRef.current);
    if (cartRef.current) {
      /*       cartRef.current.tabIndex = -1; */
      // cartRef.current.focus();
      window.addEventListener("keydown", handleKeybaordEvent);
    }
    return () => {
      window.removeEventListener("keydown", handleKeybaordEvent);
      console.log("first");
    };
  }, []);

  const handleCloseToCart = () => {
    setAnimate("cart-close");
    setTimeout(() => {
      dispatch(cartIsToOpen());
    }, 300);
  };

  const handleCartQuantityItem = (type: string, id: number) => {
    if (type === "increment") {
      dispatch(incrementCartItem(id));
    } else {
      dispatch(decrementCartItem(id));
    }
  };

  return (
    <div
      className={`cart_container_mondal ${animate} `}
      ref={cartRef}
      // onKeyDown={handleKeybaordEvent}
    >
      <div className={`cart_container ${animate}`}>
        <header className="cart-heading bg-[#2874f0] h-[56px] flex items-center px-2 gap-x-2 sticky top-0 flex-shrink-0">
          <img src={FlipKart_logo} alt="logo_light" className="max-w-[30px]" />
          <h3 className="text-white text-[0.9rem]">Shop Our Cart</h3>
          <IoClose
            className="text-[1.5rem] text-yellow-400 cursor-pointer ml-auto"
            onClick={handleCloseToCart}
          />
        </header>
        <ul className="cart-item-list overflow-y-auto max-h-[100%] h-[100%] mt-1">
          {cartItem.map((item) => {
            return (
              <li
                className="cart-item animate-item flex px-1 py-2 gap-x-1 border-b"
                key={item.id}
              >
                <figure className="cart-item max-w-[60px]">
                  <img
                    src={item.images[0]}
                    alt={item.title}
                    className="aspect-square"
                  />
                </figure>
                <div className="cart-item-description">
                  <p className="text-[0.7rem] line-clamp-2">
                    {item.description}
                  </p>
                  <div className="increase_quantity decrease_quantity flex items-center mt-1 space-x-2">
                    <FiIcons.FiPlus
                      onClick={() =>
                        handleCartQuantityItem("increment", item.id)
                      }
                      aria-label="increment"
                    />
                    <input
                      type="text"
                      title="item-quantity"
                      value={item.itemQuantity}
                      className="max-w-[46px] text-center outline-0 border border-[#c2c2c2] h-6"
                    />
                    <FiIcons.FiMinus
                      onClick={() =>
                        handleCartQuantityItem("decrement", item.id)
                      }
                      aria-label="decrement"
                    />
                    <div className="price text-[0.8rem]">
                      Rs : {item?.itemPrice}
                    </div>
                  </div>
                </div>
                <div className="remove-cart-item self-center">
                  <MdDelete
                    className="text-[1.2rem] cursor-pointer text-[#2874f0]"
                    onClick={() => dispatch(removeCartItem(item.id))}
                  />
                </div>
              </li>
            );
          })}
        </ul>
        <footer className="total-amount sticky bottom-0 shadow-lg px-2">
          <div className="price-item">Price ({cartCount}items)</div>
          <div className="overall-amount">Total Amount {totalAmount}</div>
        </footer>
      </div>
    </div>
  );
};

export default Cart;
