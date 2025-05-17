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
  
export default function FilterDialog({column, title = "Title needed", options = ["1", "2", "3"]}){
    const [selectedValues, setSelectedValues] = useState(new Set());
    const [searchTerm, setSearchTerm] = useState("")

    const toggleValue = (value) => {
        setSelectedValues(prevSet => {
            const next = new Set(prevSet)
            if (next.has(value)) next.delete(value)
            else next.add(value)
            
            return next;
        })
    }



    const clearFilters = () => {
        setSelectedValues(new Set())
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
    <Popover>
        {/* Filter Button */}
      <PopoverTrigger className='flex '>
        <Button variant="outline" size="sm" className="h-8 border-dashed">
            <PlusCircleIcon className="mr-1 h-4 w-4" />
            <span>{title}</span>
            {renderSelectedBadges()}
        </Button>

      </PopoverTrigger>

      <PopoverContent  className="w-15 p-0">
        <Command>
          <CommandInput placeholder={`Search filter value`} />

          <CommandList>
            <CommandEmpty>No results</CommandEmpty>

            <CommandGroup>
            {options.filter(opt => opt.toLocaleLowerCase().startsWith(searchTerm.toLocaleLowerCase())).map(opt => {
                const isSel = selectedValues.has(opt)
                return (
                <CommandItem
                    key={opt}
                    onSelect={() => toggleValue(opt)}
                    className="
                    flex items-center justify-between
                    px-3 py-2
                    rounded-md
                    hover:bg-gray-100
                    cursor-pointer
                    "
                >
                    {/* left side: checkbox + label */}
                    <div className="flex items-center space-x-2">
                   <input
                    type="checkbox"
                    checked={isSel}
                    readOnly
                    className={`
                        h-4 w-4
                        rounded-full               /* try to make it circular */
                        bg-white                   /* unchecked bg */
                        accent-slate-800           /* checkmark & fill color */
                        focus:ring-2 focus:ring-slate-900
                    `}
                    />
                    <span className={isSel ? "font-medium text-gray-900" : "text-gray-700"}>
                        {opt}
                    </span>
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