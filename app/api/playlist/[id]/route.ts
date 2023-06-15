import { NextResponse } from 'next/server'
import { deletePlaylist, editPlaylist, getPlaylist } from "@/lib/mongo/playlist/playlist";

interface Requests {
    params: {id: string}
}

/**
 * Récupérer une playlist
 */
export async function GET(request: any, context: Requests) {
    const response = await getPlaylist(context.params.id);
    return NextResponse.json(response)
}

/**
 * Modifier une playlist
 */
export async function PATCH(request: any, context: Requests) {
    const body = await request.json()
    const response = await editPlaylist(body);
    return NextResponse.json(response)
}

/**
 * Supprimer une playlist
 */
export async function DELETE(request: any, context: Requests) {
    const response = await deletePlaylist(context.params.id);
    return NextResponse.json(response)
}
