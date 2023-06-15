"use client"

import React from "react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { format } from "date-fns"
import { fr } from "date-fns/locale"
import { Calendar as CalendarIcon, X } from "lucide-react"
import { useForm } from "react-hook-form"
import * as z from "zod"

import { Genre, Musique } from "@/types/music"
import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import MultiSelect from "@/components/MultiSelect"
import MusicCard from "@/app/musique/components/MusicCard"

export const FormSchema = z.object({
  titre: z.string(),
  artistes: z.string(),
  duree: z.string(),
  pays: z.string(),
  dateSortie: z.date(),
  pochetteAlbum: z
    .string()
    .url({
      message: "L'URL de la pochette de l'album doit être une URL valide",
    })
    .optional(),
})

interface MusicFormProps {
    onSubmit: (data: z.infer<typeof FormSchema>) => void
    selectedValues: string[]
    setSelectedValues: React.Dispatch<React.SetStateAction<string[]>>
    values?: Musique
}

export default function MusicForm({onSubmit, selectedValues, setSelectedValues, values}: MusicFormProps) {
  const router = useRouter()

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
        titre: values?.titre,
        artistes: values?.artistes.toString(),
        duree: values?.duree.toString(),
        pays: values?.pays,
        dateSortie: values?.dateSortie && new Date(values?.dateSortie),
        pochetteAlbum: values?.pochetteAlbum,
    },
  })

  return (
    <div className="relative flex justify-between">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full space-y-6 sm:w-2/3"
        >
          <FormField
            control={form.control}
            name="titre"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Titre</FormLabel>
                <FormControl>
                  <Input placeholder="Allumer le feu" {...field} />
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
                  <Input
                    placeholder="120"
                    {...field}
                    type="number"
                    min="0"
                    step={1}
                  />
                </FormControl>
                <FormDescription>En secondes</FormDescription>
              </FormItem>
            )}
          />
          <FormField
            name="genres"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <MultiSelect
                    title="Genres"
                    values={Object.keys(Genre).filter((number) =>
                      isNaN(Number(number))
                    )}
                    selectedValues={selectedValues}
                    setSelectedValues={setSelectedValues}
                  />
                </FormControl>
                {selectedValues.map((selected) => (
                  <Badge
                    variant="secondary"
                    className="ml-1 cursor-pointer gap-2 px-5 py-2"
                    onClick={() =>
                      setSelectedValues((prev) =>
                        prev.filter((v) => v !== selected)
                      )
                    }
                  >
                    {selected}
                    <X size="16" />
                  </Badge>
                ))}
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
          <div className="flex gap-5">
            <Button type="submit">{values ? 'Modifier' : 'Ajouter'}</Button>
            <Button variant={"secondary"} onClick={() => router.back()}>
              Annuler
            </Button>
          </div>
        </form>
      </Form>
      <div className="sticky top-1/2 hidden h-fit md:flex">
        <MusicCard
          music={{
            ...form.watch(),
            duree: Number(form.watch("duree")),
            artistes: form.watch("artistes")?.trim().split(","),
            genres: selectedValues,
          }}
          disableLink
        />
      </div>
    </div>
  )
}
