"use client"

import React from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { format } from "date-fns"
import { fr } from "date-fns/locale"
import { Calendar as CalendarIcon } from "lucide-react"
import { useForm } from "react-hook-form"
import * as z from "zod"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { useToast } from "@/components/ui/use-toast"

export const FormSchema = z.object({
  titre: z
    .string()
    .min(3, {
      message: "Le titre doit faire au moins 3 caractères",
    }),
  artistes: z.string(),
  duree: z.string(),
  genres: z.string(),
  pays: z.string(),
  dateSortie: z.date(),
  pochetteAlbum: z.string().url({
    message: "L'URL de la pochette de l'album doit être une URL valide",
  }).optional(),
})

export default function AddMusic() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  })

  const { toast } = useToast()

  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    const response = await fetch("/api/music/ajouter", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(data),
    })
    // toast({
    //   title: "You submitted the following values:",
    //   description: (
    //     <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
    //       <code className="text-white">{JSON.stringify(data, null, 2)}</code>
    //     </pre>
    //   ),
    // })
    toast({
      title: "Scheduled: Catch up ",
      description: "Friday, February 10, 2023 at 5:57 PM",
      // action: <ToastAction altText="Goto schedule to undo">Undo</ToastAction>,
    })
  }

  return (
    <section>
      <div className="flex flex-col gap-5">
        <h1>Ajouter une musique</h1>
        <h2 className="text-muted-foreground">
          Tous les champs sont obligatoires
        </h2>
      </div>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-2/3 space-y-6"
        >
          <FormField
            control={form.control}
            name="titre"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Titre</FormLabel>
                <FormControl>
                  <Input placeholder="Allumez la flamme" {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="artistes"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Artistes</FormLabel>
                <FormControl>
                  <Input placeholder="Johnny Halliday, DJ Khaled" {...field} />
                </FormControl>
                <FormDescription>
                  Les artistes de la musique séparés par une virgule
                </FormDescription>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="duree"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Durée de la musique</FormLabel>
                <FormControl>
                  <Input placeholder="120" {...field} type="number" min="0" />
                </FormControl>
                <FormDescription>En secondes</FormDescription>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="genres"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Genres</FormLabel>
                <FormControl>
                  <Input placeholder="rock" {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="pays"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Pays</FormLabel>
                <FormControl>
                  <Input placeholder="France" {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="dateSortie"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Date de sortie</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={cn(!field.value && "text-muted-foreground")}
                      >
                        {field.value ? (
                          format(field.value, "PPP", { locale: fr })
                        ) : (
                          <span>Choisissez une date</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      disabled={(date) =>
                        date > new Date() || date < new Date("1900-01-01")
                      }
                      locale={fr}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="pochetteAlbum"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Pochette d'album (optionnel)</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormDescription>
                  Lien vers la pochette d'album, doit être une URL valide
                </FormDescription>
              </FormItem>
            )}
          />
          <Button type="submit">Ajouter</Button>
        </form>
      </Form>
    </section>
  )
}
