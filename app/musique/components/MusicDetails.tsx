import React from "react"
import Image from "next/image"
import Link from "next/link"
import { format, intervalToDuration } from "date-fns"
import { fr } from "date-fns/locale"
import { CalendarDays, Clock, Disc, Mic2, X } from "lucide-react"

import { Playlist } from "@/types/playlist"
import { buttonVariants } from "@/components/ui/button"
import { musicWithinPlaylist } from "@/app/musique/actions"
import PlaylistCard from "@/app/playlist/components/PlaylistCard"

import { AddToPlaylist } from "./AddToPlaylist"
import MusicOptions from "./MusicOptions"
import { getPlaylists } from "@/app/playlist/actions"

interface MusicDetailsProps {
  id: string
}

export default async function MusicDetails({ id }: MusicDetailsProps) {
  const getMusic = await musicWithinPlaylist(id)
  const getAllPlaylists = await getPlaylists()
  const [musicResponse, playlistsResponse] = await Promise.all([getMusic, getAllPlaylists])
  const {music} = musicResponse
  const {playlists} = playlistsResponse
  const duree = intervalToDuration({ start: 0, end: music?.duree ?? 0 * 1000 })

  return (
    <div className="absolute top-0 h-full w-screen overflow-hidden backdrop-blur-lg">
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
          <div className="flex flex-col justify-between gap-5 md:flex-row">
            <div className="flex flex-col gap-6">
              <Image
                src={music?.pochetteAlbum}
                width="1000"
                height="1000"
                className="h-96 w-96 rounded-xl object-cover transition-all duration-150 ease-in-out group-hover:scale-105"
                alt="Pochette d'album"
              />
              <div className="flex justify-between gap-5">
                <span className="flex gap-2">
                  <CalendarDays />
                  <span>
                    {music?.dateSortie &&
                      format(new Date(music?.dateSortie), "d MMMM Y", {
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
            <div className=" flex w-full flex-col gap-6 md:w-1/2">
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
              <div className="flex flex-col gap-2">
                <h2>Apparaît dans</h2>
                <div className="flex snap-x snap-mandatory gap-5 overflow-x-auto overflow-y-hidden p-5">
                  {music?.playlists?.map(
                    (playlist: Playlist, index: number) => (
                      <PlaylistCard key={index} playlist={playlist} />
                    )
                  )}
                </div>
              </div>
              <AddToPlaylist
                values={playlists}
                musiqueId={id}
                placeholder="Recherchez une playlist"
                checkedIds={music?.playlists?.map(
                  (playlist: Playlist) => playlist._id
                )}
              >
                <button className={`${buttonVariants()} w-60`}>
                  Ajouter à une playlist
                </button>
              </AddToPlaylist>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
