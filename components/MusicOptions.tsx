"use client"

import React from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { MoreHorizontal } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import { useToast } from "./ui/use-toast"

interface MusicOptionsProps {
  id: string
}

const deleteMethod = async (id: string) => {
  const response = await fetch(`/api/musique/${id}`, {
    method: "DELETE",
  })

  return response.json()
}

export default function MusicOptions({ id }: MusicOptionsProps) {
  const router = useRouter()
  const { toast } = useToast()

  const handleEdit = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.stopPropagation()
    router.push(`/musique/${id}/modifier`)
  }

  const handleDelete = async (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    e.stopPropagation()
    const response = await deleteMethod(id)
    if (response.success) {
      router.push(`/musique/`)

      toast({
        title: "Musique supprimée",
        description: response.message,
      })
    } else {
      toast({
        variant: "destructive",
        title: "Erreur lors de la suppression",
        description: response.message,
      })
    }
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
        <DropdownMenuItem className="cursor-pointer" onClick={handleEdit}>
          Modifier
        </DropdownMenuItem>
        <DropdownMenuItem className="cursor-pointer" onClick={handleDelete}>
          Supprimer
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
