"use client"

import React from "react"
import { MoreHorizontal } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"


interface OptionsProps {
  handleDelete: () => Promise<void>
  handleEdit: () => void
}

export default function Options({
  handleDelete,
  handleEdit,
}: OptionsProps) {

  const editMethod = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.stopPropagation()
    handleEdit()
  }

  const deleteMethod = async (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    e.stopPropagation()
    handleDelete()
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <span className="sr-only">Plus d'actions</span>
          <MoreHorizontal className="h-4 w-4 rotate-90" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem className="cursor-pointer" onClick={editMethod}>
          Modifier
        </DropdownMenuItem>
        <DropdownMenuItem className="cursor-pointer" onClick={deleteMethod}>
          Supprimer
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
