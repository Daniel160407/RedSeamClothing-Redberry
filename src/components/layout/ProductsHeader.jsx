import { useState } from "react";
import DownArrowIcon from "../icons/DownArrowIcon";
import FilterIcon from "../icons/FilterIcon";
import Button from "../uiComponents/Button";
import Dropdown from "../uiComponents/Dropdown";
import Input from "../uiComponents/Input";

const ProductsHeader = ({
  productsFrom,
  productsTo,
  productsTotal,
  filterFrom,
  setFilterFrom,
  filterTo,
  setFilterTo,
  onFilterApply,
  sortBy,
  setSortBy,
}) => {
  const [showFilterOptions, setShowFilterOptions] = useState(false);

  const sortByOptions = [
    "New products first",
    "Price, low to high",
    "Price, high to low",
  ];

  const sortObject = {
    created_at: "New products first",
    price: "Price, low to high",
    "-price": "Price, high to low",
  };

  const handleSortByChange = (value) => {
    const key = Object.keys(sortObject).find((k) => sortObject[k] === value);
    setSortBy(key);
  };

  const handleFilterApply = () => {
    setShowFilterOptions(false);
    onFilterApply();
  };

  return (
    <div className="flex w-full items-center justify-between px-8 py-4">
      <h1 className="text-2xl text-gray-900">Products</h1>

      <div className="flex items-center space-x-6 text-sm text-gray-600">
        <p>
          Showing {productsFrom}–{productsTo} of {productsTotal} results
        </p>

        <div className="h-5 w-px bg-gray-300" />

        <Button
          icon={FilterIcon}
          title={"Filter"}
          onClick={() => setShowFilterOptions(!showFilterOptions)}
          style="flex gap-[8px] cursor-pointer"
        />
        {showFilterOptions && (
          <div className="top-[205px] left-[1332px] flex max-w-[392px] flex-col gap-[20px] rounded-[8px] border border-[#E1DFE1] bg-[#FFFFFF] p-[16px]">
            <p className="text-semibold font-poppins text-[16px]">
              Select price
            </p>
            <div className="flex gap-[10px]">
              <div className="max-w-[175px]">
                <Input
                  value={filterFrom}
                  setValue={(e) => setFilterFrom(e.target.value)}
                  placeholder="From *"
                  type={"text"}
                  style="max-w-[175px]"
                />
              </div>
              <div>
                <Input
                  value={filterTo}
                  setValue={(e) => setFilterTo(e.target.value)}
                  placeholder="To *"
                  type={"text"}
                  style="max-w-[175px]"
                />
              </div>
            </div>
            <Button
              title={"Apply"}
              style="w-[124px] h-[41px] rounded-[10px] py-[10px] px-[20px] flex gap-[10px] bg-[#FF4000] text-[14px] text-[#FFFFFF] font-poppins self-end cursor-pointer"
              onClick={handleFilterApply}
            />
          </div>
        )}

        <Dropdown
          title={"Sort by"}
          options={sortByOptions}
          onChange={handleSortByChange}
          icon={DownArrowIcon}
          iconPosition="RIGHT"
          buttonStyle="cursor-pointer"
          contentStyle="fixed top-[205px] left-[1597px] bg-[#FFFFFF] border border-[#E1DFE1] rounded-[8px] flex flex-col gap-[8px] py-[16px]"
          defaultValue={sortObject[sortBy] ?? "Sort by"}
        />
        <div></div>
      </div>
    </div>
  );
};

export default ProductsHeader;
