import { NextResponse } from 'next/server'
import { getPlaylist } from "@/lib/mongo/playlist/playlist";

interface Requests {
    params: {id: string}
}
export async function GET(request: any, context: Requests) {
    const response = await getPlaylist(context.params.id);
    return NextResponse.json(response)
}

export async function PATCH(request: any, context: Requests) {
    const response = await getPlaylist(context.params.id);
    return NextResponse.json(response)
}
