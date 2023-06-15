"use server"

import { Musique } from "@/types/music"
import { addMusic } from "@/lib/mongo/musique/music"
import { siteConfig } from "@/config/site"


/**
 * Récupérer la musique
 * @param id Identifiant de la musique à récupérer
 * @returns Données de la musique
 */
export const getMusic = async (id: string) => {
  const res = await fetch(`${siteConfig.baseUrl}/api/musique/${id}`)
  if (!res.ok) {
    throw new Error("Cette musique n'existe pas")
  }

  return res.json()
}

/**
 * Supprimer une musique
 * @param id Identifiant de la musique à supprimer
 */
export const deleteMusic = async (id: string) => {
  const response = await fetch(`${siteConfig.baseUrl}/api/musique/${id}`, {
    method: "DELETE",
  })

  return response.json()
}

/**
 * Ajouter une musique
 * @param data Données de la nouvelle musique
 */
export const addMusicData = async (data: Musique) => {
  return addMusic(data)
}

/**
 * Modifier une musique
 * @param data Données de la musique à modifier
 */
export const editMusic = async (data: Musique) => {
  const response = await fetch(`/api/musique/${data._id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })

  return response.json()
}
