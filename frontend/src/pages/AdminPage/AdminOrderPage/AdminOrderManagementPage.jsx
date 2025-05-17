import React, { useState, useMemo } from 'react'
import axios from "../../../lib/axios.js"

import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'

import {
    useReactTable,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    flexRender,
  } from "@tanstack/react-table"
  import { Label } from "@/components/ui/label"
  import { ArrowUpDown, ChevronDown, MoreHorizontal, ArrowUp, ArrowDown, ListFilter, Funnel,        CheckCircle2Icon,
    SlidersHorizontal,
    CheckCircleIcon,
    AlertCircle,
    ChevronDownIcon,
    ChevronLeftIcon,
    ChevronRightIcon,
    ChevronsLeftIcon,
    ChevronsRightIcon,
    ColumnsIcon,
    GripVerticalIcon,
    LoaderIcon,
    MoreVerticalIcon,
    PlusIcon,
    TrendingUpIcon,
    CalendarDays,
    PlusCircleIcon,
    Package,
    Package2,
    Hash,
    Download,
    BarChart,
    Calculator,
    ListOrdered,
    Tags,
    LayoutGrid,
    Archive,
    Layers,
    PackageCheck,
    Puzzle,
    Banknote, 
    Wallet, 
    Coins,
    Plus
} from "lucide-react"
import { Badge } from "@/components/ui/badge"
  import { Button } from "@/components/ui/button"
  import { Checkbox } from "@/components/ui/checkbox"
  import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"
  import { Input } from "@/components/ui/input"
  import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"
  import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
import { generateUniqueValues, optimizedData } from '@/pages/AdminPage/Utils/filterHelper'
import FilterDialog from './components/FilterDialog.jsx'

import OrderPageHeader from './components/OrderPageHeader'

const data = [
        {
            "order_id": "1135e96f-702b-4bc9-acb7-31a9d43c00f4",
            "order_number": "10000002",
            "user_email": "vunguyen@gmail.com",
            "total_amount": "276.83",
            "create_at": "2025-05-05T10:28:12.449Z",
            "item_count": "3",
            "fulfillment_status": "pending"
        },
        {
            "order_id": "cccb9a65-66b3-463f-9741-cae95a4a4683",
            "order_number": "10000006",
            "user_email": "tungadmin@gmail.com",
            "total_amount": "69.80",
            "create_at": "2025-05-11T22:08:12.338Z",
            "item_count": "3",
            "fulfillment_status": "pending"
        },
        {
            "order_id": "e7955cae-e83c-4639-8c20-bc1b0f23510c",
            "order_number": "10000007",
            "user_email": "tungadmin@gmail.com",
            "total_amount": "19.94",
            "create_at": "2025-05-11T22:09:17.212Z",
            "item_count": "1",
            "fulfillment_status": "pending"
        },
        {
            "order_id": "b0462ebe-d0e2-4ce0-9027-c2132e6c68de",
            "order_number": "10000003",
            "user_email": "test2@gmail.com",
            "total_amount": "101.69",
            "create_at": "2025-05-05T12:35:18.303Z",
            "item_count": "1",
            "fulfillment_status": "in progress"
        },
        {
            "order_id": "a88f3dfc-186b-4f27-ab55-9baa0421af26",
            "order_number": "10000004",
            "user_email": "test2@gmail.com",
            "total_amount": "355.24",
            "create_at": "2025-05-06T14:52:02.455Z",
            "item_count": "5",
            "fulfillment_status": "shipped"
        },
        {
            "order_id": "216d4034-9c35-4dde-be15-03af4960acc8",
            "order_number": "10000001",
            "user_email": "test2@gmail.com",
            "total_amount": "300.56",
            "create_at": "2025-05-05T06:34:27.455Z",
            "item_count": "3",
            "fulfillment_status": "delivered"
        },
        {
            "order_id": "c152ee43-8126-44cd-82e2-9c659220b108",
            "order_number": "10000008",
            "user_email": "tunguser@gmail.com",
            "total_amount": "74.00",
            "create_at": "2025-05-11T23:29:42.436Z",
            "item_count": "3",
            "fulfillment_status": "cancelled"
        },
        {
            "order_id": "157cbabb-29b8-4e88-a084-a7284345b7a3",
            "order_number": "10000005",
            "user_email": "tungadmin@gmail.com",
            "total_amount": "51.43",
            "create_at": "2025-05-11T22:04:37.833Z",
            "item_count": "2",
            "fulfillment_status": "shipped"
        },
        
    ].sort( (a,b) =>  b.order_number.localeCompare(a.order_number))

const columns = [
  {
    accessorKey: "order_number", 
    header: ({column}) => {
      const isSorted = column.getIsSorted();

      return (
        <Button
          variant="ghost"
          onClick={column.getToggleSortingHandler()}
          className="p-0"
        >
          Order Number

          {isSorted === false && <ArrowUpDown className="text-gray-400"/>}
          {isSorted === 'asc' && <ArrowDown className=""/>}
          {isSorted === 'desc' && <ArrowUp className=""/>}
        </Button>
      );
        
    },
    size: 120,
    cell: (props) => (
      <div className='flex items-center gap-1'>
          <Hash size="12px" className='text-primary' />  {props.getValue()}
      </div>
    ), 
    enableSorting: true,
    enableSortingRemoval: true,
  },
  {
    accessorKey: "user_email", 
    header: "User Email",
    size: 160,
  },
  {
    accessorKey: "item_count", 
    header: "Item Count",
    size: 100,
    cell: (props) => (
      <div className='flex items-center gap-1 justify-center'>
          <Package2 size="12px" className='text-primary' />  {props.getValue()}
      </div>
    ), 
    meta: {
      headerAndCellStyle: "text-center",
    }
  },
  {
    accessorKey: "total_amount", 
    header: "Total Amount",
    size: 130,
    cell: (props) => (
      <div className='w-full flex justify-center items-center gap-1'>
            ${props.getValue()}
      </div>
    ), 
    meta: {
      headerAndCellStyle: "text-center",
    }
  },
  {
    accessorKey: "create_at", 
    header: ({column}) => {
      const isSorted = column.getIsSorted();

      return (
        <Button
          variant="ghost"
          onClick={column.getToggleSortingHandler()}
          className="p-0"
        >
          Date Created

          {isSorted === false && <ArrowUpDown className="text-gray-400"/>}
          {isSorted === 'asc' && <ArrowDown className=""/>}
          {isSorted === 'desc' && <ArrowUp className=""/>}
        </Button>
      );
        
    },
    size: 200,
    
    cell: (props) => (
      <div className='flex items-center gap-1'>
          <CalendarDays size="16px" className='text-primary'/> {formatDate(props.getValue())}
      </div>
    ), 

    enableSorting: true,
    enableSortingRemoval: true,
  },
  {
    accessorKey: "fulfillment_status", 
    header: "Order Status", 
    size: 140,
    cell: ({ getValue }) => {
    const status = getValue();
    const statusMap = {
      "pending": {
        label: "Pending",
        color: "bg-amber-100 text-amber-800",
        dot: "bg-amber-500"
      },
      "in progress": {
        label: "In Progress",
        color: "bg-blue-100 text-blue-800",
        dot: "bg-blue-500"

      },
      "shipped": {
        label: "Shipped",
        color: "bg-teal-100 text-teal-800",
        dot: "bg-teal-500"
      },
      "cancelled": {
        label: "Cancelled",
        color: "bg-rose-100 text-rose-800",
        dot: "bg-rose-500"
      },
    "delivered": {
        label: "Delivered",
        color: "bg-green-100 text-green-800",
        dot: "bg-green-500"
      },
};

    const { label, color, dot } = statusMap[status] || {
      label: status,
      color: "bg-gray-100 text-gray-700",
      dot: "bg-gray-500",
    };

    return (
      <div className={`inline-flex items-center gap-2 px-2 py-1 rounded-full text-xs font-medium ${color}`}>
        <span className={`w-2 h-2 rounded-full ${dot}`} />
        {label}
      </div>
    );
  },
    meta: {
      headerAndCellStyle: "text-left",
    }
  },
]

const FilterAndSearch = () => {
  return (
    <div className="flex items-center justify-between mb-3">
      {/* Left side: filter input, faceted filter buttons, reset */}
      <div className="flex flex-1 flex-col-reverse items-start gap-y-2 sm:flex-row sm:items-center sm:space-x-2">
        <Input
          placeholder="Filter tasks..."
          className="h-8 w-[150px] lg:w-[250px]"
          readOnly
        />

        <div className="flex gap-x-2">
          <Button variant="outline" size="sm" className="h-8 border-dashed">
            <PlusCircleIcon className="mr-2 h-4 w-4" />
            Status
          </Button>
          <Button variant="outline" size="sm" className="h-8 border-dashed">
            <PlusCircleIcon className="mr-2 h-4 w-4" />
            User
          </Button>
        </div>

        <Button variant="ghost" className="h-8 px-2 lg:px-3">
          Reset
        </Button>
      </div>

      {/* Right side: view options stub */}
      <div>
        <Button variant="outline">
           <SlidersHorizontal/> <span>View</span>
          </Button>
      </div>
    </div>
  )
}

function formatDate(isoString) {
  const date = new Date(isoString);

  const day = String(date.getDate()).padStart(2, '0');
  const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
                      "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const month = monthNames[date.getMonth()];
  const year = date.getFullYear();

  let hours = date.getHours();
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const ampm = hours >= 12 ? 'PM' : 'AM';

  hours = hours % 12 || 12; // Convert to 12-hour format and replace 0 with 12

  return `${day} ${month} ${year}, ${hours}:${minutes} ${ampm}`;
}

/*
  "order_id": "1135e96f-702b-4bc9-acb7-31a9d43c00f4",
  "order_number": "10000002",
  "user_email": "vunguyen@gmail.com",
  "total_amount": "276.83",
  "create_at": "2025-05-05T10:28:12.449Z",
  "item_count": "3",
  "fulfillment_status": "pending"
*/
export default function AdminOrderManagementPage () {
    const queryClient = useQueryClient();
    const [sorting, setSorting] = React.useState([])
    const [columnFilters, setColumnFilters] = React.useState([
      {id: "fulfillment_status", value: []}, 
      {id: "user_email", value: []},
    ])

    const table = useReactTable({
        data: data,
        columns,
        state: {
          sorting,
          columnFilters
        },
        getCoreRowModel: getCoreRowModel(),
        onSortingChange: setSorting,
        getFilteredRowModel: getFilteredRowModel(),
        onColumnFiltersChange: setColumnFilters,
        getSortedRowModel: getSortedRowModel(),
      })

    return(
    <div className="pl-5 pr-5 pt-4">
          {/* Page Header */}
          <OrderPageHeader/>
          <FilterAndSearch/>
          <FilterDialog/>

          {/* Table */}
          <div className="border rounded-sm">
            <div className="w-full">
              <Table className="w-full table-fixed">
                <TableHeader>
                  {table.getHeaderGroups().map((headerGroup) => (
                    <TableRow key={headerGroup.id}>
                      {headerGroup.headers.map((header) => {
                        const cls = header.column.columnDef.meta?.headerAndCellStyle ?? "";
                        console.log(cls)
                        return (
                        <TableHead 
                            key={header.id} 
                            className={"py-1 z-10 text-black text-sm " + cls}
                            style={{ width: header.getSize() }}
                        >
                          {header.isPlaceholder
                            ? null
                            : flexRender(
                                header.column.columnDef.header,
                                header.getContext()
                              )}
                        </TableHead>
                        )
                        }
                      )}
                    </TableRow>
                  ))}
                </TableHeader>
    

                <TableBody className="">
                  {table.getRowModel().rows?.length ? (
                    table.getRowModel().rows.map((row) => (
                      <TableRow
                        key={row.id}
                        data-state={row.getIsSelected() && "selected"}
                      >
                        {row.getVisibleCells().map((cell) => {
                        const cls = cell.column.columnDef.meta?.headerAndCellStyle ?? "";
                        return(
                          <TableCell 
                            key={cell.id} 
                            className={"" + cls}
                            style={{ width: cell.column.getSize() }}
                          >
                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                          </TableCell>
                        )}
                        )}
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={columns.length} className="h-24 text-center">
                        No results.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          </div>
          </div>
    
         
    )
} 