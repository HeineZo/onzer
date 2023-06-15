import React from "react"
import Link from "next/link"
import { ChevronRight } from "lucide-react"

import { Playlist } from "@/types/playlist"
import { pluralize } from "@/lib/utils"

interface PlaylistCardProps {
  playlist: Playlist
}
export default function PlaylistCard({ playlist }: PlaylistCardProps) {
  return (
    <Link
      href={`/playlist/${playlist._id}`}
      className="animate group flex w-96 cursor-pointer justify-between rounded-xl bg-muted p-5 ring-foreground hover:ring"
    >
      <div className="flex w-[90%] flex-col gap-2">
        <h2>{playlist.titre}</h2>
        <p className="truncate">{playlist?.description}</p>
        {playlist.musiques && playlist.musiques?.length > 0 && (
          <span>
            {playlist.musiques?.length + pluralize(playlist.musiques?.length, ' musique')} • {playlist.createur}
          </span>
        )}
      </div>
      <div className="flex w-fit items-center justify-center">
        <ChevronRight size={32} className="animate group-hover:translate-x-2" />
      </div>
    </Link>
  )
}
