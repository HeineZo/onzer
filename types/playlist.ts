import { Musique } from "./music"

export interface Playlist {
    _id?: string
    titre: string
    description: string
    createur: string
    duree: number
    musiques: Musique[]
  }