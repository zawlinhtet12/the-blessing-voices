import {env} from 'cloudflare:workers';
import {getChatGPTUser} from '../app/chatgpt-auth';
const ownerEmail=(env as unknown as {ADMIN_EMAIL?:string}).ADMIN_EMAIL?.trim().toLowerCase();
export async function isOwner(){const user=await getChatGPTUser();return !!user&&((!!ownerEmail&&user.email.toLowerCase()===ownerEmail)||(import.meta.env.DEV&&user.userId==='local_seedy'));}
export async function guard(request:Request){if(!await isOwner())return Response.json({error:'Only the site owner can manage content.'},{status:403});if(request.method!=='GET'){const origin=request.headers.get('origin');if(!origin||origin!==new URL(request.url).origin)return Response.json({error:'This request must come from your dashboard.'},{status:403});}return null;}
export function database(){if(!env.DB)throw new Error('Content storage is not connected.');return env.DB;}
export function bucket(){if(!env.BUCKET)throw new Error('File storage is not connected.');return env.BUCKET;}
export function decodeRow(row:any){return {id:row.id,title:row.title,collection:row.collection,scripture:row.scripture,summary:row.summary,sections:JSON.parse(row.sections),status:row.status,pdfKey:row.pdf_key,videoKey:row.video_key,imageKey:row.image_key,youtube:row.youtube,createdAt:row.created_at,updatedAt:row.updated_at};}
export function errorResponse(e:unknown){console.error(e instanceof Error?e.message:'Content request failed');return Response.json({error:'Unable to complete this request. Please try again.'},{status:503});}
export function limitedBody(req:Request,max:number){let received=0;return req.body?.pipeThrough(new TransformStream<Uint8Array,Uint8Array>({transform(chunk,controller){received+=chunk.byteLength;if(received>max)throw new Error('Request exceeds the allowed size.');controller.enqueue(chunk);}}));}
export async function readStoryJson(req:Request){const body=limitedBody(req,500000);return await new Response(body,{headers:{'Content-Type':'application/json'}}).json();}
