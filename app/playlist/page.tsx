import { siteConfig } from "@/config/site"
import React from "react"
import PlaylistCard from "./components/PlaylistCard"
import AddPlaylist from "./components/AddPlaylist"
import { getPlaylists } from "./actions"


export default async function Page() {
  const { playlists } = await getPlaylists()

  return (
    <section>
      <h1>Mes playlists</h1>
      {playlists?.length ? (
        <div className="flex flex-wrap gap-12">
          {playlists?.map((playlist: any) => (
            <PlaylistCard key={playlist._id} playlist={playlist} />
          ))}
          <AddPlaylist />
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center gap-5">
          <h2>Aucune playlist trouvée</h2>
        </div>
      )}

    </section>
  )
}
