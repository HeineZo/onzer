export interface Musique {
  _id?: string
  titre: string
  artistes: string[]
  pochetteAlbum?: string
  duree: number
  genres: string[]
  pays: string
  dateSortie: Date
}

export enum Genre {
  Rock,
  Pop,
  Rap,
  Jazz,
  Reggae,
  'Hip-hop',
  Classique,
  Electro,
  Folk,
  Funk,
  Autre
}
