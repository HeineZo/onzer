"use client"

import React from "react"
import { useRouter } from "next/navigation"

import { useToast } from "@/components/ui/use-toast"
import Options from "@/components/Options"
import { deletePlaylist } from "@/app/playlist/actions"

interface MusicOptionsProps {
  id: string
}

export default function PlaylistOptions({ id }: MusicOptionsProps) {
  const router = useRouter()
  const { toast } = useToast()

  const handleDelete = async () => {
    const response = await deletePlaylist(id)
    if (response.success) {
      router.push(`/playlist/`)

      toast({
        title: "Playlist supprimée",
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

  const handleEdit = () => {
    router.push(`/playlist/${id}/modifier`)
  }
  return <Options handleDelete={handleDelete} handleEdit={handleEdit} />
}
