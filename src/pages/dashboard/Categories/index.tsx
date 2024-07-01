import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  Button,
  useDisclosure,
  Input,
} from "@nextui-org/react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect, useMemo, useState } from "react";
import { BiAddToQueue } from "react-icons/bi";
import { ModalLayout } from "@/components/Modal";
import ModalTemplates, {
  changeModalContent,
} from "@/components/Modal/CompleteModal";
import { api, authentication_token } from "@/lib";

type CategoryWithProductCount = {
  id: number;
  name: string;
  status: string;
  createdAt: Date;
  product_count: number;
};

export default function Categories() {
  const navigation = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [categorie, setCategories] = useState<CategoryWithProductCount[]>([]);
  const [query, setQuery] = useState<string>("");
  const [currentTemplate, setCurrentTemplate] = useState<string>("");
  const [response, setResponse] = useState({ isError: false, message: "" });
  const [index, setIndex] = useState<number>(0);

  const FetchCategories = async () => {
    const { data } = await axios.get(`${api}/categories/fetch-all-categorie`, {
      headers: { Authorization: authentication_token },
    });
    if (data.error) {
      setResponse({ isError: true, message: data.error });
      handleChangeModalContent("03");
    } else {
      setCategories(data);
    }
  };

  const searchResult = useMemo(() => {
    return categorie.filter((cat: CategoryWithProductCount) =>
      cat.name.toLowerCase().includes(query.toLowerCase())
    );
  }, [categorie, query]);

  useEffect(() => {
    FetchCategories();
  }, []);

  const templates = ModalTemplates({
    onCancle: onClose,
    onContinue: () => DeleteCategory(),
    confirmationMessage: "Are you sure you want to delete this ?",
    response,
  });

  const handleChangeModalContent = (template: string) => {
    changeModalContent({
      template,
      templates,
      onOpen,
      setCurrentTemplate,
    });
  };
  const handleOpenModalForDeletingOfItems = (index: number) => {
    setIndex(index);
    handleChangeModalContent("02");
  };

  const DeleteCategory = async () => {
    const { data } = await axios.delete(
      `${api}/categories/delete/${categorie[index].id}`,
      {
        headers: { Authorization: authentication_token },
      }
    );
    if (data.error) {
      setResponse({ isError: true, message: data.error });
      handleChangeModalContent("03");
    } else {
      setResponse({ isError: false, message: data.message });
      handleChangeModalContent("03");
      categorie.splice(index, 1);
      setCategories([...categorie]);
    }
  };

  const EditCategory = (category: CategoryWithProductCount) =>
    navigation("/dashboard/categories/edit", { state: category });

  return (
    <>
      <div className="flex flex-col gap-8">
        <div className="flex flex-col gap-3">
          <div className="flex items-center justify-between px-4">
            <form className="flex w-1/2 items-center gap-2 border rounded-lg px-2">
              <Input
                size="sm"
                type="search"
                placeholder="Search category by name"
                classNames={{
                  base: "h-10 text-sm outline-0",
                  mainWrapper: "h-full",
                  input: "text-small",
                  inputWrapper: "h-full font-normal hover:border-0",
                }}
                style={{ outline: "0" }}
                onValueChange={setQuery}
              />
            </form>
            <Button
              onClick={() => navigation("/dashboard/categories/create")}
              className="py-1 px-2 rounded-lg flex items-center gap-1 font-semibold bg-deep-blue-100 text-white"
            >
              <BiAddToQueue />
              <p className="text-sm">ADD CATEGORY</p>
            </Button>
          </div>
          <Table
            classNames={{
              base: "text-center overflow-x-scroll md:overflow-x-auto",
              th: "capitalize bg-dark-gray-200",
              tbody: "capitalize bg-white py-4 text-sm",
            }}
          >
            <TableHeader>
              <TableColumn>
                <div className="text-start">
                  <b>Name</b>
                </div>
              </TableColumn>
              <TableColumn>Products</TableColumn>
              <TableColumn>Status</TableColumn>
              <TableColumn>Actions</TableColumn>
            </TableHeader>
            {searchResult.length > 0 ? (
              <TableBody>
                {searchResult.map((category, index) => (
                  <TableRow key={category.id} className="hover:bg-deep-gray-50">
                    <TableCell>
                      <div className="text-start">{category.name}</div>
                    </TableCell>

                    <TableCell>{category.product_count}</TableCell>
                    <TableCell>
                      <p
                        className={`py-1 rounded ${
                          category.status == "active"
                            ? "text-deep-blue-100"
                            : "text-deep-red-100"
                        }`}
                      >
                        {category.status}
                      </p>
                    </TableCell>
                    <TableCell>
                      <Dropdown>
                        <DropdownTrigger className="cursor-pointer">
                          ...
                        </DropdownTrigger>
                        <DropdownMenu
                          aria-label="Dynamic Actions"
                          className="z-10 bg-white text-deep-green-200 text-sm"
                        >
                          <DropdownItem
                            color="default"
                            className="py-1 my-1 hover:bg-deep-green-50 rounded"
                            onClick={() => EditCategory(category)}
                          >
                            Edit
                          </DropdownItem>
                          <DropdownItem
                            color="default"
                            className="py-1 my-1 hover:bg-deep-green-50 rounded"
                            onClick={() =>
                              handleOpenModalForDeletingOfItems(index)
                            }
                          >
                            Delete
                          </DropdownItem>
                        </DropdownMenu>
                      </Dropdown>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            ) : (
              <TableBody emptyContent={"No rows to display."}>{[]}</TableBody>
            )}
          </Table>
        </div>
      </div>
      <ModalLayout isOpen={isOpen} onClose={onClose}>
        {templates[currentTemplate]}
      </ModalLayout>
    </>
  );
}
