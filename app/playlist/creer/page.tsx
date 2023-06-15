"use client"

import React from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import * as z from "zod"
import { ToastAction } from "@/components/ui/toast"
import { useToast } from "@/components/ui/use-toast"
import { addPlaylistData } from "@/app/playlist/actions"
import PlaylistForm, { FormSchema } from "@/components/PlaylistForm"



export default function AddMusic() {
  const { toast } = useToast()
  const router = useRouter()

  /**
   * Envoi des données à la base de données
   * @param data Données à envoyer
   */
  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    const response: {success: boolean | string, message: string} = await addPlaylistData(data)
    if (response.success) {
      router.push("/playlist")
      toast({
        title: "Playlist créée",
        description: response.message,
        action: (
          <ToastAction altText="Ajouter des musiques">
            <Link href={`/musique`}>Ajouter des musiques</Link>
          </ToastAction>
        ),
      })
    } else {
      toast({
        variant: "destructive",
        title: "Erreur lors de l'ajout",
        description: response.message,
      })
    }
  }

  return (
    <section>
      <div className="flex flex-col gap-5">
        <h1>Nouvelle playlist</h1>
        <h2 className="text-muted-foreground">
          Tous les champs sont obligatoires
        </h2>
      </div>
      <PlaylistForm onSubmit={(data: z.infer<typeof FormSchema>) => onSubmit(data)} />
    </section>
  )
}
