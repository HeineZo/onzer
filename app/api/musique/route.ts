import { NextResponse } from 'next/server'
import { addMusic, getAllMusic } from "@/lib/mongo/musique/music";


/**
 * Récupérer toutes les musiques
 */
export async function GET() {
    const response = await getAllMusic();
    return NextResponse.json(response)
}
