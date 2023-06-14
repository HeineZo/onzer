import { NextResponse } from 'next/server'
import { addMusic, getAllMusic } from "@/lib/mongo/musique/music";


/**
 * Récupérer toutes les musiques
 */
export async function GET() {
    const response = await getAllMusic();
    return NextResponse.json(response)
}

/**
 * Ajouter une musique
 */
export async function POST(request: Request) {
    const res = await request.json()
    console.log(res)
    const response = await addMusic(res);
    return NextResponse.json(response)
}