import {headers} from 'next/headers';
import {env} from 'cloudflare:workers';
import {verifySession,configured} from './admin-session';
export const COOKIE_NAME=import.meta.env.DEV?'blessing_admin_dev':'__Host-blessing_admin';
export function loginConfigured(){return configured(env);}
export async function getAdminUser(){const h=await headers();const values=(h.get('cookie')||'').split(';').map(c=>c.trim()).filter(c=>c.startsWith(COOKIE_NAME+'='));if(values.length!==1)return null;return verifySession(env,values[0].slice(COOKIE_NAME.length+1));}
