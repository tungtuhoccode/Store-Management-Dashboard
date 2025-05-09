import React from 'react'

import {Funnel} from "lucide-react"
import {
DropdownMenu,
DropdownMenuCheckboxItem,
DropdownMenuContent,
DropdownMenuItem,
DropdownMenuLabel,
DropdownMenuSeparator,
DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export default function CategoryHeaderWithFilter({column, availableFilterValues}){
    const filterValues = column.getFilterValue();
    return (
      <div className='flex justify-center items-center'>
        <span className='mr-2'>
          Categories
        </span>
        <span>
          <DropdownMenu>
          <DropdownMenuTrigger onClick={() => console.log("clicked")}>
          <div className="flex items-center relative">
            <Funnel variant="" className={`w-4 mt-1 ${filterValues.length >= 1 ? "text-black":"text-gray-400" }`}/>
            {filterValues.length > 0 && (
              <span className="absolute left-[10px] bottom-3 bg-black text-white text-xs rounded-full w-3 h-3 text-xs  flex items-center justify-center">
                {filterValues.length}
              </span>
            )}
          </div>
        </DropdownMenuTrigger>
              <DropdownMenuContent className="mt-2">
                <DropdownMenuLabel>Filter By</DropdownMenuLabel>
                  {/* Clear all filters */}
  
                <DropdownMenuSeparator />
                  {availableFilterValues.map( (category, id) =>
                      <DropdownMenuCheckboxItem key={id} 
                        checked={filterValues.includes(category)}
                        onCheckedChange={(checked) => {
                          const newValues = checked
                            ? [...filterValues, category]
                            : filterValues.filter((v) => v !== category);
                          column.setFilterValue(newValues);
                        }}
                        className="cursor-pointer">
                        {category}
                        </DropdownMenuCheckboxItem>
                  )}
                <DropdownMenuSeparator/>
            <DropdownMenuItem
              className="flex justify-center font-bold cursor-pointer"
              onSelect={() => column.setFilterValue([])}
            >
              Clear All
            </DropdownMenuItem>
                  
              </DropdownMenuContent>
          </DropdownMenu>
        </span>
      </div>
    )  
  }