import React, { useState } from 'react';

import { Popover, PopoverTrigger, PopoverContent } from '@/components/ui/popover';
import { Button } from '@/components/ui/button';

import {
  Command,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandSeparator,
} from '@/components/ui/command';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';

import { PlusCircleIcon, CheckIcon } from 'lucide-react';
  
export default function FilterDialog({column, title, capitilizedLabel = false}){
    const [selectedValues, setSelectedValues] = useState(new Set());
    const [searchTerm, setSearchTerm] = useState("")
    const options = [...column.getFacetedUniqueValues()]

    const toggleValue = (value) => {
        setSelectedValues(prevSet => {
            const next = new Set(prevSet)
            if (next.has(value)) next.delete(value)
            else next.add(value)
            
            //set filter values
            column.setFilterValue([...next])
            return next;
        })
    }

    const clearFilters = () => {
        setSelectedValues(new Set())
        column.setFilterValue([])
    }

    const renderSelectedBadges = () => {
        if (selectedValues.size === 0) return null;

        if (selectedValues.size < 3) {
            return (
            <>
                <Separator orientation='vertical' className='h-4' />
                {[...selectedValues].map(val => (
                <Badge
                    key={val}
                    variant="secondary"
                    className="rounded-sm px-1 font-normal ml-1"
                >
                    {val}
                </Badge>
                ))}
            </>
            );
        }

        return (
            <>
             <Separator orientation='vertical' className=' h-4' />
            <Badge variant="secondary" className="rounded-sm px-1 font-normal ml-1">
            {selectedValues.size} selected
            </Badge>
            </>
        );
    }

    return (
    <Popover className="relative">
        {/* Filter Button */}
      <PopoverTrigger className='flex'>
        <Button variant="outline" size="sm" className="h-8 border-dashed">
            <PlusCircleIcon className="mr-1 h-4 w-4" />
            <span>{title}</span>
            {renderSelectedBadges()}
        </Button>

      </PopoverTrigger>

      <PopoverContent align='start' className="w-15 p-0">
        <Command>
          <CommandInput placeholder={`Search filter value`} />

          <CommandList>
            <CommandEmpty>No results</CommandEmpty>

            <CommandGroup>
            {options.filter(opt => opt[0].toLocaleLowerCase().startsWith(searchTerm.toLocaleLowerCase())).map(opt => {
                const isSel = selectedValues.has(opt[0])
                return (
                <CommandItem
                    key={opt}
                    onSelect={() => toggleValue(opt[0])}
                    className="flex items-center justify-between px-3 py-2 rounded-md hover:bg-gray-100 cursor-pointer"
                >
                    {/* left side: checkbox + label */}
                    <div className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={isSel}
                        readOnly
                        className={`
                            h-4 w-4 rounded-full bg-white accent-slate-800 focus:ring-2 focus:ring-slate-900
                        `}
                        />
                        <span className={isSel ? "font-medium text-gray-900" : "text-gray-700"}>
                            {capitilizedLabel ? opt[0].slice(0,1).toUpperCase() + opt[0].slice(1) : opt[0]}
                        </span>
                    </div>

                     {/* right side: Number of items */}
                     <div className={isSel ? "font-medium text-gray-900" : "text-gray-700"}>
                          {opt[1]}
                     </div>

                </CommandItem>
                )
            })}
            </CommandGroup>

            {selectedValues.size > 0 && (
              <>
                <CommandSeparator />
                <CommandGroup>
                  <CommandItem onSelect={clearFilters}>
                    Clear filters
                  </CommandItem>
                </CommandGroup>
              </>
            )}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );

}