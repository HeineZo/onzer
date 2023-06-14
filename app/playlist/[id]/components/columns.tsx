"use client"

import Image from "next/image"
import Link from "next/link"
import router from "next/router"
import { ColumnDef } from "@tanstack/react-table"
import { format, intervalToDuration } from "date-fns"
import { fr } from "date-fns/locale"
import { Edit2, Forward, MoreHorizontal, Trash } from "lucide-react"

import { Musique } from "@/types/music"
import { capitalize } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export const columns: ColumnDef<Musique>[] = [
  {
    accessorKey: "pochetteAlbum",
    header: "",
    cell: ({ row }) => {
      const { pochetteAlbum } = row.original
      return (
        <Image
          src={
            pochetteAlbum ??
            "https://marvel-b1-cdn.bc0a.com/f00000000280066/d2snwnmzyr8jue.cloudfront.net/generic/generic_music_270.jpeg"
          }
          alt="Pochette de l'album"
          width="500"
          height="500"
          className="rounded-xl w-16 h-16 object-cover"
        />
      )
    },
  },
  {
    accessorKey: "titre",
    header: "Titre",
  },
  {
    accessorKey: "duree",
    header: "Durée",
    cell: ({ row }) => {
      const { duree } = row.original
      const dureeFormat = intervalToDuration({ start: 0, end: duree * 1000 })
      return <span>{`${dureeFormat.minutes} min. ${dureeFormat.seconds}`}</span>
    },
  },
  {
    accessorKey: "genres",
    header: "Genres",
    cell: ({ row }) => {
      const { genres } = row.original
      return (
        <div className="flex gap-0">
          {genres.map((genre: string, index: number) => (
            <div className="first-letter:uppercase" key={index}>
              {(index ? ", " : "") + genre}
            </div>
          ))}
        </div>
      )
    },
  },
  {
    accessorKey: "pays",
    header: "Pays",
  },
  {
    accessorKey: "dateSortie",
    header: "Date de sortie",
    cell: ({ row }) => {
      const { dateSortie } = row.original

      return (
        <span>
          {format(new Date(dateSortie), "d MMMM Y", {
            locale: fr,
          })}
        </span>
      )
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const musique = row.original

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Plus d'actions</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem>
              <Link href={`/musique?id=${musique?._id}`}>Voir la musique</Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Link href={`/musique/${musique?._id}/modifier`}>Modifier</Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Link href={`/musique/${musique?._id}/supprimer`}>Supprimer</Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]
