import {z} from 'zod';
import {authorize,config,failure,payload} from '@/lib/meow-server';
import {complete,instructions,AIError} from '@/lib/meow-ai.mjs';
const schema=z.object({target:z.enum(['all','mochi','atlas','pixel']),message:z.string().trim().min(1).max(12000),knowledgeContext:z.string().max(40000).optional(),history:z.array(z.object({role:z.enum(['user','assistant']),content:z.string().max(12000)})).max(16).default([])});
export async function POST(request:Request){try{await authorize(request);const parsed=schema.safeParse(await payload(request));if(!parsed.success)throw new AIError('ข้อความหรือข้อมูลประกอบยาวเกินกำหนดหรือไม่ถูกต้อง',400);const b=parsed.data;const sender=b.target==='mochi'?'Mochi':b.target==='pixel'?'Pixel':'Atlas';const text=await complete(config(),[{role:'developer',content:instructions(sender,b.knowledgeContext)},...b.history,{role:'user',content:b.message}],request.signal);return Response.json({sender,text});}catch(e){return failure(e)}}
