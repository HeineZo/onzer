import React from "react"

import EditPlaylist from "./EditPlaylist"
import { getPlaylist } from "@/app/playlist/actions"



interface PageProps {
  params: {
    id: string
  }
}

export default async function Page({ params }: PageProps) {
  const { playlist } = await getPlaylist(params.id)

  return <EditPlaylist values={playlist} />
}
