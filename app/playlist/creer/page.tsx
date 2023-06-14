"use client"

import React from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { ToastAction } from "@/components/ui/toast"
import { useToast } from "@/components/ui/use-toast"


import { addPlaylistData } from "./actions"


export const FormSchema = z.object({
  titre: z.string(),
  description: z.string(),
  createur: z.string(),
})

export default function AddMusic() {
  const { toast } = useToast()
  const router = useRouter()

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  })

  /**
   * Envoi des données à la base de données
   * @param data Données à envoyer
   */
  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    const response: {success: boolean | string, message: string} = await addPlaylistData(data)
    if (response.success) {
      router.push("/playlist")
      toast({
        title: "Playliste créée",
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
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full sm:w-2/3 space-y-6"
        >
          <FormField
            control={form.control}
            name="titre"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Titre</FormLabel>
                <FormControl>
                  <Input placeholder="Summer vibes ☀️" {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Ici, que des sons avec des ondes positives qui vous font sentir la chaleur du soleil sur votre peau."
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="createur"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Créateur</FormLabel>
                <FormControl>
                  <Input placeholder="John Doe" {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          <div className="flex gap-5">
            <Button type="submit">Créer la playlist</Button>
            <Button variant={"secondary"} onClick={() => router.back()}>
              Annuler
            </Button>
          </div>
        </form>
      </Form>
    </section>
  )
}
