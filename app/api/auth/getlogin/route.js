
import { cookies } from 'next/headers'


export async function GET(req) {
    
    const cookieStore = cookies()
     
    return new Response(JSON.stringify(cookies().get('isAdmin')));
}