import React from "react"

import { Playlist } from "@/types/playlist"
import {ChevronRight} from 'lucide-react'
import Link from "next/link"

interface PlaylistRowProps {
  playlist: Playlist
}
export default function PlaylistRow({ playlist }: PlaylistRowProps) {
  return (
    <Link href="" className="flex w-96 p-5 bg-muted rounded-xl group justify-between">
      <div className="flex flex-col gap-2 w-[90%]">
        <h2>{playlist.titre}</h2>
        <p className="truncate">{playlist.description}</p>
        <span>
            {playlist.musiques.length} musique{playlist.musiques.length > 1 && "s"}
        </span>
      </div>
      <div className="w-fit flex justify-center items-center">
        <ChevronRight size={32} className="group-hover:translate-x-2 animate" />
      </div>
    </Link>
  )
}
