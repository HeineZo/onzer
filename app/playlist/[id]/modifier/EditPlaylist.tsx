"use client"

import React from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import * as z from "zod"

import { Playlist } from "@/types/playlist"
import { ToastAction } from "@/components/ui/toast"
import { useToast } from "@/components/ui/use-toast"
import PlaylistForm, { FormSchema } from "@/components/PlaylistForm"
import { editMethod } from "@/app/playlist/actions"

interface EditPlaylistProps {
  values: Playlist
}

export default function EditPlaylist({ values }: EditPlaylistProps) {
  const { toast } = useToast()
  const router = useRouter()

  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    let newData: Playlist = {
      ...data,
      _id: values._id,
    }

    const response = await editMethod(newData)
    if (response.success) {
      router.push("/playlist")
      toast({
        title: "Playlist modifiée",
        description: response.message,
        action: (
          <ToastAction altText="Voir la playlist">
            <Link href={`/playlist/${values._id}`}>Voir</Link>
          </ToastAction>
        ),
      })
    } else {
      toast({
        variant: "destructive",
        title: "Erreur lors de la modification",
        description: response.message,
      })
    }
  }

  return (
    <section>
      <div className="flex flex-col gap-5">
        <h1>Modifier une playlist</h1>
        <h2 className="text-muted-foreground">
          Tous les champs sont obligatoires
        </h2>
      </div>
      <PlaylistForm
        onSubmit={(data: z.infer<typeof FormSchema>) => onSubmit(data)}
        values={values}
      />
    </section>
  )
}
