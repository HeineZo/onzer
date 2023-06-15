import React from "react"
import { Headphones, User } from "lucide-react"

import { pluralize } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { DataTable } from "@/components/DataTable"

import { columns } from "./components/columns"
import PlaylistOptions from "../components/PlaylistOptions"
import { getPlaylist } from "@/app/playlist/actions"

interface PlaylistProps {
  params: {
    id: string
  }
}

export default async function Playlist({ params }: PlaylistProps) {
  const { playlist } = await getPlaylist(params.id)

  return (
    <section>
      <div className="space-y-5">
        <span className="flex gap-5">
          <h1>{playlist?.titre}</h1>
          <PlaylistOptions id={params.id} />
        </span>
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
      <DataTable
        columns={columns}
        data={playlist.musiques}
        playlistId={params.id}
      />
    </section>
  )
}
