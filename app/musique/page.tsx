import React, { Suspense } from "react"
import Image from "next/image"
import Link from "next/link"
import { Music } from "lucide-react"

import { Musique } from "@/types/music"
import { siteConfig } from "@/config/site"
import { buttonVariants } from "@/components/ui/button"
import Searchbar from "@/components/Searchbar"

import Loading from "../loading"
import AddMusicCard from "./components/AddMusicCard"
import MusicCard from "./components/MusicCard"
import MusicDetails from "./components/MusicDetails"
import { SearchCategory } from "@/types/search"
import { searchMusics } from "@/app/musique/actions"
import { isEmpty } from "@/lib/utils"

const getMusics = async () => {
  const res = await fetch(`${siteConfig.baseUrl}/api/musique`, {
    cache: "no-store",
  })
  if (!res.ok) {
    throw new Error("Impossible de récupérer les musiques")
  }

  return res.json()
}

interface MusiquesProps {
  params: string
  searchParams: any
}

export default async function Musiques({
  params,
  searchParams,
}: MusiquesProps) {

  let result;
  if (!isEmpty(searchParams)) {
    result = await searchMusics(searchParams)
  } else {
    result = await getMusics()
  }
  let { musics } = result

  return (
    <div className="relative h-full">
      <section>
        <div className="flex flex-col gap-6">
          <h1>Explorer</h1>
          <Searchbar />
        </div>
        {musics?.length ? (
          <div className="flex flex-wrap justify-center gap-12 sm:justify-start ">
            {musics?.map((music: Musique) => (
              <MusicCard music={music} key={music._id} />
            ))}
            <AddMusicCard />
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center gap-5">
            <Music size="100" />
            <h2>Aucune musique trouvée</h2>
            <Link
              href={`${siteConfig.baseUrl}/musique/ajouter`}
              className={buttonVariants()}
            >
              Ajouter une musique
            </Link>
          </div>
        )}
      </section>
      {searchParams?.id && <MusicDetails id={searchParams.id} />}
    </div>
  )
}
