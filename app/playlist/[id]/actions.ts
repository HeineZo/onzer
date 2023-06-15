"use server"

import { removeMusicFromPlaylist } from "@/lib/mongo/playlist/playlist"

export async function removeMusic(id: string, musicIds: string[]) {
  return removeMusicFromPlaylist(id, musicIds)
}
