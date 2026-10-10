import {authorize,config,failure} from '@/lib/meow-server';
import {complete} from '@/lib/meow-ai.mjs';
export async function POST(request:Request){try{await authorize(request);await complete(config(),[{role:'user',content:'Reply with OK only.'}],request.signal);return Response.json({verified:true,message:'เรียก AI สำเร็จ พร้อมวิเคราะห์และสร้างผลลัพธ์'});}catch(e){return failure(e)}}
