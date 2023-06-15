import React from "react"

import EditMusic from "./EditMusic"
import { getMusic } from "@/lib/mongo/musique/music"

interface EditMusicProps {
  params: {
    id: string
  }
}

export default async function Page({ params }: EditMusicProps) {
  const { music } = await getMusic(params.id)

  return <EditMusic values={music} />
}
