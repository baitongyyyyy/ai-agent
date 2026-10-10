import { env } from 'cloudflare:workers';
import { getChatGPTUser } from '@/app/chatgpt-auth';
import { AIError } from './meow-ai.mjs';
export function config(){ return env as unknown as {OPENAI_API_KEY?:string;OPENAI_MODEL?:string}; }
export async function authorize(request?:Request){
 if(!await getChatGPTUser()) throw new AIError('กรุณาเข้าสู่ระบบ ChatGPT อีกครั้ง',401);
 if(request && (request.headers.get('sec-fetch-site')==='cross-site'||request.headers.get('origin')!==new URL(request.url).origin)) throw new AIError('คำขอต้องมาจาก Meow Office เท่านั้น',403);
}
export async function payload(request:Request){
 const text=await request.text(); if(text.length>100000)throw new AIError('คำขอยาวเกินกำหนด',413);
 try{return JSON.parse(text);}catch{throw new AIError('รูปแบบคำขอไม่ถูกต้อง',400)}
}
export function failure(error:unknown){return Response.json({error:error instanceof AIError?error.message:'บริการ AI ขัดข้อง ลองใหม่อีกครั้ง'},{status:error instanceof AIError?error.status:500,headers:{'Cache-Control':'no-store'}})}
