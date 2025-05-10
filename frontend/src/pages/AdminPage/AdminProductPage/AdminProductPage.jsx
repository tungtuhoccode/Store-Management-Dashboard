import React, { useState } from 'react'
import axios from "../../../lib/axios.js"

import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import { ErrorAlert } from './TableComponents/error-alert.jsx'
import {
    useReactTable,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    flexRender,
  } from "@tanstack/react-table"
  import { Label } from "@/components/ui/label"
  import { ArrowUpDown, ChevronDown, MoreHorizontal, ArrowUp, ArrowDown, ListFilter, Funnel,  CheckCircle2Icon,
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
import { generateUniqueValues } from '@/pages/Utils/filterHelper'
  

// Custom Component
import CategoryHeaderWithFilter from "./TableComponents/TableHeaderWithMutiSelectFilter"

const data = [
        {
            "id": "c57c288c-a26d-452e-9945-a5c44ca6dc6b",
            "name": "Nike Air Max Hoodie",
            "price": "75.00",
            "image": "https://cloutcloset.com/cdn/shop/files/A2CFCF1B-60DB-4020-9F3B-EAD78A074EDC.jpg?v=1722376618&width=1946",
            "stock_quantity": 40,
            "categories": "Hoodies",
            "slide_display": true,
            "displayed_product": true
        },
        {
            "id": "e83527f3-1484-40a7-87b0-5c029961d10c",
            "name": "Slip-On Sandals",
            "price": "29.99",
            "image": "https://res.cloudinary.com/dc3gnvd4e/image/upload/v1746528085/productsImage/ruppr6rspjpcpm0grgtd.jpg",
            "stock_quantity": 28,
            "categories": "Footwear",
            "slide_display": false,
            "displayed_product": true
        },
        {
            "id": "2f468b27-1f3c-4da8-b03d-08e8f8940ba7",
            "name": "Running Shoes",
            "price": "99.99",
            "image": "https://res.cloudinary.com/dc3gnvd4e/image/upload/v1746527352/productsImage/mvdosooxw5achdbdrjpn.jpg",
            "stock_quantity": 10,
            "categories": "Footwear",
            "slide_display": false,
            "displayed_product": true
        },
        {
            "id": "2e1301b0-c708-4941-8131-d54ad2671ddf",
            "name": "Classic Pullover Hoodie",
            "price": "49.99",
            "image": "https://res.cloudinary.com/dc3gnvd4e/image/upload/v1745954204/productsImage/k9zxl0bbrnculplqpuv6.jpg",
            "stock_quantity": 10,
            "categories": "Hoodies",
            "slide_display": false,
            "displayed_product": true
        },
        {
            "id": "5e2df221-28e0-465b-88a8-acfbf124c5ce",
            "name": "Classic Grey Hoodie",
            "price": "49.99",
            "image": "https://res.cloudinary.com/dc3gnvd4e/image/upload/v1746522832/productsImage/ax8pvur6s0begnnqmxv6.jpg",
            "stock_quantity": 25,
            "categories": "Hoodies",
            "slide_display": false,
            "displayed_product": true
        },
        {
            "id": "8f49e60d-188a-4da1-ab88-82f1bae8d1f5",
            "name": "Sporty Sneakers",
            "price": "89.99",
            "image": "https://res.cloudinary.com/dc3gnvd4e/image/upload/v1746523004/productsImage/ba40gxmaollcfotukcwm.jpg",
            "stock_quantity": 15,
            "categories": "Footwear",
            "slide_display": false,
            "displayed_product": true
        },
        {
            "id": "8829a91a-f0a2-44d9-8895-9fc3e675a7b7",
            "name": "Classic Baseball Cap",
            "price": "15.99",
            "image": "https://res.cloudinary.com/dc3gnvd4e/image/upload/v1746523416/productsImage/k0uw43kajnxgvnogcqg1.jpg",
            "stock_quantity": 40,
            "categories": "Hats",
            "slide_display": false,
            "displayed_product": true
        },
        {
            "id": "8669ac91-cd1a-434a-9ef4-ac157d34fd89",
            "name": "Leather Belt",
            "price": "29.99",
            "image": "https://res.cloudinary.com/dc3gnvd4e/image/upload/v1746523593/productsImage/xso51nbhswqikomuacph.jpg",
            "stock_quantity": 20,
            "categories": "Accessories",
            "slide_display": false,
            "displayed_product": true
        },
        {
            "id": "be2ef4a5-7f5e-44cc-88b3-8c05fb2e0bf8",
            "name": "Casual Cotton T-Shirt",
            "price": "19.99",
            "image": "https://res.cloudinary.com/dc3gnvd4e/image/upload/v1742937029/productsImage/ypxkklsjaqimkl32h4cy.jpg",
            "stock_quantity": 120,
            "categories": "T-Shirts",
            "slide_display": true,
            "displayed_product": true
        },
        {
            "id": "d8c4426c-4892-4871-ab59-ca63ab2a081d",
            "name": "Slim Fit Jeans",
            "price": "49.99",
            "image": "https://res.cloudinary.com/dc3gnvd4e/image/upload/v1744667269/productsImage/awfm7ixltanxatiyr4gg.jpg",
            "stock_quantity": 35,
            "categories": "Pants",
            "slide_display": true,
            "displayed_product": true
        },
        {
            "id": "6468bdf1-0f2b-47e9-b5c9-94b7d746aa1a",
            "name": "Essential Crew Socks (3-Pack)",
            "price": "14.99",
            "image": "https://res.cloudinary.com/dc3gnvd4e/image/upload/v1744667501/productsImage/qigy0cczsfwrdmgxkpiw.jpg",
            "stock_quantity": 100,
            "categories": "Socks",
            "slide_display": true,
            "displayed_product": true
        },
        {
            "id": "24477332-05ff-4fac-a65a-e092f3219640",
            "name": "Wool Beanie",
            "price": "18.99",
            "image": "https://res.cloudinary.com/dc3gnvd4e/image/upload/v1746527572/productsImage/vmdn6rgutyymwrozlzs3.jpg",
            "stock_quantity": 55,
            "categories": "Hats",
            "slide_display": false,
            "displayed_product": true
        },
        {
            "id": "8dc660bf-f44c-47d8-9613-efe4a1c809f5",
            "name": "Zip-Up Hoodie",
            "price": "54.99",
            "image": "https://res.cloudinary.com/dc3gnvd4e/image/upload/v1746526045/productsImage/ijzguod5dyb0psacsnmj.jpg",
            "stock_quantity": 22,
            "categories": "Hoodies",
            "slide_display": false,
            "displayed_product": true
        },
        {
            "id": "870180e9-4483-4b08-92db-1e284e035297",
            "name": "Thermal Crew Socks",
            "price": "12.99",
            "image": "https://res.cloudinary.com/dc3gnvd4e/image/upload/v1746526181/productsImage/x9ipf1e7qacu6ppocyve.jpg",
            "stock_quantity": 60,
            "categories": "Socks",
            "slide_display": true,
            "displayed_product": true
        },
        {
            "id": "7e5c8861-bc4e-4561-a1ab-8f40c8fe312f",
            "name": "Canvas Backpack",
            "price": "49.99",
            "image": "https://res.cloudinary.com/dc3gnvd4e/image/upload/v1746527675/productsImage/al85gh8okb3mqthl4est.jpg",
            "stock_quantity": 12,
            "categories": "Accessories",
            "slide_display": false,
            "displayed_product": true
        },
        {
            "id": "d846462b-8fb6-4821-8f42-d1326e559f41",
            "name": "Fleece Hoodie",
            "price": "59.99",
            "image": "https://res.cloudinary.com/dc3gnvd4e/image/upload/v1746527940/productsImage/on60xuwop7zjpr2rkhp0.jpg",
            "stock_quantity": 17,
            "categories": "Hoodies",
            "slide_display": false,
            "displayed_product": true
        },
        {
            "id": "a99671d2-6929-4d07-a11a-59d7c374f8a7",
            "name": "Cargo Pants",
            "price": "65.00",
            "image": "https://res.cloudinary.com/dc3gnvd4e/image/upload/v1746527485/productsImage/tglnvhtk9573stxrje7u.jpg",
            "stock_quantity": 18,
            "categories": "Pants",
            "slide_display": false,
            "displayed_product": true
        },
        {
            "id": "74006015-7af1-4dff-b333-4993c28449db",
            "name": "Cozy Winter Socks",
            "price": "9.99",
            "image": "https://res.cloudinary.com/dc3gnvd4e/image/upload/v1746522916/productsImage/gwrojxw7gqalpjeqmtv0.jpg",
            "stock_quantity": 100,
            "categories": "Socks",
            "slide_display": false,
            "displayed_product": true
        },
        {
            "id": "e07f32ad-cd3a-42d4-ab78-8e2a50db50b9",
            "name": "Ankle Socks 5-Pack",
            "price": "14.99",
            "image": "https://res.cloudinary.com/dc3gnvd4e/image/upload/v1746528008/productsImage/qrmguxgefe9feymddbbu.jpg",
            "stock_quantity": 70,
            "categories": "Socks",
            "slide_display": false,
            "displayed_product": true
        },
        {
            "id": "a5c37f02-ea0e-45bb-a4da-31a15a272d91",
            "name": "V-Neck Tee",
            "price": "22.99",
            "image": "https://res.cloudinary.com/dc3gnvd4e/image/upload/v1746528132/productsImage/wwxof75z690nt3pvnt3v.jpg",
            "stock_quantity": 38,
            "categories": "T-Shirts",
            "slide_display": false,
            "displayed_product": true
        },
        {
            "id": "d9bcbe1c-7907-4f1f-82dd-b4a1c5e438dd",
            "name": "Basic White Tee",
            "price": "19.99",
            "image": "https://res.cloudinary.com/dc3gnvd4e/image/upload/v1746523277/productsImage/eg46250ajziartkvwdr2.jpg",
            "stock_quantity": 50,
            "categories": "T-Shirts",
            "slide_display": false,
            "displayed_product": true
        },
        {
            "id": "9e6999f2-5448-42f1-a534-291cf2be890f",
            "name": "Graphic Print Tee",
            "price": "25.99",
            "image": "https://res.cloudinary.com/dc3gnvd4e/image/upload/v1746527428/productsImage/srfdjypwpvq4gi9ypnct.jpg",
            "stock_quantity": 45,
            "categories": "T-Shirts",
            "slide_display": false,
            "displayed_product": true
        },
        {
            "id": "9b13ad5b-97a4-496f-a0d6-40e62beca3c3",
            "name": "Running Sneakers Pro",
            "price": "89.99",
            "image": "https://res.cloudinary.com/dc3gnvd4e/image/upload/v1744667409/productsImage/aqtfolihmflbadiu4i8m.jpg",
            "stock_quantity": 20,
            "categories": "Footwear",
            "slide_display": true,
            "displayed_product": true
        },
        {
            "id": "0ab98b9b-8625-4326-ab61-6c4f85e6be8e",
            "name": "Thermal Underwear Set",
            "price": "34.99",
            "image": "https://res.cloudinary.com/dc3gnvd4e/image/upload/v1746527842/productsImage/dlww3joz8ixb1sun1qmy.jpg",
            "stock_quantity": 25,
            "categories": "Underwear",
            "slide_display": false,
            "displayed_product": false
        },
        {
            "id": "b41c218b-e21d-4337-881c-c10ded9dacb9",
            "name": "Boxer Briefs 3-Pack",
            "price": "24.99",
            "image": "https://res.cloudinary.com/dc3gnvd4e/image/upload/v1746525811/productsImage/mgyxyxwxvswfy0qc6bns.jpg",
            "stock_quantity": 35,
            "categories": "Underwear",
            "slide_display": false,
            "displayed_product": false
        }
]

const columns = [

  {
    accessorKey: "name", 
    header: "Product Name",
  },
  {
    accessorKey: "price",
    header: ({ column }) => {
      const isSorted = column.getIsSorted(); // 'asc' | 'desc' | false
  
      return (
        <Button
          variant="ghost"
          onClick={column.getToggleSortingHandler()}
        >
          Price

          {isSorted === false && <ArrowUpDown className="text-gray-400"/>}
          {isSorted === 'asc' && <ArrowDown className=""/>}
          {isSorted === 'desc' && <ArrowUp className=""/>}
        </Button>
      );
    },
    enableSorting: true,
    enableSortingRemoval: true,
  },

  {
    accessorKey: "image",
    header: "Image", 
    cell: (props) => (
      <div className='w-full flex justify-center'>
        <img width={48} height={48} src={props.getValue()}/> 
      </div>
  ) //props.getValue() to get value, wrapped in <p> tag for the style
  },
  {
    accessorKey: "stock_quantity",
    header: ({column}) => {
      const isSorted = column.getIsSorted();
      return (
        <Button variant="ghost" onClick={column.getToggleSortingHandler()}>
          Quantity
          {isSorted === false && <ArrowUpDown className="text-gray-400"/>}
          {isSorted === 'asc' && <ArrowDown className=""/>}
          {isSorted === 'desc' && <ArrowUp className=""/>}
        </Button>
      )

    }, 
    enableSorting: true, 
    enableSortingRemoval: true
  },
  {
    accessorKey: "categories",
    //TODO: Implement useMemo and allow selecting mutiple categories before apply filters
    header: ({column}) => <CategoryHeaderWithFilter column={column} availableFilterValues={generateUniqueValues(data, "categories")}/>, 
    filterFn: (row, columnId, filterValues) => {
      if (!filterValues?.length) return true;
      return filterValues.includes(row.getValue(columnId));
    }
  },
  {
    accessorKey: "displayed_product",
    header: ({ column }) => {
      const filterValues = column.getFilterValue() ?? []
      // grab the single boolean, if any
      const current = filterValues[0]
  
      return (
        <div className="flex justify-center items-center">
          <span className="mr-2">Display Status</span>
          <DropdownMenu>
            <DropdownMenuTrigger>
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
              <DropdownMenuSeparator />
  
              <DropdownMenuCheckboxItem
                checked={current === true}
                onCheckedChange={(checked) =>
                  column.setFilterValue(checked ? [true] : [])
                }
              >
                Display
              </DropdownMenuCheckboxItem>
  
              <DropdownMenuCheckboxItem
                checked={current === false}
                onCheckedChange={(checked) =>
                  column.setFilterValue(checked ? [false] : [])
                }
              >
                Not Display
              </DropdownMenuCheckboxItem>
  
              <DropdownMenuSeparator />
              <DropdownMenuItem
                className="flex justify-center font-bold"
                onSelect={() => column.setFilterValue([])}
              >
                Clear All
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      )
    },
    cell: ({ getValue, row, table, column }) => (
      <Checkbox
        checked={getValue()}
        onCheckedChange={(val) =>
          table.options.meta.updateData(row.original.id, column.id, val)
        }
      />
    ),
    filterFn: (row, columnId, filterValues) => {
      if (!filterValues.length) return true
      return filterValues[0] === row.getValue(columnId)
    },
  }
]


function TableLoadingSkeleton({ columns, rows = 5 }) {
  return (
    <div>
      {/* Table Header + Body */}
      <div className="overflow-auto">
        <Table className="table-fixed w-full">
          <TableHeader>
            <TableRow>
              {columns.map((col) => (
                <TableHead
                  key={col.accessorKey}
                  className="px-4 py-2 bg-gray-200 animate-pulse"
                />
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {Array.from({ length: rows }).map((_, rowIdx) => (
              <TableRow key={rowIdx} className="animate-pulse">
                {columns.map((col) => (
                  <TableCell key={col.accessorKey} className="p-2">
                    {col.accessorKey === "image" ? (
                      <div className="w-12 h-12 bg-gray-200 justify-center" />
                    ) : (
                      <div className="h-4 bg-gray-200 rounded w-3/4" />
                    )}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Footer / Pagination Skeleton */}
      <div className="flex items-center justify-between px-4 py-2 mt-2 animate-pulse">
        {/* Left: “0 of XX row(s) selected” */}
        <div className="hidden lg:flex">
          <div className="h-4 bg-gray-200 rounded w-32" />
        </div>

        {/* Right: rows-per-page + page info + buttons */}
        <div className="flex items-center gap-4">
          {/* Rows per page label */}
          <div className="hidden lg:block">
            <div className="h-4 bg-gray-200 rounded w-24" />
          </div>

          {/* Select dropdown placeholder */}
          <div className="h-8 w-16 bg-gray-200 rounded" />

          {/* Page info placeholder */}
          <div className="h-4 bg-gray-200 rounded w-20" />

          {/* Nav buttons placeholders */}
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 bg-gray-200 rounded" />
            <div className="h-8 w-8 bg-gray-200 rounded" />
            <div className="h-8 w-8 bg-gray-200 rounded" />
            <div className="h-8 w-8 bg-gray-200 rounded" />
          </div>
        </div>
      </div>
    </div>
  );
}

// Helper function to optimize any image URL to width=150px
function optimizeImageUrl(url) {
  // Cloudinary URLs: insert c_scale,w_150 after /upload/
  if (url.includes("res.cloudinary.com")) {
    return url.replace(/\/upload\//, "/upload/c_scale,w_150/");
  }
  // CloutCloset URLs: replace width=<digits> query param with width=150
  if (url.includes("cloutcloset.com")) {
    return url.replace(/width=\d+/, "width=100");
  }
  // Otherwise return the original URL
  return url;
}

// Given your existing `data` array, produce a new array with optimized image URLs:
const optimizedData = data.map(item => ({
  ...item,
  image: optimizeImageUrl(item.image),
}));

const fetchProductsData = async () => {
  const response = await axios.get("/product")
  return response.data
}

export default function DataTableDemo() {
  const queryClient = useQueryClient();

  const { isPending, isError, data, error } = useQuery({ queryKey: ['products'], queryFn: fetchProductsData })

  const [sorting, setSorting] = React.useState([])
  const [tableData, setTableData] = React.useState(optimizedData)
  const [columnFilters, setColumnFilters] = useState([
    {id:"categories", value:[]}, 
    {id:"displayed_product", value: []}
  ])
  
  const updateData = (rowIndex, columnIndex, value) => {
    setTableData(tableData.map(row => {
      return (row.id == rowIndex) ? {...row, [columnIndex]:value} : row 
    }))
  }
  

  const table = useReactTable({
    data: tableData,
    columns,
    state: {
      sorting,
      columnFilters
    },
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    meta: {updateData}
  })

  //Loading
  if (isPending) {
    return (
      <div className="p-2">
        <div className="border rounded-sm">
          <TableLoadingSkeleton columns={columns} rows={9} />
        </div>
      </div>
    );
  }

  //Error
  if (isError) {
    return (
      <div className="flex h-[75vh] items-center justify-center p-4">
        <ErrorAlert
          title="Failed to load products"
          message={
            error?.message ||
            "We couldn't retrieve the product data. Please try again or contact support if the problem persists."
          }
          onRetry={() => {queryClient.invalidateQueries({ queryKey: ["products"] })}
          }
        />
      </div>
    )
  }


  return (
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
                      className="py-1 z-10 text-center text-black text-sm"
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
        <div className="overflow-auto max-h-[75vh]">
          <Table className="w-full table-fixed">
            <TableBody>
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && "selected"}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell 
                        key={cell.id} 
                        className="text-center"
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

      {/* Table Pagination Buttons */}
      <div className="flex items-center justify-between px-4 mt-2">
          <div className="hidden flex-1 text-sm text-muted-foreground lg:flex">
            {table.getFilteredSelectedRowModel().rows.length} of{" "}
            {table.getFilteredRowModel().rows.length} row(s) selected.
          </div>
          <div className="flex w-full items-center gap-8 lg:w-fit">
            <div className="hidden items-center gap-2 lg:flex">
              <Label htmlFor="rows-per-page" className="text-sm font-medium">
                Rows per page
              </Label>
              <Select
                value={`${table.getState().pagination.pageSize}`}
                onValueChange={(value) => {
                  table.setPageSize(Number(value))
                }}
              >
                <SelectTrigger className="w-20" id="rows-per-page">
                  <SelectValue
                    placeholder={table.getState().pagination.pageSize}
                  />
                </SelectTrigger>
                <SelectContent side="top">
                  {[10, 20, 30, 40, 50].map((pageSize) => (
                    <SelectItem key={pageSize} value={`${pageSize}`}>
                      {pageSize}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex w-fit items-center justify-center text-sm font-medium">
              Page {table.getState().pagination.pageIndex + 1} of{" "}
              {table.getPageCount()}
            </div>
            <div className="ml-auto flex items-center gap-2 lg:ml-0">
              <Button
                variant="outline"
                className="hidden h-8 w-8 p-0 lg:flex"
                onClick={() => table.setPageIndex(0)}
                disabled={!table.getCanPreviousPage()}
              >
                <span className="sr-only">Go to first page</span>
                <ChevronsLeftIcon />
              </Button>
              <Button
                variant="outline"
                className="size-8"
                size="icon"
                onClick={() => table.previousPage()}
                disabled={!table.getCanPreviousPage()}
              >
                <span className="sr-only">Go to previous page</span>
                <ChevronLeftIcon />
              </Button>
              <Button
                variant="outline"
                className="size-8"
                size="icon"
                onClick={() => table.nextPage()}
                disabled={!table.getCanNextPage()}
              >
                <span className="sr-only">Go to next page</span>
                <ChevronRightIcon />
              </Button>
              <Button
                variant="outline"
                className="hidden size-8 lg:flex"
                size="icon"
                onClick={() => table.setPageIndex(table.getPageCount() - 1)}
                disabled={!table.getCanNextPage()}
              >
                <span className="sr-only">Go to last page</span>
                <ChevronsRightIcon />
              </Button>
            </div>
          </div>
        </div>
    </div>
  )
}