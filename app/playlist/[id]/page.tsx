import React from "react"
import { Headphones, User } from "lucide-react"

import { siteConfig } from "@/config/site"
import { pluralize } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { DataTable } from "@/components/DataTable"

import { columns } from "./components/columns"
import { Musique } from "@/types/music"
import { removeMusic } from "./actions"

interface PlaylistProps {
  params: {
    id: string
  }
}

/**
 * Récupérer les données de la playlist
 * @param id Identifiant de la playlist
 * @returns Données de la playlist
 */
const getPlaylist = async (id: string) => {
  const res = await fetch(`${siteConfig.baseUrl}/api/playlist/${id}`, {
    cache: "no-store",
  })
  if (!res.ok) {
    throw new Error("Cette playlist n'existe pas")
  }

  return res.json()
}

// const removeMusic = async (id: string, data: string[]) => {
//   const response = await fetch(`/api/musique/${id}`, {
//     method: "PATCH",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify(data),
//   })

//   return response.json()
// }

export default async function Playlist({ params }: PlaylistProps) {
  const { playlist } = await getPlaylist(params.id)

  return (
    <section>
      <div className="space-y-5">
        <h1>{playlist?.titre}</h1>
        <p>{playlist?.description}</p>
        <span className="mt-5 flex gap-5">
          <Badge className="gap-1">
            <User size="20" />
            {playlist?.createur}
          </Badge>
          {playlist?.musiques?.length > 0 && (
            <Badge className="gap-1">
              <Headphones size="20" />
              {playlist.musiques?.length +
                pluralize(playlist.musiques?.length, " musique")}
            </Badge>
          )}
        </span>
      </div>
      <DataTable columns={columns} data={playlist.musiques} removeMusic={(musicIds: string[]) => removeMusic(params.id, musicIds)}/>
    </section>
  )
}
