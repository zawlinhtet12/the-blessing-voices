import {COOKIE_NAME} from '../../../../lib/admin-auth';
export const dynamic='force-dynamic';
export async function POST(req:Request){if(req.headers.get('origin')!==new URL(req.url).origin)return new Response('Forbidden',{status:403});return new Response(null,{status:303,headers:{Location:'/admin','Cache-Control':'no-store','Set-Cookie':`${COOKIE_NAME}=; Path=/; HttpOnly; SameSite=Strict; Max-Age=0${import.meta.env.DEV?'':'; Secure'}`}});}
