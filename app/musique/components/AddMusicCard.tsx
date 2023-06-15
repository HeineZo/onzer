import React from "react"
import { Plus } from "lucide-react"
import '@/styles/globals.css'
import Link from "next/link"
export default function AddMusicCard() {
  return (
    <Link href="/musique/ajouter" className="group flex min-h-[272px] min-w-[200px] cursor-pointer flex-col items-center justify-center gap-5 rounded-xl border-2 border-dashed p-5 text-muted-foreground transition-all duration-150 ease-in-out hover:border-foreground hover:text-foreground">
      <Plus size="50"/>
      <h3>Ajouter une musique</h3>
    </Link>
  )
}
