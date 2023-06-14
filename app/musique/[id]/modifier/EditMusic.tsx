"use client"

import React, { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import * as z from "zod"

import { Musique } from "@/types/music"
import { ToastAction } from "@/components/ui/toast"
import { useToast } from "@/components/ui/use-toast"
import MusicForm, { FormSchema } from "@/components/MusicForm"

const editMethod = async (data: Musique) => {
  const response = await fetch(`/api/musique/${data._id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })

  return response.json()
}

interface EditMusicProps {
  values: Musique
}

export default function EditMusic({ values }: EditMusicProps) {
  const { toast } = useToast()
  const router = useRouter()

  const [selectedValues, setSelectedValues] = useState<string[]>(values.genres)

  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    let newData: Musique = {
      ...data,
      _id: values._id,
      duree: Number(data.duree),
      artistes: data.artistes.trim().split(","),
      genres: selectedValues.map((value) => value.toLowerCase()),
    }

    const response = await editMethod(newData)

    if (response.success) {
      router.push("/musique")
      toast({
        title: "Musique modifiée",
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
        title: "Erreur lors de la modification",
        description: response.message,
      })
    }
  }

  return (
    <section>
      <div className="flex flex-col gap-5">
        <h1>Modifier une musique</h1>
        <h2 className="text-muted-foreground">
          Tous les champs sont obligatoires
        </h2>
      </div>
      <MusicForm
        onSubmit={(data: z.infer<typeof FormSchema>) => onSubmit(data)}
        selectedValues={selectedValues}
        setSelectedValues={setSelectedValues}
        values={values}
      />
    </section>
  )
}
