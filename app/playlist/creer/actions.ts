'use server'

import { addPlaylist } from "@/lib/mongo/playlist/playlist";
import { Playlist } from "@/types/playlist";

export const addPlaylistData = async (data: Playlist) => {
    return addPlaylist(data);
}