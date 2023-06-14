'use server'

import { addMusic } from "@/lib/mongo/musique/music";
import { Musique } from "@/types/music";

export const addMusicData = async (data: Musique) => {
    return addMusic(data);
}