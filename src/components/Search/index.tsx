import {
  Input,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@nextui-org/react";
import { useMemo, useState, useEffect, Dispatch, SetStateAction } from "react";
import { FaSearch, FaAngleDown } from "react-icons/fa";
import { ProductType } from "../../types/index";

type SearchProps = {
  items: ProductType[];
  searchResponse: Dispatch<SetStateAction<ProductType[]>>;
};

export default function Search({ items, searchResponse }: SearchProps) {
  const [query, setQuery] = useState<string>("");
  //   const [filterBy, setFilterBy] = useState<string>("");

  const searchResult = useMemo(() => {
    const result = items.filter((product) =>
      product.name.toLowerCase().includes(query.toLowerCase())
    );
    return result;
  }, [items, query]);

  //   const filterProducts = useMemo(() => {
  //     return items.filter(
  //       (product) => product.status.toLowerCase() == filterBy.toLowerCase()
  //     );
  //   }, [items, filterBy]);

  useEffect(() => {
    searchResponse(searchResult);
  }, [searchResult, searchResponse]);

  return (
    <div className="flex items-center justify-between md:px-4">
      <form className="flex items-center gap-2 border rounded px-2">
        <FaSearch size={18} className="text-deep-gray-100" />
        <Input
          size="sm"
          type="search"
          placeholder="Type to search..."
          classNames={{
            base: "h-10 border-0 outline-0",
            mainWrapper: "h-full",
            input: "text-small",
            inputWrapper: "h-full font-normal hover:border-0",
          }}
          style={{ outline: "0" }}
          onValueChange={(e) => setQuery(e)}
        />
      </form>

      <Dropdown>
        <DropdownTrigger>
          <div className="flex items-center gap-2 cursor-pointer text-sm py-2 px-3 border rounded text-neutral-500">
            Filter By:
            <FaAngleDown />
          </div>
        </DropdownTrigger>
        <DropdownMenu
          variant="light"
          className="flex flex-col p-5 rounded text-sm z-10 bg-white"
        >
          <DropdownItem
            key="Enabled"
            className="my-1 text-neutral-500"
            // onPress={() => setFilterBy("enabled")}
          >
            Enabled
          </DropdownItem>
          <DropdownItem
            key="disabled"
            className="my-1 text-neutral-500"
            // onPress={() => setFilterBy("disabled")}
          >
            Dsabled
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </div>
  );
}
