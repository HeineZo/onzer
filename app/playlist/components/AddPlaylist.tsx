import React from "react"
import Link from "next/link"
import { Plus } from "lucide-react"

export default function AddPlaylist() {
  return (
    <Link
      href="/playlist/creer"
      className="animate group flex h-[136px] w-96 cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed p-5 text-muted-foreground hover:border-foreground hover:text-foreground"
    >
      <Plus size="50" />
      <h3>Créer une playlist</h3>
    </Link>
  )
}
