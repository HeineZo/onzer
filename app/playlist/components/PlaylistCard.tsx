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
      className="cursor-pointer hover:ring ring-foreground flex w-96 p-5 bg-muted rounded-xl group justify-between animate"
    >
      <div className="flex flex-col gap-2 w-[90%]">
        <h2>{playlist.titre}</h2>
        <p className="truncate">{playlist?.description}</p>
        {playlist.musiques && playlist.musiques?.length > 0 && (
          <span>
            {playlist.musiques?.length + pluralize(playlist.musiques?.length, ' musique')} • {playlist.createur}
          </span>
        )}
      </div>
      <div className="w-fit flex justify-center items-center">
        <ChevronRight size={32} className="group-hover:translate-x-2 animate" />
      </div>
    </Link>
  )
}
