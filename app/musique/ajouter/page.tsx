"use client"

import React, { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import * as z from "zod"

import { Musique } from "@/types/music"
import { ToastAction } from "@/components/ui/toast"
import { useToast } from "@/components/ui/use-toast"
import MusicForm, { FormSchema } from "@/components/MusicForm"

import { addMusicData } from "@/app/musique/actions"

export default function AddMusic() {
  const { toast } = useToast()
  const router = useRouter()

  const [selectedValues, setSelectedValues] = useState<string[]>([])

  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    let newData: Musique = {
      ...data,
      duree: Number(data.duree),
      artistes: data.artistes.trim().split(","),
      genres: selectedValues.map((value) => value.toLowerCase()),
    }
    const response = await addMusicData(newData)

    if (response.success) {
      router.push("/musique")
      toast({
        title: "Musique ajoutée",
        description: response.message,
        action: (
          <ToastAction altText="Voir la musique">
            <Link href={`/musique?id=${response.success}`}>Voir</Link>
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
        <h1>Ajouter une musique</h1>
        <h2 className="text-muted-foreground">
          Tous les champs sont obligatoires
        </h2>
      </div>
      <MusicForm
        onSubmit={(data: z.infer<typeof FormSchema>) => onSubmit(data)}
        selectedValues={selectedValues}
        setSelectedValues={setSelectedValues}
      />
    </section>
  )
}
