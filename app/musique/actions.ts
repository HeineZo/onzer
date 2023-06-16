"use server"

import { Musique } from "@/types/music"
import { SearchCategory } from "@/types/search"
import { siteConfig } from "@/config/site"
import { addMusic, search } from "@/lib/mongo/musique/music"

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
 * Rechercher une musique par une catégorie et une requête
 * @param category  Catégorie de la recherche
 * @param query   Requête de la recherche
 * @returns Résultats de la recherche
 */
export const searchMusics = async (searchParams: {
  category: SearchCategory
  query: string
}) => {
  const res = await search(Object.keys(searchParams).toString(), Object.values(searchParams).toString())
  return res
}

/**
 * Récupère les playlists dans lesquelles la musique figure
 * @param id Identifiant de la musique
 * @returns Les playlists dans lesquelles la musique figure
 */
export const musicWithinPlaylist = async (id: string) => {
  const res = await fetch(`${siteConfig.baseUrl}/api/musique/${id}/playlist`)
  if (!res.ok) {
    throw new Error("Cette musique n'existe pas")
  }
  return await res.json()
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
  const response = await fetch(
    `${siteConfig.baseUrl}/api/musique/${data._id}`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }
  )

  return response.json()
}
