"use client"

import React from "react"
import Image from "next/image"
import { useRouter } from "next/navigation"

import { Musique } from "@/types/music"
import MusicOptions from "./MusicOptions"

interface MusicCardProps {
  music: Musique
  disableLink?: boolean
}

export default function MusicCard({
  music,
  disableLink = false,
}: MusicCardProps) {
  const router = useRouter()

  return (
    <div
      onClick={() => !disableLink && router.push(`/musique?id=${music._id}`)}
      className={`animate flex flex-col items-center justify-center gap-5 rounded-xl p-5 text-white ${
        !disableLink && "group cursor-pointer hover:bg-muted"
      }`}
    >
      <Image
        src={
          music?.pochetteAlbum ??
          "https://marvel-b1-cdn.bc0a.com/f00000000280066/d2snwnmzyr8jue.cloudfront.net/generic/generic_music_270.jpeg"
        }
        width="200"
        height="200"
        className="animate h-40 w-40 rounded-xl object-cover group-hover:scale-105"
        alt="Pochette d'album"
      />
      <div className="flex justify-between">
        <div className="flex flex-col items-center justify-center text-foreground">
          <h2 className="w-40 truncate text-xl">{music.titre}</h2>
          <div className="w-40 truncate text-muted-foreground">
            {music?.artistes?.map((artiste: string, index: number) => (
              <span key={index}>{(index ? ", " : "") + artiste}</span>
            ))}
          </div>
        </div>
        {!disableLink && <MusicOptions id={music?._id ?? ''} />}
      </div>
    </div>
  )
}
