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
    if (filterFrom && filterTo) {
      setShowFilterOptions(false);
      onFilterApply();
    }
  };

  return (
    <div className="flex w-full items-center justify-between py-4">
      <h1 className="text-gray-9000 text-[42px] font-semibold">Products</h1>

      <div className="flex items-center gap-4 space-x-6 text-sm text-[#3E424A]-600">
        <p>
          Showing {productsFrom}–{productsTo} of {productsTotal} results
        </p>

        <div className="h-5 w-px bg-gray-300" />

        <div className="relative">
          <Button
            icon={FilterIcon}
            title={"Filter"}
            onClick={() => setShowFilterOptions(!showFilterOptions)}
            style="flex gap-[8px] cursor-pointer text-[#10151F]"
          />
          {showFilterOptions && (
            <div className="absolute top-full right-0 z-50 mt-2 flex w-[392px] max-w-[392px] flex-col gap-[20px] rounded-[8px] border border-[#E1DFE1] bg-[#FFFFFF] p-[16px]">
              <p className="text-semibold font-poppins text-[16px] text-[#10151F]">
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
        </div>
        <div className="relative">
          <Dropdown
            title={"Sort by"}
            options={sortByOptions}
            onChange={handleSortByChange}
            icon={DownArrowIcon}
            iconPosition="RIGHT"
            buttonStyle="cursor-pointer"
            contentStyle="absolute top-full right-0 mt-2 z-50 bg-[#FFFFFF] border border-[#E1DFE1] rounded-[8px] flex flex-col gap-[8px] py-[16px] min-w-[200px]"
            defaultValue={sortObject[sortBy] ?? "Sort by"}
          />
        </div>
      </div>
    </div>
  );
};

export default ProductsHeader;
