import React from "react"
import { Plus } from "lucide-react"
import '@/styles/globals.css'
import Link from "next/link"
export default function AddMusicCard() {
  return (
    <Link href="/musique/ajouter" className="flex flex-col items-center gap-5 min-h-[272px] min-w-[200px] p-5 group justify-center text-muted-foreground hover:text-foreground border-dashed border-2 hover:border-foreground cursor-pointer rounded-xl transition-all ease-in-out duration-150">
      <Plus size="50"/>
      <h3>Ajouter une musique</h3>
    </Link>
  )
}
