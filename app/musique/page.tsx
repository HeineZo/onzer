import React, { Suspense } from "react"
import Image from "next/image"
import Link from "next/link"
import { Music } from "lucide-react"

import { Musique } from "@/types/music"
import { siteConfig } from "@/config/site"
import { buttonVariants } from "@/components/ui/button"
import Searchbar from "@/components/Searchbar"

import AddMusicCard from "./components/AddMusicCard"
import MusicCard from "./components/MusicCard"
import MusicDetails from "./components/MusicDetails"
import Loading from "../loading"

const getMusics = async () => {
  const res = await fetch(`${siteConfig.baseUrl}/api/music`, {
    cache: "no-store",
  })
  if (!res.ok) {
    throw new Error("Impossible de récupérer les musiques")
  }

  return res.json()
}

interface ExplorerProps {
  searchParams: { id: string }
}

export default async function Explorer({ searchParams }: ExplorerProps) {
  const { musics } = await getMusics()

  return (
    <div className="relative">
      <section>
        <div className="flex flex-col  gap-6">
          <h1>Explorer</h1>
          <Searchbar />
        </div>
        {musics?.length ? (
          <div className="flex gap-12 flex-wrap">
            {musics?.map((music: Musique) => (
              <MusicCard music={music} key={music._id} />
            ))}
            <AddMusicCard />
          </div>
        ) : (
          <div className="flex flex-col justify-center items-center gap-5">
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
      {searchParams?.id && (
        <Suspense fallback={<Loading />}>
          <MusicDetails id={searchParams.id} />
        </Suspense>
      )}
    </div>
  )
}
