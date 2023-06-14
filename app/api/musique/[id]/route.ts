import { NextResponse } from 'next/server'
import { deleteMusic, editMusic, getMusic } from "@/lib/mongo/musique/music";

interface Requests {
    params: {id: string}
}

/**
 * Récupérer une musique par son id
 */
export async function GET(request: any, context: Requests) {
    const response = await getMusic(context.params.id);
    return NextResponse.json(response)
}

/**
 * Supprimer une musique par son id
 */
export async function DELETE(request: any, context: Requests) {
    const response = await deleteMusic(context.params.id);
    return NextResponse.json(response)
}

/**
 * Modifier une musique par son id
 */
export async function PATCH(request: Request) {
    const body = await request.json()
    const response = await editMusic({...body, dateSortie: new Date(body.dateSortie)});
    return NextResponse.json(response)
}

