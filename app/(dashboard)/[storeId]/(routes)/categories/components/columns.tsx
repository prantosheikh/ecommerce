"use client";

import { ColumnDef } from "@tanstack/react-table";
import { CellAction } from "./cell-action";

export type CategoriesColumn = {
   id: string;
   name: string;
   billboradLabel: string,
   createdAt: string;
};

export const columns: ColumnDef<CategoriesColumn>[] = [
   {
      accessorKey: "name",
      header: "Name",
   },
   {
      accessorKey: "billboard",
      header: "Billboard",
      cell: ({ row }) => row.original.billboradLabel
   },
   {
      accessorKey: "createdAt",
      header: "Date",
   },
   {
      id: "action",
      cell: ({ row }) => <CellAction data={row.original} />,
   },
];
