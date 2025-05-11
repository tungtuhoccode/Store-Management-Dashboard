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
    TrendingUpIcon} from "lucide-react"
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
            "fulfillment_status": "pending"
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
        }
    ].sort( (a,b) =>  b.order_number.localeCompare(a.order_number))

const columns = [
    {
      accessorKey: "order_number", 
      header: "Order Number",
    },
    {
      accessorKey: "user_email", 
      header: "User Email",
    },
    {
      accessorKey: "item_count", 
      header: "Item Count",
    },
    {
      accessorKey: "total_amount", 
      header: "Total Amount",
      cell: (props) => (
        <div className='w-full flex justify-center'>
            ${props.getValue()}
        </div>
      )
    },
    {
      accessorKey: "create_at", 
      header: "Created At",
    },
    {
      accessorKey: "fulfillment_status", 
      header: "Order Status",
    },

]

export default function AdminOrderManagementPage () {
    const queryClient = useQueryClient();
    const [sorting, setSorting] = React.useState([])


    const table = useReactTable({
        data: data,
        columns,
        state: {
          sorting,
        },
        getCoreRowModel: getCoreRowModel(),
        onSortingChange: setSorting,
        getSortedRowModel: getSortedRowModel(),
      })

    return(
    <div className="p-2">
          {/* Table */}
          <div className="border rounded-sm">
            <div className="w-full">
              <Table className="w-full table-fixed">
                <TableHeader>
                  {table.getHeaderGroups().map((headerGroup) => (
                    <TableRow key={headerGroup.id}>
                      {headerGroup.headers.map((header) => (
                        <TableHead 
                          key={header.id} 
                          className="py-1 z-10 text-black text-sm"
                        >
                          {header.isPlaceholder
                            ? null
                            : flexRender(
                                header.column.columnDef.header,
                                header.getContext()
                              )}
                        </TableHead>
                      ))}
                    </TableRow>
                  ))}
                </TableHeader>
              </Table>
            </div>
    
            {/* Scrollable Body */}
            <div className="overflow-auto w-full max-h-[75vh]">
              <Table className="">
                <TableBody className="">
                  {table.getRowModel().rows?.length ? (
                    table.getRowModel().rows.map((row) => (
                      <TableRow
                        key={row.id}
                        data-state={row.getIsSelected() && "selected"}
                      >
                        {row.getVisibleCells().map((cell) => (
                          <TableCell 
                            key={cell.id} 
                            className=""
                            style={{ width: cell.column.getSize() }}
                          >
                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                          </TableCell>
                        ))}
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