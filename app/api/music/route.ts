import { NextResponse } from 'next/server'
import { getAllMusic } from "@/lib/mongo/musique/music";


export async function GET() {
    const response = await getAllMusic();
    return NextResponse.json(response)
}
