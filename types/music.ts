export interface Musique {
  _id?: string
  titre: string
  artistes: Artiste[]
  pochetteAlbum: string
  duree: number
  genres: string[]
  pays: string
  dateSortie: string
}

export interface Artiste {
  nom: string
  pays: string
}
