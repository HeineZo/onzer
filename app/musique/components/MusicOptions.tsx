"use client"

import React from "react"
import { useRouter } from "next/navigation"

import { useToast } from "@/components/ui/use-toast"
import Options from "@/components/Options"
import { deleteMusic } from "@/app/musique/actions"

interface MusicOptionsProps {
  id: string
}

export default function MusicOptions({ id }: MusicOptionsProps) {
  const router = useRouter()
  const { toast } = useToast()

  const handleDelete = async () => {
    const response = await deleteMusic(id)
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

  const handleEdit = () => {
    router.push(`/musique/${id}/modifier`)
  }
  return <Options handleDelete={handleDelete} handleEdit={handleEdit} />
}
