import { NextResponse } from 'next/server'
import { getAllPlaylist } from "@/lib/mongo/playlist/playlist";


export async function GET() {
    const response = await getAllPlaylist();
    return NextResponse.json(response)
}
