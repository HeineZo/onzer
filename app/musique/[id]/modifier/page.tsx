import React from "react"

import { siteConfig } from "@/config/site"

import EditMusic from "./EditMusic"

const getMusic = async (id: string) => {
  const res = await fetch(`${siteConfig.baseUrl}/api/musique/${id}`)
  if (!res.ok) {
    throw new Error("Cette musique n'existe pas")
  }

  return res.json()
}

interface EditMusicProps {
  params: {
    id: string
  }
}

export default async function Page({ params }: EditMusicProps) {
  const { music } = await getMusic(params.id)

  return <EditMusic values={music} />
}
