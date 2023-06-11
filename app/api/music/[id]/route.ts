import { NextResponse } from 'next/server'
import { getMusic } from "@/lib/mongo/musique/music";

interface GETRequest {
    params: {id: string}
}
export async function GET(request: any, context: GETRequest) {
    const response = await getMusic(context.params.id);
    return NextResponse.json(response)
}
