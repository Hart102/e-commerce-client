import axios from "axios";
import { Link, useParams } from "react-router-dom";
import { FaAngleRight } from "react-icons/fa";
import { BiGridAlt, BiGrid, BiMenu } from "react-icons/bi";
import ProductTemplate from "@/components/ProductTemplate";
import { useEffect, useState } from "react";
import { ProductType } from "@/types/index";
import { api } from "@/lib";

export default function Categories() {
  const params = useParams();
  const [products, setProduct] = useState<ProductType[]>([]);
  const [desktopGrid, setDesktopGrid] = useState<number>(3);
  const [mobileGrid, setMobileGrid] = useState<number>(1);

  const dummyCategories = ["clothings", "jewelry", "wrist watch", "phones"];

  const ChanDesktopGrid = (gridCoumns: number) => setDesktopGrid(gridCoumns);
  const ChangeMobileGrid = (gridColumns: number) => {
    setDesktopGrid(2);
    mobileGrid > 1 ? setMobileGrid(1) : setMobileGrid(gridColumns);
  };

  useEffect(() => {
    const FetchRelatedProducts = async () => {
      const { data } = await axios.get(`${api}/products/category/electronics`);
      if (!data.error) {
        setProduct(data);
      }
    };
    FetchRelatedProducts();
  }, []);

  return (
    <div className="w-full flex gap-12 text-dark-gray-100 text-sm relative">
      <div className="w-3/12 hidden md:flex flex-col gap-4">
        <h1 className="text-xl font-semibold">Categories</h1>
        <div className="flex flex-col gap-1">
          {dummyCategories.map((category) => (
            <Link
              key={category}
              to={`/shop/${category}`}
              className={`capitalize border rounded-lg  p-2 flex items-center justify-between hover:border-deep-blue-100 ${
                params?.category == category && "bg-deep-blue-100 text-white"
              }`}
            >
              {category}
              <FaAngleRight />
            </Link>
          ))}
        </div>
      </div>
      <div className="w-full md:w-9/12">
        <div className="flex flex-col gap-8">
          <div className="bg-deep-gray-50 rounded-lg px-4 md:px-10 p-10">
            <h2 className="text-3xl font-bold capitalize">{params.category}</h2>
          </div>
          <div className="flex items-center justify-between px-2">
            <div>
              <b>24</b> Products found
            </div>
            <div className="flex items-center gap-4">
              <BiMenu
                size={20}
                onClick={() => ChangeMobileGrid(2)}
                className="cursor-pointer"
              />
              <BiGrid
                size={20}
                onClick={() => ChanDesktopGrid(3)}
                className="cursor-pointer"
              />
              <BiGridAlt
                size={20}
                onClick={() => ChanDesktopGrid(4)}
                className="cursor-pointer"
              />
            </div>
          </div>
          <div
            className={`grid grid-cols-${mobileGrid} md:grid-cols-${desktopGrid} gap-4`}
          >
            <ProductTemplate products={products} />
          </div>
        </div>
      </div>
    </div>
  );
}
