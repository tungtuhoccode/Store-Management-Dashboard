import React, { useState, useMemo } from "react";
import axios from "../../../lib/axios.js";

import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";

import {
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  flexRender,
  getFacetedRowModel,
  getFacetedUniqueValues,
} from "@tanstack/react-table";
import { Label } from "@/components/ui/label";
import {
  Clock,
  ArrowUpDown,
  ChevronDown,
  MoreHorizontal,
  ArrowUp,
  ArrowDown,
  ListFilter,
  Funnel,
  CheckCircle2Icon,
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
  Plus,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";

import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  generateUniqueValues,
  optimizedData,
} from "@/pages/AdminPage/Utils/filterHelper";
import FilterDialog from "./components/FilterDialog.jsx";
import OrderPageHeader from "./components/OrderPageHeader";

const columns = [
  {
    accessorKey: "order_number",
    header: ({ column }) => {
      const isSorted = column.getIsSorted();

      return (
        <Button
          variant="ghost"
          onClick={column.getToggleSortingHandler()}
          className="p-0"
        >
          Order Number
          {isSorted === false && <ArrowUpDown className="text-gray-400" />}
          {isSorted === "asc" && <ArrowDown className="" />}
          {isSorted === "desc" && <ArrowUp className="" />}
        </Button>
      );
    },
    size: 120,
    cell: (props) => (
      <div className="flex items-center gap-1">
        <Hash size="12px" className="text-primary" /> {props.getValue()}
      </div>
    ),
    enableSorting: true,
    enableSortingRemoval: true,
  },
  {
    accessorKey: "user_email",
    header: "User Email",
    size: 160,
    filterFn: (row, columnId, filterValues) => {
      if (!filterValues?.length) return true;
      return filterValues.includes(row.getValue(columnId));
    },
  },
  {
    accessorKey: "item_count",
    header: "Item Count",
    size: 100,
    cell: (props) => (
      <div className="flex items-center gap-1 justify-center">
        <Package2 size="12px" className="text-primary" /> {props.getValue()}
      </div>
    ),
    meta: {
      headerAndCellStyle: "text-center",
    },
  },
  {
    accessorKey: "total_amount",
    header: "Total Amount",
    size: 130,
    cell: (props) => (
      <div className="w-full flex justify-center items-center gap-1">
        ${props.getValue()}
      </div>
    ),
    meta: {
      headerAndCellStyle: "text-center",
    },
  },
  {
    accessorKey: "create_at",
    header: ({ column }) => {
      const isSorted = column.getIsSorted();

      return (
        <Button
          variant="ghost"
          onClick={column.getToggleSortingHandler()}
          className="p-0"
        >
          Date Created
          {isSorted === false && <ArrowUpDown className="text-gray-400" />}
          {isSorted === "asc" && <ArrowDown className="" />}
          {isSorted === "desc" && <ArrowUp className="" />}
        </Button>
      );
    },
    size: 200,

    cell: (props) => (
      <div className="flex items-center gap-1">
        <CalendarDays size="16px" className="text-primary" />{" "}
        {formatDate(props.getValue())}
      </div>
    ),

    enableSorting: true,
    enableSortingRemoval: true,
  },
  {
    accessorKey: "fulfillment_status",
    header: "Order Status",
    size: 140,
    cell: ({ getValue, table, row  }) => {
      const status = getValue();
      const statusMap = {
        pending: { 
          label: "Pending", color: "bg-amber-100 text-amber-800", dot: "bg-amber-500",
          icon: <MoreHorizontal size={16}/>
        },
        "in progress": {
          label: "In Progress", color: "bg-blue-100 text-blue-800", dot: "bg-blue-500",
           icon: <Clock size={16} />
        },
        shipped: { 
          label: "Shipped", color: "bg-teal-100 text-teal-800", dot: "bg-teal-500",
          icon: <PackageCheck size={16}/>
        },

        delivered: { 
          label: "Delivered", color: "bg-green-100 text-green-800", dot: "bg-green-500",
          icon: <CheckCircle2Icon size={16}/>
        },
        cancelled: {
          label: "Cancelled", color: "bg-rose-100 text-rose-800", dot: "bg-rose-500",
          icon: <AlertCircle size={16}/>
        },
      };

      const { label, color, dot } = statusMap[status] || {
        label: status,
        color: "bg-gray-100 text-gray-700",
        dot: "bg-gray-500",
      };

  const renderAvailableStatus = () =>
    Object.entries(statusMap).map(
      ([statusKey, { label, color, dot, icon }]) => (
        <DropdownMenuItem
          key={statusKey}
          className={"cursor-pointer flex items-center gap-2 px-1 py-1 rounded-md " + "hover:" + color}
          onSelect={() => {
            table.options.meta
              .updateOrderFulfillmentStatus
              .mutate({ id: row.original.order_id, newStatus: statusKey });
          }}
        >
          <span className={`w-2 h-2 rounded-full ${dot}`} />
          {icon}
          <span className="flex-1 text-sm">{label}</span>
        </DropdownMenuItem>
      )
    );

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <div
              className={`inline-flex items-center gap-2 px-2 py-1 rounded-full text-xs font-medium ${color} cursor-pointer`}
            >
              <span className={`w-2 h-2 rounded-full ${dot}`} />
              {label}
            </div>
           </DropdownMenuTrigger>
          <DropdownMenuContent className="flex flex-col gap-1 w-30">
            <DropdownMenuLabel>Choose new status</DropdownMenuLabel>
             <DropdownMenuSeparator />
            {renderAvailableStatus()}
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
    meta: {
      headerAndCellStyle: "text-left",
    },
    filterFn: (row, columnId, filterValues) => {
      if (!filterValues?.length) return true;
      return filterValues.includes(row.getValue(columnId));
    },
  },
];

const FilterAndSearch = ({ table }) => {
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
          <FilterDialog
            column={table.getColumn("fulfillment_status")}
            title="Status"
            capitilizedLabel={true}
          />
          <FilterDialog
            column={table.getColumn("user_email")}
            title="User Email"
          />
        </div>

        <Button variant="ghost" className="h-8 px-2 lg:px-3">
          Reset
        </Button>
      </div>

      {/* Right side: view options stub */}
      <div>
        <Button variant="outline">
          <SlidersHorizontal /> <span>View</span>
        </Button>
      </div>
    </div>
  );
};

function formatDate(isoString) {
  const date = new Date(isoString);

  const day = String(date.getDate()).padStart(2, "0");
  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const month = monthNames[date.getMonth()];
  const year = date.getFullYear();

  let hours = date.getHours();
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const ampm = hours >= 12 ? "PM" : "AM";

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

const fetchOrders = async () => {
  const response = await axios.get("/order");
  return response.data;
};

const patchOrderFulfillmentStatus = async ({id, newStatus})  => {
  const response = await axios.patch(`/order/${id}/fulfillment-status`, {
    new_fulfillment_status: newStatus
  });
  return response.data;
}

export default function AdminOrderManagementPage() {
  const queryClient = useQueryClient();
  const orderQuery = useQuery({
    queryKey: ["orders"],
    queryFn: fetchOrders,
    refetchInterval: 5000,
  });

  const updateOrderFulfillmentStatus = useMutation({
    mutationFn: patchOrderFulfillmentStatus, 
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ["orders"]})
    }, 
        onError: (error) => {
        console.error('Failed to toggle fulfillment status', error)
    },
  })

  const [sorting, setSorting] = React.useState([
    { id: "create_at", desc: true }, // false = ascending
  ]);
  const [columnFilters, setColumnFilters] = React.useState([
    { id: "fulfillment_status", value: [] },
    { id: "user_email", value: [] },
  ]);

  const table = useReactTable({
    data: orderQuery.data ? orderQuery.data.data : [],
    columns,
    state: {
      sorting,
      columnFilters,
    },
    getCoreRowModel: getCoreRowModel(),
    onSortingChange: setSorting,
    getFilteredRowModel: getFilteredRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFacetedRowModel: getFacetedRowModel(), // required
    getFacetedUniqueValues: getFacetedUniqueValues(), // required
    getSortedRowModel: getSortedRowModel(),
    meta: {updateOrderFulfillmentStatus}
  });

  if (orderQuery.isLoading) return <>Loading...</>;

  return (
    <div className="pl-5 pr-5 pt-4">
      {/* Page Header */}
      <OrderPageHeader />
      <FilterAndSearch table={table} />

      {/* Table */}
      <div className="border rounded-sm">
        <div className="w-full">
          <Table className="w-full table-fixed">
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => {
                    const cls =
                      header.column.columnDef.meta?.headerAndCellStyle ?? "";
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
                    );
                  })}
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
                      const cls =
                        cell.column.columnDef.meta?.headerAndCellStyle ?? "";
                      return (
                        <TableCell
                          key={cell.id}
                          className={"" + cls}
                          style={{ width: cell.column.getSize() }}
                        >
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className="h-24 text-center"
                  >
                    No results.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}
