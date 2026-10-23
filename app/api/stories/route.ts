import {database,decodeRow,errorResponse} from '../../../lib/server';
export const dynamic='force-dynamic';
export async function GET(){try{const rows=await database().prepare("SELECT * FROM stories WHERE status='published' ORDER BY updated_at DESC").all();return Response.json(rows.results.map(decodeRow),{headers:{'Cache-Control':'no-store'}});}catch(e){return errorResponse(e);}}
