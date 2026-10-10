import {authorize,config,failure} from '@/lib/meow-server';
import {configuration} from '@/lib/meow-ai.mjs';
export async function GET(){try{await authorize();return Response.json(configuration(config()),{headers:{'Cache-Control':'no-store'}})}catch(e){return failure(e)}}
