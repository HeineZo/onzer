-- Création de la table "musique"
CREATE TABLE musique 
(
  id INT AUTO_INCREMENT PRIMARY KEY,
  titre VARCHAR(255) NOT NULL,
  artiste VARCHAR(255) NOT NULL,
  pochetteAlbum VARCHAR(255),
  duree INT NOT NULL,
  genre VARCHAR(255) NOT NULL,
  pays VARCHAR(255) NOT NULL,
  dateSortie DATE NOT NULL,
  CONSTRAINT CHK_genre CHECK (
    genre IN (
      'rock',
      'pop',
      'jazz',
      'hip-hop',
      'classique',
      'electro',
      'folk',
      'reggae',
      'r&b',
      'autre'
    )
  )
);
-- Création de la table "playlist"
CREATE TABLE playlist (
  id INT AUTO_INCREMENT PRIMARY KEY,
  titre VARCHAR(255) NOT NULL,
  description VARCHAR(255),
  createur VARCHAR(255) NOT NULL
);
-- Création de la table de liaison "playlist_musique"
CREATE TABLE playlist_musique (
  id INT AUTO_INCREMENT PRIMARY KEY,
  playlist_id INT NOT NULL,
  musique_id INT NOT NULL,
  FOREIGN KEY (playlist_id) REFERENCES playlist(id),
  FOREIGN KEY (musique_id) REFERENCES musique(id)
);