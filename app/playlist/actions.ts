"use server"

import { Playlist } from "@/types/playlist"
import {
  addMusicToPlaylist,
  addPlaylist,
  removeMusicFromPlaylist,
} from "@/lib/mongo/playlist/playlist"
import { siteConfig } from "@/config/site"


/**
 * Récupérer toutes les playlists
 * @returns Liste des playlists
 */
export const getPlaylists = async () => {
  const res = await fetch(`${siteConfig.baseUrl}/api/playlist`, {
    cache: "no-store",
  })
  if (!res.ok) {
    throw new Error("Impossible de récupérer les playlists")
  }

  return res.json()
}

/**
 * Créé une playlist
 * @param data Données de la playlist
 */
export const addPlaylistData = async (data: Playlist) => {
  return addPlaylist(data)
}

/**
 * Ajoute une musique à une playlist
 * @param idPlaylist Identifiant de la playlist
 * @param idMusique Identifiant de la musique
 */
export const addMusic = async (idPlaylist: string, idMusique: string) => {
  return addMusicToPlaylist(idPlaylist, idMusique)
}


/**
 * Enlever des musiques d'une playlist
 * @param id Id de la playlist
 * @param musicIds Ids des musiques à enlever
 */
export async function removeMusics(id: string, musicIds: string[]) {
  return removeMusicFromPlaylist(id, musicIds)
}

/**
 * Récupérer les données de la playlist
 * @param id Identifiant de la playlist
 * @returns Données de la playlist
 */
export const getPlaylist = async (id: string) => {
  const res = await fetch(`${siteConfig.baseUrl}/api/playlist/${id}`, {
    cache: "no-store",
  })
  if (!res.ok) {
    throw new Error("Cette playlist n'existe pas")
  }

  return res.json()
}

/**
 * Modifier une playlist
 * @param data Données de la playlist modifiée
 */
export const editMethod = async (data: Playlist) => {
  const response = await fetch(`${siteConfig.baseUrl}/api/playlist/${data._id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })

  return response.json()
}

/**
 * Supprime une playlist
 * @param id Identifiant de la playlist à supprimer
 */
export const deletePlaylist = async (id: string) => {
  const response = await fetch(`${siteConfig.baseUrl}/api/playlist/${id}`, {
    method: "DELETE",
  })

  return response.json()
}