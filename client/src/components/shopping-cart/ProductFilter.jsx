import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { filterOptions } from "@/config";
import React from "react";

function ProductFilter({ filters, handleFilter }) {
  return (
    <div className="bg-background rounded-lg shadow-sm">
      <div className="p-4 border-b">
        <h2 className="text-lg font-extrabold">Filters</h2>
      </div>
      <div className="p-4 space-y-2">
        {Object.keys(filterOptions).map((filter) => (
          <>
            <div>
              <h3 className="text-base font-bold">{filter}</h3>
              <div>
                {filterOptions[filter].map((option) => (
                  <Label className="flex items-center gap-2 mb-2 mt-2">
                    <Checkbox
                      className="border border-black"
                      checked={
                        filters &&
                        Object.keys(filters).length > 0 &&
                        filters[filter] &&
                        filters[filter].indexOf(option.id) > -1
                      }
                      onCheckedChange={() => handleFilter(filter, option.id)}
                    />{" "}
                    {option.label}
                  </Label>
                ))}
              </div>
            </div>
          </>
        ))}
      </div>
    </div>
  );
}

export default ProductFilter;
