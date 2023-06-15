"use client"

import React from "react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"

import { Playlist } from "@/types/playlist"
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

export const FormSchema = z.object({
  titre: z.string(),
  description: z.string(),
  createur: z.string(),
})

interface PlaylistForm {
  onSubmit: (data: z.infer<typeof FormSchema>) => void
  values?: Playlist
}

export default function PlaylistForm({ onSubmit, values }: PlaylistForm) {
  const router = useRouter()

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      titre: values?.titre,
      description: values?.description,
      createur: values?.createur,
    },
  })

  return (
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
  )
}
