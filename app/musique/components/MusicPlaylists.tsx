'use client'
import React, { useState } from "react"

import { Playlist } from "@/types/playlist"
import PlaylistCard from "@/app/playlist/components/PlaylistCard"
import { AddToPlaylist } from "./AddToPlaylist"
import { buttonVariants } from "@/components/ui/button"

interface MusicPlaylistsProps {
  playlists: Playlist[]
  musicPlaylists: Playlist[]
  musicId: string
}

export default function MusicPlaylists({ playlists, musicPlaylists, musicId }: MusicPlaylistsProps) {
  const [checkedPlaylists, setCheckedPlaylists] =
    useState<Playlist[]>(musicPlaylists ?? [])

  return (
    <>
      <div className="flex flex-col gap-2">
        <h2>Apparaît dans</h2>
        <div className="flex snap-x snap-mandatory gap-5 overflow-x-auto overflow-y-hidden p-5">
          {checkedPlaylists.map((playlist: Playlist, index: number) => (
            <PlaylistCard key={index} playlist={playlist} />
          ))}
        </div>
      </div>
      <AddToPlaylist
        values={playlists}
        setValues={setCheckedPlaylists}
        musiqueId={musicId}
        placeholder="Recherchez une playlist"
        checkedIds={musicPlaylists?.map((playlist: Playlist) => playlist._id ?? '')}
      >
        <button className={`${buttonVariants()} w-60`}>
          Ajouter à une playlist
        </button>
      </AddToPlaylist>
    </>
  )
}
