import * as z from "zod"
import { addMusic } from "@/lib/mongo/musique/music"
import { NextRequest } from "next/server"

interface POSTProps {
    request: NextRequest
}
  
export async function POST(request: NextRequest) {
    console.log(request.body)
    const response = await addMusic(request.body);
    // console.log(response)
}