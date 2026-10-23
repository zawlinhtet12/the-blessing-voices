import {requireChatGPTUser,chatGPTSignOutPath} from '../chatgpt-auth';
import {isOwner} from '../../lib/server';
import Dashboard from './dashboard';
export const dynamic='force-dynamic';
export const metadata={title:'Private Content Dashboard | The Blessing Voices',robots:{index:false,follow:false}};
export default async function Admin(){const user=await requireChatGPTUser('/admin');if(!await isOwner())return <main style={{padding:50}}><h1>Owner access required</h1><p>Sign in with the account that owns The Blessing Voices.</p><a href={chatGPTSignOutPath('/admin')} target="_top">Sign out</a></main>;return <Dashboard name={user.displayName}/>;}
