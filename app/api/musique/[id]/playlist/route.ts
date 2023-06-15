import { NextResponse } from 'next/server'
import { musicWithinPlaylist } from "@/lib/mongo/musique/music";

interface Requests {
    params: {id: string}
}

/**
 * Récupère les playlists dans lesquelles la musique figure
 */
export async function GET(request: any, context: Requests) {
    const response = await musicWithinPlaylist(context.params.id);
    return NextResponse.json(response)
}


