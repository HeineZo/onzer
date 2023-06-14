import { NextResponse } from 'next/server'
import { getPlaylist } from "@/lib/mongo/playlist/playlist";

interface GETRequest {
    params: {id: string}
}
export async function GET(request: any, context: GETRequest) {
    const response = await getPlaylist(context.params.id);
    return NextResponse.json(response)
}
