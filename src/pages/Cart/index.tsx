import { Button, Image } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { FaTimes } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { ContainerLG, ContainerMD, ContainerSM } from "@/layout/Container";
import { ProductType } from "@/types/index";
import { products } from "@/dummy/products";

export default function CheckoutSummary() {
  const navigation = useNavigate();
  const [cartItems, setCartItems] = useState<ProductType[]>([]);
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
    const priceWithoutDollarSign = Number(item.price.slice(1));
    return (item.totalPrice = `${(
      priceWithoutDollarSign * item.quantity
    ).toFixed(2)}`);
  };

  const deCreaseQty = (index: number) => {
    if (cartItems[index].quantity !== 0) {
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

  const removeIteFromCart = (index: number) => {
    cartItems.splice(index, 1);
    setCartItems([...cartItems]);
  };

  const calculateSum = () => {
    let subTotal: number = 0;
    cartItems.forEach((item) => {
      subTotal += Number(item.price.slice(1));
    });
    const total: number = subTotal + 18.0;
    return { subTotal, total };
  };
  const total = calculateSum();

  const handleCheckout = () =>
    navigation("/shop/checkout", { state: selectedItems });

  useEffect(() => {
    setCartItems(
      products.map((product) => ({
        ...product,
        quantity: 1,
        isChecked: false,
        totalPrice: product.price.slice(1),
      }))
    );
  }, []);

  return (
    <ContainerLG columnReverse="flex-col">
      <ContainerMD>
        {/* DESKTOP PRODUCT TEMPLATE */}
        <div className="hidden md:flex justify-between gap-4 border-b pb-5 px-2">
          <div className="w-[60%]">
            <span>SELECT ITEMS</span>
          </div>
          <div className="w-[40%] flex justify-between">
            <span>QUANTITY</span>
            <span>TOTAL</span>
          </div>
        </div>

        <div className="w-full hidden md:block">
          {cartItems.map((product, index) => (
            <div
              key={product.id}
              className="flex items-center gap-4 w-full border-b pb-8 md:px-2"
            >
              <div className="w-[60%] flex gap-2">
                <input
                  type="checkbox"
                  className="hidden md:block cursor-pointer"
                  onClick={() => handleSelectSingleItem(product.id)}
                />

                <div className="flex items-center gap-5">
                  <Image
                    width={80}
                    src={product.images[0]}
                    alt="product image"
                  />
                  <div className="capitalize">
                    <b className="text-neutral-600 line-clamp-2">
                      {product.name}
                    </b>
                    <p className="text-neutral-400">Size: {product.size}</p>
                    <b className="hidden md:block text-neutral-600 mt-2">
                      {product.price}
                    </b>
                  </div>
                </div>
              </div>

              <div className="w-[40%] flex items-center justify-between">
                <div className="flex items-center">
                  <Button onClick={() => deCreaseQty(index)}>-</Button>
                  <div className="border px-2.5 py-1">{product.quantity}</div>
                  <Button onClick={() => increaseQty(index)}>+</Button>
                </div>

                <div className="flex items-center gap-8">
                  <b className="text-neutral-600">$ {product.totalPrice}</b>
                  <div
                    onClick={() => removeIteFromCart(index)}
                    className="rounded-full bg-black text-white p-1 cursor-pointer"
                  >
                    <FaTimes />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* MOBILE PRODUCT TEMPLATE */}
        <div className="md:hidden">
          {cartItems.map((product, index) => (
            <div
              key={product.id}
              className="w-full [&_span]:text-neutral-600 border-b py-5 flex gap-8 md:gap-5"
            >
              <div className="flex flex-col1 gap-2">
                <input
                  type="checkbox"
                  className="cursor-pointer"
                  onClick={() => handleSelectSingleItem(product.id)}
                />
                <div className="h-[100px] w-[100px]">
                  <Image
                    src={product.images[0]}
                    alt="product image"
                    className="object-contain w-full h-full"
                  />
                </div>
              </div>
              <div className="w-full flex flex-col gap-4 capitalize">
                <div>
                  <b className="text-neutral-600">{product.name}</b>
                  <p className="text-neutral-400">Size: {product.size}</p>
                </div>

                <div className="w-full flex flex-col gap-2">
                  <div className="flex items-center justify-between">
                    <span>PRICE</span>
                    <b className="text-neutral-600">{product.price}</b>
                  </div>

                  <div className="flex items-center justify-between">
                    <span>QUANTIY</span>
                    <div className="border rounded-full h-[25px] w-[25px] flex items-center justify-center">
                      <Button onClick={() => deCreaseQty(index)}>-</Button>
                    </div>
                    <div className="border px-3 py-1">{product.quantity}</div>
                    <div className="border rounded-full h-[25px] w-[25px] flex items-center justify-center">
                      <Button onClick={() => increaseQty(index)}>+</Button>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <span>TOTAL</span>
                    <b className="text-neutral-600">$ {product.totalPrice}</b>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </ContainerMD>

      <ContainerSM>
        <p className="text-xl">SUMMARY</p>
        <div className="flex flex-col gap-4 border-b pb-3 [&_b]:text-neutral-600">
          <div className="flex items-center justify-between">
            <p className="text-neutral-700">SUBTOTAL</p>
            <b>$ {total.subTotal}</b>
          </div>
          <div className="flex items-center justify-between">
            <p className="text-neutral-700">SHIPPING FEE</p>
            <b>$ 18.00</b>
          </div>
        </div>
        <div className="flex justify-between text-lg">
          <b>TOTAL</b>
          <b>$ {total.total}</b>
        </div>
        <div className="flex flex-col gap-8 justify-between h-full pb-10">
          <Button
            onClick={handleCheckout}
            disabled={selectedItems.length === 0}
            className={`w-full rounded-full font-bold bg-black mt-5 text-white ${
              selectedItems.length === 0
                ? "cursor-not-allowed opacity-55"
                : "cursor-pointer"
            }`}
          >
            CHECK OUT
          </Button>

          <p>NEED HELP ?</p>
        </div>
      </ContainerSM>
    </ContainerLG>
  );
}
