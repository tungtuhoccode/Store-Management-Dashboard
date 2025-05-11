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

export default function AdminOrderManagementPage () {
    return <>
        Hello world
    </>
} 