// Compatibility exports for earlier source versions. Authentication now uses
// the website's signed administrator cookie, never caller-supplied identity headers.
import {getAdminUser} from '../lib/admin-auth';
import {redirect} from 'next/navigation';
export const getChatGPTUser=getAdminUser;
export async function requireChatGPTUser(_returnTo:string){const user=await getAdminUser();if(user)return user;redirect('/admin');}
export function chatGPTSignInPath(_returnTo:string){return '/admin';}
export function chatGPTSignOutPath(_returnTo='/'){return '/admin';}
