import React from "react"
import Image from "next/image"
import Link from "next/link"
import { format, intervalToDuration } from "date-fns"
import { fr } from "date-fns/locale"
import { CalendarDays, Clock, Disc, Mic2, X } from "lucide-react"

import { siteConfig } from "@/config/site"
import { buttonVariants } from "@/components/ui/button"
import { Combobox } from "@/components/Combobox"
import MusicOptions from "@/components/MusicOptions"

interface MusicDetailsProps {
  id: string
}

const getMusic = async (id: string) => {
  const res = await fetch(`${siteConfig.baseUrl}/api/musique/${id}`)
  if (!res.ok) {
    throw new Error("Cette musique n'existe pas")
  }

  return res.json()
}

export default async function MusicDetails({ id }: MusicDetailsProps) {
  const { music } = await getMusic(id)
  const duree = intervalToDuration({ start: 0, end: music?.duree ?? 0 * 1000 })

  return (
    <div className="absolute top-0 w-screen h-screen backdrop-blur-lg">
      <section>
        <div className="flex flex-col gap-6">
          <span className="flex w-full justify-between">
            <h1>{music?.titre}</h1>
            <div className="flex items-center">
              <MusicOptions id={id} />
              <Link
                href="/musique"
                className={buttonVariants({
                  size: "sm",
                  variant: "ghost",
                })}
              >
                <X />
              </Link>
            </div>
          </span>
          <div className="flex justify-between">
            <div className="flex flex-col gap-6">
              <Image
                src={music?.pochetteAlbum}
                width="1000"
                height="1000"
                className="object-cover h-96 rounded-xl w-96 group-hover:scale-105 transition-all ease-in-out duration-150"
                alt="Pochette d'album"
              />
              <div className="flex gap-5 justify-between">
                <span className="flex gap-2">
                  <CalendarDays />
                  <span>
                    {music?.dateSortie && format(new Date(music?.dateSortie), "d MMMM Y", {
                      locale: fr,
                    })}
                  </span>
                </span>
                <span className="flex gap-2">
                  <Clock />
                  <span>{`${duree?.minutes} min. ${duree?.seconds}`}</span>
                </span>
              </div>
            </div>
            <div className="flex flex-col gap-6 w-1/2">
              <div className="flex gap-2">
                <Mic2 />
                <span>
                  {music?.artistes?.map((artiste: string, index: number) => (
                    <span key={index}>{(index ? ", " : "") + artiste}</span>
                  ))}
                </span>
              </div>
              <div className="flex gap-2">
                <Disc />
                <span className="flex">
                  {music?.genres?.map((genre: string, index: number) => (
                    <div className="first-letter:uppercase" key={index}>
                      {(index ? ", " : "") + genre}
                    </div>
                  ))}
                </span>
              </div>
              <div>
                <h2>Apparaît dans</h2>
              </div>
              <Combobox values={[]} placeholder="Recherchez une playlist">
                <button className={`${buttonVariants()} w-60`}>
                  Ajouter à une playlist
                </button>
              </Combobox>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
