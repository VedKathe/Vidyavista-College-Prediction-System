
import { cookies } from 'next/headers'


export async function POST(req) {
    const  body  = await req.json()
    const cookieStore = cookies()
    cookies().set('isAdmin', true)
    
    
    return new Response(JSON.stringify(body));
}