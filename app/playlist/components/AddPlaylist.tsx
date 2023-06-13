import React from "react"
import Link from "next/link"
import { Plus } from "lucide-react"

export default function AddPlaylist() {
  return (
    <Link
      href=""
      className="flex w-96 h-[136px] p-5 flex-col justify-center items-center rounded-xl group text-muted-foreground hover:text-foreground hover:border-foreground cursor-pointer animate border-dashed border-2"
    >
      <Plus size="50" />
      <h3>Créer une playlist</h3>
    </Link>
  )
}
