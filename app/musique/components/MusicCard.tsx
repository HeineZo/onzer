"use client"

import React from "react"
import Image from "next/image"
import { useRouter } from "next/navigation"

import { Musique } from "@/types/music"
import MusicOptions from "@/components/MusicOptions"


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
      className={`flex flex-col items-center gap-5 p-5 justify-center rounded-xl text-white animate ${
        !disableLink && "hover:bg-muted group cursor-pointer"
      }`}
    >
      <Image
        src={
          music?.pochetteAlbum ??
          "https://marvel-b1-cdn.bc0a.com/f00000000280066/d2snwnmzyr8jue.cloudfront.net/generic/generic_music_270.jpeg"
        }
        width="200"
        height="200"
        className="object-cover h-40 rounded-xl w-40 group-hover:scale-105 animate"
        alt="Pochette d'album"
      />
      <div className="flex justify-between">
        <div className="flex flex-col text-foreground justify-center items-center">
          <h2 className="text-xl truncate w-40">{music.titre}</h2>
          <div className="truncate w-40 text-muted-foreground">
            {music?.artistes?.map((artiste: string, index: number) => (
              <span key={index}>{(index ? ", " : "") + artiste}</span>
            ))}
          </div>
        </div>
        {!disableLink && <MusicOptions id={music._id ?? ''} />}
      </div>
    </div>
  )
}
