import {env} from 'cloudflare:workers';
import { pages } from '../../lib/static-pages';
import { notFound } from 'next/navigation';
import Script from 'next/script';
type Props={params:Promise<{slug?:string[]}>};
export async function generateMetadata({params}:Props){const key=(await params).slug?.join('/')||'';const p=pages[key as keyof typeof pages];const origin=env.SITE_URL?.replace(/\/$/,'');return p?{title:p.title,description:p.description,alternates:origin?{canonical:origin+'/'+key}:undefined,robots:key==='story-template'?{index:false,follow:false}:undefined}:{};}
export default async function StaticPage({params}:Props){const key=(await params).slug?.join('/')||'';const p=pages[key as keyof typeof pages];if(!p)notFound();return <><link rel="stylesheet" href="/style.css"/><div dangerouslySetInnerHTML={{__html:p.body}}/><Script src="/app.js" strategy="afterInteractive"/><Script src="/library.js" strategy="afterInteractive"/></>;}
