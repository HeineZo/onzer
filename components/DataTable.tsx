"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table"

import { Musique } from "@/types/music"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { removeMusic } from "@/app/playlist/[id]/actions"

import { Button } from "./ui/button"
import { useToast } from "./ui/use-toast"

// import { removeMusic } from "@/app/playlist/[id]/actions"

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
  playlistId: string
}

export function DataTable<TData, TValue>({
  columns,
  data,
  playlistId,
}: DataTableProps<TData, TValue>) {
  const { toast } = useToast()
  const router = useRouter()
  const [rowSelection, setRowSelection] = useState({})
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    onRowSelectionChange: setRowSelection,
    state: {
      rowSelection,
    },
  })

  /**
   * Supprimer la musique de la playlist
   */
  const handleDelete = async () => {
    const { flatRows } = table.getSelectedRowModel()
    const selectedData = flatRows.map((row: any) => row.original._id)
    const response = await removeMusic(playlistId, selectedData)
    if (response) {
      toast({
        title: "Musique retirée",
        description: response.message,
      })
      router.push(`/playlist/${playlistId}`, {
        caches: "no-store",
      })
    } else {
      toast({
        title: "Erreur",
        description:
          "Une erreur est survenue lors de la suppression de la musique",
        variant: "destructive",
      })
    }
  }

  return (
    <>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  Aucun résultat
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex justify-end">
        <Button
          disabled={table.getFilteredSelectedRowModel().rows.length <= 0}
          onClick={handleDelete}
        >
          Retirer de la playlist
        </Button>
      </div>
    </>
  )
}
