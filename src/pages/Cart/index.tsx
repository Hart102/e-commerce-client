import { Button, Image } from "@nextui-org/react";
import axios from "axios";
import { useEffect, useState } from "react";
import { FaTrashAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { ProductType } from "@/types/index";
import { api, authentication_token, imageUrl, setCartCount } from "@/lib";
import Loader from "@/components/Loader";

export default function CheckoutSummary() {
  const navigation = useNavigate();
  const [cartItems, setCartItems] = useState<ProductType[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [selectedItems, setSelectedItems] = useState<ProductType[]>([]);

  const handleSelectSingleItem = (id: string) => {
    const product = cartItems.find((item) => item.id === id);
    if (product !== undefined) {
      const selectedItem = selectedItems.find((item) => item.id === id);
      if (selectedItem == undefined) {
        setSelectedItems([...selectedItems, product]);
      } else {
        setSelectedItems(selectedItems.filter((item) => item.id !== id));
      }
    }
  };

  const calculateTotalPriceOfEachItem = (item: ProductType) => {
    const priceWithoutDollarSign = Number(item.price.slice(3));
    return (item.totalPrice = `${(
      priceWithoutDollarSign * item.quantity
    ).toFixed(2)}`);
  };

  const calculateSum = () => {
    let subTotal: number = 0;
    cartItems.forEach((item) => {
      subTotal += Number(item.price.slice(3));
    });
    const total: number = subTotal + 18.0;
    return { subTotal, total };
  };
  const total = calculateSum();

  const deCreaseQty = (index: number) => {
    if (cartItems[index].quantity !== 1) {
      cartItems[index].quantity -= 1;
      calculateTotalPriceOfEachItem(cartItems[index]);
      setCartItems([...cartItems]);
    }
  };

  const increaseQty = (index: number) => {
    cartItems[index].quantity += 1;
    calculateTotalPriceOfEachItem(cartItems[index]);
    setCartItems([...cartItems]);
  };

  const removeItemFromCart = async (index: number) => {
    const { data } = await axios.delete(
      `${api}/cart/remove-cart-item/${cartItems[index].id}`,
      { headers: { Authorization: authentication_token } }
    );
    if (!data.error) {
      cartItems.splice(index, 1);
      setCartItems([...cartItems]);
      setCartCount(data.total_items);
    }
  };

  const handleCheckout = () =>
    navigation("/shop/checkout", { state: selectedItems });

  useEffect(() => {
    if (authentication_token == null) return navigation("/login");
    setIsLoading(true);
    const fetchCartItems = async () => {
      const { data } = await axios.get(`${api}/cart/get-cart-items`, {
        headers: { Authorization: authentication_token },
      });
      setIsLoading(false);
      if (!data.error) {
        setCartItems(
          data.map((product: ProductType) => ({
            ...product,
            quantity: 1,
            isChecked: false,
            totalPrice: product.price.slice(3),
          }))
        );
      }
    };
    fetchCartItems();
  }, [navigation]);

  return isLoading ? (
    <Loader />
  ) : (
    <div className="flex flex-col md:flex-row md:p-0 p-4 justify-center">
      <div className="w-full md:w-7/12 flex flex-col md:py-5 md:px-3">
        <span>CART ITEMS ({cartItems?.length})</span>
        {/* Desktop */}
        <div className="w-full hidden md:flex flex-col gap-2 mt-5">
          {cartItems &&
            cartItems?.map((product, index) => (
              <label
                key={index}
                htmlFor={`${product?.id}`}
                className="w-full pt-3 flex items-center gap-4 [&_p]:text-neutral-600 cursor-pointer"
              >
                <div className="w-full flex flex-col gap-4 text-black text-sm">
                  <Button
                    size="sm"
                    onClick={() => removeItemFromCart(index)}
                    className="flex justify-end items-center gap-1 text-xs mb-2 text-red-500"
                  >
                    <FaTrashAlt size={10} />
                    <p>Remove</p>
                  </Button>
                  <div className="w-full flex justify-between">
                    <div className="flex gap-5">
                      <div className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          id={`${product?.id}`}
                          className="cursor-pointer"
                          onClick={() => handleSelectSingleItem(product?.id)}
                        />
                        <Image
                          src={imageUrl(product?.images[0])}
                          alt="product image"
                          classNames={{
                            img: "rounded-lg w-[100px] h-[100px]",
                          }}
                        />
                      </div>
                      <div className="md:w-1/2 flex flex-col gap-2 capitalize">
                        <p>{product?.name}</p>
                        {product.category == "fashion" && (
                          <p>Size: ({product?.size})</p>
                        )}
                        <h2 className="text-xl">{product?.price}</h2>
                      </div>
                    </div>
                    <div className="flex flex-col gap-3">
                      <div className="flex items-center gap-4">
                        <div className="bg-deep-gray-200 rounded text-2xl">
                          <Button size="sm" onClick={() => deCreaseQty(index)}>
                            -
                          </Button>
                        </div>
                        <p className="border px-4 py-2">{product?.quantity}</p>
                        <div className="bg-deep-gray-200 rounded text-2xl">
                          <Button size="sm" onClick={() => increaseQty(index)}>
                            +
                          </Button>
                        </div>
                      </div>
                      <h2 className="text-xl self-end">
                        NGN {product?.totalPrice}
                      </h2>
                    </div>
                  </div>
                  <div className="bg-deep-gray-200 shadow-sm py-1 rounded-full"></div>
                </div>
              </label>
            ))}
        </div>
      </div>
      <div className="md:hidden mt-5 px-2 flex flex-col gap-4">
        {cartItems &&
          cartItems?.map((product, index) => (
            <label
              htmlFor={`${product?.id}${index}`}
              key={product?.id}
              className="flex flex-col gap-2 text-sm cursor-pointer"
            >
              <div className="flex justify-between gap-2">
                <div className="flex gap-2 items-end">
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      id={`${product?.id}${index}`}
                      onClick={() => handleSelectSingleItem(product?.id)}
                    />
                    <Image
                      src={imageUrl(product?.images[0])}
                      classNames={{
                        img: "w-[100px] h-[100px] rounded-lg",
                      }}
                    />
                  </div>
                  <div className="text-neutral-700">
                    <p className="text-lg text-black">{product?.price}</p>
                    {product.category !== "fashion" && (
                      <p>Size: ({product?.size})</p>
                    )}
                  </div>
                </div>
                <div className="flex flex-col gap-1 text-center">
                  <div className="bg-deep-gray-200 rounded text-2xl">
                    <Button size="sm" onClick={() => deCreaseQty(index)}>
                      -
                    </Button>
                  </div>
                  <p className="border px-4 py-2">{product?.quantity}</p>
                  <div className="bg-deep-gray-200 rounded text-2xl">
                    <Button size="sm" onClick={() => increaseQty(index)}>
                      +
                    </Button>
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <p className="capitalize">{product?.name}</p>
                <div className="flex justify-end">
                  <Button
                    size="sm"
                    className="flex items-center gap-2 text-xs text-red-500"
                    onClick={() => removeItemFromCart(index)}
                  >
                    <FaTrashAlt />
                    Remove
                  </Button>
                </div>
              </div>
            </label>
          ))}
      </div>
      <div className="flex flex-col gap-8 w-full md:w-4/12 md:py-10 md:px-12 py-10 px-5">
        <p className="text-xl">SUMMARY</p>
        <div className="flex flex-col gap-4 border-b pb-3 ">
          <div className="flex items-center justify-between">
            <p className="text-neutral-700">SUBTOTAL</p>
            <p className="text-xl">NGN {total.subTotal}</p>
          </div>
          <div className="flex items-center justify-between">
            <p className="text-neutral-700">SHIPPING FEE</p>
            <p className="text-xl">NGN 18.00</p>
          </div>
        </div>
        <div className="flex justify-between text-lg">
          <b>TOTAL</b>
          <p className="text-xl">NGN {total.total}</p>
        </div>
        <div className="flex flex-col gap-8 justify-between h-full pb-10">
          <Button
            onClick={handleCheckout}
            disabled={selectedItems.length === 0}
            className={`w-full rounded-full font-bold bg-dark-blue-100 mt-5 text-white ${
              selectedItems.length === 0
                ? "cursor-not-allowed opacity-55"
                : "cursor-pointer"
            }`}
          >
            CHECK OUT
          </Button>
          <p>NEED HELP ?</p>
        </div>
      </div>
    </div>
  );
}
