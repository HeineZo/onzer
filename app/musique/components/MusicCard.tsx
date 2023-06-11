"use client"

import React from "react"
import Image from "next/image"
import { usePathname, useRouter } from "next/navigation"

import { Artiste, Musique } from "@/types/music"

interface MusicCardProps {
  music: Musique
}

export default function MusicCard({ music }: MusicCardProps) {
  const router = useRouter()
  const path = usePathname()

  return (
    <div
      onClick={() => router.push(`${path}?id=${music._id}`)}
      className="flex flex-col items-center  gap-5 p-5 justify-center cursor-pointer rounded-xl text-white hover:bg-muted group transition-all ease-in-out duration-150"
    >
      <Image
        src={music?.pochetteAlbum}
        width="200"
        height="200"
        className="object-cover h-40 rounded-xl w-40 group-hover:scale-105 transition-all ease-in-out duration-150"
        alt="Pochette d'album"
      />
      <div className="flex flex-col text-foreground justify-center items-center">
        <h2 className="text-xl truncate w-40">{music.titre}</h2>
        <div className="truncate w-40 text-muted-foreground">
          {music.artistes.map((artiste: Artiste, index: number) => (
            <span key={index}>{(index ? ", " : "") + artiste.nom}</span>
          ))}
        </div>
      </div>
    </div>
  )
}
