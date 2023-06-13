import { siteConfig } from "@/config/site"
import React from "react"
import PlaylistRow from "./components/PlaylistRow"
import AddPlaylist from "./components/AddPlaylist"

const getPlaylists = async () => {
  const res = await fetch(`${siteConfig.baseUrl}/api/playlist`, {
    cache: "no-store",
  })
  if (!res.ok) {
    throw new Error("Impossible de récupérer les playlists")
  }

  return res.json()
}

export default async function Playlists() {
  const { playlists } = await getPlaylists()

  return (
    <section>
      <h1>Mes playlists</h1>
      {playlists?.length ? (
        <div className="flex gap-12 flex-wrap">
          {playlists?.map((playlist: any) => (
            <PlaylistRow key={playlist._id} playlist={playlist} />
          ))}
          <AddPlaylist />
        </div>
      ) : (
        <div className="flex flex-col justify-center items-center gap-5">
          <h2>Aucune playlist trouvée</h2>
        </div>
      )}

    </section>
  )
}
