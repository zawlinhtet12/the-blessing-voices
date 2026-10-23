import {getAdminUser,loginConfigured} from '../../lib/admin-auth';
import Dashboard from './dashboard';
import Login from './login';
export const dynamic='force-dynamic';
export const metadata={title:'Private Content Dashboard | The Blessing Voices',robots:{index:false,follow:false}};
export default async function Admin(){const user=await getAdminUser();return user?<Dashboard name={user.displayName}/>:<Login configured={loginConfigured()}/>;}
