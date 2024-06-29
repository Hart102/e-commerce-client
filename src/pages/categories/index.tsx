import axios from "axios";
import { Link, useParams } from "react-router-dom";
import { FaAngleRight } from "react-icons/fa";
import { BiGridAlt, BiGrid } from "react-icons/bi";
import ProductTemplate from "@/components/ProductTemplate";
import { useEffect, useState } from "react";
import { ProductType } from "@/types/index";

export default function Categories() {
  const params = useParams();
  const [products, setProduct] = useState<ProductType>([]);
  const dummyCategories = ["clothings", "jewelry", "wrist watch", "phones"];

  useEffect(() => {
    const FetchRelatedProducts = async () => {
      const { data } = await axios.get(
        `${api}/products/category/${params.category}`
      );
      if (!data.error) {
        setProduct(data);
      }
    };
    FetchRelatedProducts();
  }, []);

  return (
    <div className="w-full flex gap-12 text-dark-gray-100 text-sm">
      <div className="w-3/12 hidden md:flex flex-col gap-4">
        <h1 className="text-xl font-semibold">Categories</h1>
        <div className="flex flex-col gap-1">
          {dummyCategories.map((category) => (
            <Link
              key={category}
              to={`/shop/${category}`}
              className="capitalize border rounded-lg  p-2 flex items-center justify-between hover:bg-deep-blue-100 hover:text-white"
            >
              {category}
              <FaAngleRight />
            </Link>
          ))}
        </div>
      </div>
      <div className="w-full md:w-9/12">
        <div className="flex flex-col gap-5">
          <div className="bg-deep-gray-50 rounded-lg px-4 md:px-10 p-10">
            <h2 className="text-3xl font-bold capitalize">{params.category}</h2>
          </div>
          <div className="flex items-center justify-between px-2">
            <div>
              <b>24</b> Products found
            </div>
            <div className="flex items-center gap-4">
              <BiGridAlt size={20} className="cursor-pointer" />
              <BiGrid size={20} className="cursor-pointer" />
            </div>
          </div>
          <div>
            <ProductTemplate
              onclick={() => console.log("something")}
              products={products}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
