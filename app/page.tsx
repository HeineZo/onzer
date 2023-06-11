import Image from "next/image"
import Link from "next/link"

import { Musique } from "@/types/music"
import { siteConfig } from "@/config/site"
import { getAllMusic } from "@/lib/mongo/musique/music"
import { buttonVariants } from "@/components/ui/button"

const getMusic = async () => {
  const res = await fetch(`${siteConfig.baseUrl}/api/music`, {
    cache: "no-store",
  })
  if (!res.ok) {
    throw new Error("Failed to fetch data")
  }

  return res.json()
}

export default async function Home() {
  // const { musics } = await getMusic()
  return (
    <>
      <section className="justify-center gap-6 pb-8 pt-0 md:pb-10">
        <div className="flex max-w-[980px] flex-col items-start gap-2">
          <h1>
            Toute la musique <br className="hidden sm:inline" />
            avec une heure de retard
          </h1>
          <p className="max-w-[700px]">
            Ajoutez une musique ou créez une playlist
          </p>
        </div>
        <div className="flex gap-4">
          <Link href={`${siteConfig.baseUrl}/musique/ajouter`} className={buttonVariants()}>
            Ajouter une musique
          </Link>
          <Link
            href={`${siteConfig.baseUrl}/playlist/creer`}
            className={buttonVariants({ variant: "outline" })}
          >
            Créer une playlist
          </Link>
        </div>
        {/* {musics?.map((music: any) => (
        <div
          key={music._id}
          className="flex flex-col items-center justify-center text-white"
        >
          <h1 className="text-4xl font-bold">{music.titre}</h1>
          {music.artistes.map((artiste: any) => (
            <h2 className="text-2xl font-bold">{artiste.nom}</h2>
          ))}
          <Image
            src={music?.pochetteAlbum}
            width="50"
            height="50"
            alt="Pochette d'album"
          />
        </div>
      ))} */}
      </section>
      {/* <section className="absolute top-0 -z-10 h-full">
        <div className="flex justify-center w-full gap-44 animate-infinite-horizontal-slide">
          {musics?.map((music: Musique) => (
            <Image
              src={music?.pochetteAlbum}
              alt="Pochette d'album"
              width={200}
              height={200}
              className="object-cover h-40 rounded-xl w-40"
            />
          ))}
        </div>
        <div className="flex justify-center w-full gap-44 animate-infinite-horizontal-slide ">
          {musics?.map((music: Musique) => (
            <Image
              src={music?.pochetteAlbum}
              alt="Pochette d'album"
              width={200}
              height={200}
              className="object-cover h-40 rounded-xl w-40"
            />
          ))}
        </div>
        <div className="flex justify-center w-full  gap-44 animate-infinite-horizontal-slide ">
          {musics?.map((music: Musique) => (
            <Image
              src={music?.pochetteAlbum}
              alt="Pochette d'album"
              width={200}
              height={200}
              className="object-cover h-40 rounded-xl w-40"
            />
          ))}
        </div>
        <div className="flex justify-center w-full gap-44 animate-infinite-horizontal-slide ">
          {musics?.map((music: Musique) => (
            <Image
              src={music?.pochetteAlbum}
              alt="Pochette d'album"
              width={200}
              height={200}
              className="object-cover h-40 rounded-xl w-40"
            />
          ))}
        </div>
        <div className="flex justify-center w-full gap-44 animate-infinite-horizontal-slide ">
          {musics?.map((music: Musique) => (
            <Image
              src={music?.pochetteAlbum}
              alt="Pochette d'album"
              width={200}
              height={200}
              className="object-cover h-40 rounded-xl w-40"
            />
          ))}
        </div>
      </section> */}
    </>
  )
}
