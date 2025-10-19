import React, { useEffect, useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { ArrowUpDown } from "lucide-react";
import { sortOptions } from "@/config";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAllFilterProducts,
  fetchProductDetails,
} from "@/store/shop/products-slice";
import ProductTile from "@/components/shopping-cart/ProductTile";
import { useSearchParams } from "react-router-dom";
import ProductDetail from "@/components/shopping-cart/ProductDetail";
import ProductFilter from "@/components/shopping-cart/ProductFilter";

function createSearchParamsHelper(filterParams) {
  const queryParams = [];
  for (const [key, value] of Object.entries(filterParams)) {
    if (Array.isArray(value) && value.length > 0) {
      const paramValue = value.join(",");
      queryParams.push(`${key}=${encodeURIComponent(paramValue)}`);
    }
  }
  return queryParams.join("&");
}

function ProductListing() {
  const { productList, productDetails } = useSelector(
    (state) => state.shopProducts
  );
  const [filters, setFilters] = useState({});
  const [sort, setSort] = useState(null);
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const [openDetailsDialog, setOpenDetailsDialog] = useState(false);
  useEffect(() => {
    if (filters !== null && sort !== null)
      dispatch(
        fetchAllFilterProducts({ filterParams: filters, sortParams: sort })
      );
  }, [dispatch, sort, filters]);

  // console.log(filters);
  const handleSort = (value) => {
    // console.log(value);
    setSort(value);
  };
  function handleFilter(filterType, option) {
    // console.log(filterType, option);
    let filterCopy = { ...filters };
    const indexOfCurrentSection = Object.keys(filterCopy).indexOf(filterType);
    if (indexOfCurrentSection === -1) {
      filterCopy = {
        ...filterCopy,
        [filterType]: [option],
      };
    } else {
      const indexOfCurrentOption = filterCopy[filterType].indexOf(option);
      if (indexOfCurrentOption === -1) filterCopy[filterType].push(option);
      else filterCopy[filterType].splice(indexOfCurrentOption, 1);
    }
    setFilters(filterCopy);
    sessionStorage.setItem("filters", JSON.stringify(filterCopy));
  }

  useEffect(() => {
    setSort("price-lowtohigh");
    setFilters(JSON.parse(sessionStorage.getItem("filters")) || {});
  }, []);

  useEffect(() => {
    if (filters && Object.keys(filters).length > 0) {
      const createQueryString = createSearchParamsHelper(filters);
      setSearchParams(new URLSearchParams(createQueryString));
    }
  }, [filters]);

  function handleGetProductDetails(getProductId) {
    dispatch(fetchProductDetails(getProductId));
  }
  useEffect(() => {
    if (productDetails !== null) {
      setOpenDetailsDialog(true);
    }
  }, [productDetails]);
  return (
    <div className="grid grid-cols-1 md:grid-cols-[300px_1fr] gap-6 p-4 md:p-6">
      <ProductFilter filters={filters} handleFilter={handleFilter} />
      <div className="bg-background w-full rounded-md shadow-2xs">
        <div className="p-4 border-b flex items-center justify-between">
          <h2 className="text-lg font-semibold">All Products</h2>
          <div className="flex items-center gap-3">
            <span className="text-muted-foreground font-semibold">
              {productList?.length} products
            </span>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  className="flex items-center gap-1"
                >
                  <ArrowUpDown className="w-4 h-4" />
                  Sort By
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w[200px]">
                <DropdownMenuRadioGroup value={sort} onValueChange={handleSort}>
                  {sortOptions.map((sortItem) => (
                    <DropdownMenuRadioItem
                      value={sortItem.id}
                      key={sortItem.id}
                    >
                      {sortItem.label}
                    </DropdownMenuRadioItem>
                  ))}
                </DropdownMenuRadioGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
        <div
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4
         gap-4"
        >
          {productList && productList.length > 0
            ? productList.map((productItem) => (
                <ProductTile
                  product={productItem}
                  handleGetProductDetails={handleGetProductDetails}
                />
              ))
            : null}
        </div>
      </div>
      <ProductDetail
        open={openDetailsDialog}
        setOpen={setOpenDetailsDialog}
        productDetails={productDetails}
      />
    </div>
  );
}

export default ProductListing;
