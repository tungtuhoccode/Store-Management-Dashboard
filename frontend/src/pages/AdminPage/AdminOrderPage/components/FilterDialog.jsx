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

import { PlusCircleIcon } from 'lucide-react';
  
export default function FilterDialog({column, title, options}){
    options = ["Pending", "Cancelled", "Shipped", "In Progress", "Delivered"]
    title = "Status"
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

    return (
    <Popover>
      <PopoverTrigger>
        <Button variant="outline" size="sm" className="h-8 border-dashed">
                <PlusCircleIcon className="mr-2 h-4 w-4" />
                {title}
            </Button>
      </PopoverTrigger>

      <PopoverContent  className="w-15 p-0">
        <Command>
          <CommandInput placeholder={`Filter ${title}`} />

          <CommandList>
            <CommandEmpty>No results</CommandEmpty>

            <CommandGroup >
              {options.map((opt) => {
                const isSel = selectedValues.has(opt);
                return (
                  <CommandItem
                    key={opt.value}
                    onSelect={() => toggleValue(opt)}
                    className="cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      checked={isSel}
                      readOnly
                      style={{ marginRight: 8 }}
                    />
                    {opt}
                  </CommandItem>
                );
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