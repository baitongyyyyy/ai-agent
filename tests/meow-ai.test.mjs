import test from 'node:test';
import assert from 'node:assert/strict';
import {configuration, complete, parseReview, instructions, DEFAULT_MODEL} from '../lib/meow-ai.mjs';
const config={OPENAI_API_KEY:'fake-test-secret',OPENAI_MODEL:'test-model'};
const ok=text=>async()=>Response.json({choices:[{finish_reason:'stop',message:{content:text}}]});
test('missing server credentials never calls provider',async()=>{
 assert.deepEqual(configuration({}).missing,['OPENAI_API_KEY']);
 assert.equal(configuration({OPENAI_API_KEY:'fake-test-secret'}).model,DEFAULT_MODEL);
 await assert.rejects(complete({},[],undefined,()=>{throw new Error('must not call')}),{status:503});
});
test('provider request uses server model and returns actual content',async()=>{
 const result=await complete(config,[{role:'user',content:'hello'}],undefined,async(url,options)=>{
  assert.equal(url,'https://api.openai.com/v1/chat/completions');
  assert.equal(options.headers.Authorization,'Bearer fake-test-secret');
  assert.equal(JSON.parse(options.body).model,'test-model');
  return Response.json({choices:[{finish_reason:'stop',message:{content:' real analysis '}}]});
 }); assert.equal(result,'real analysis');
});
for(const status of [400,401,403,404,429,500])test(`provider ${status} is sanitized`,async()=>{
 await assert.rejects(complete(config,[],undefined,async()=>new Response('fake-test-secret private debug',{status})),e=>!e.message.includes('fake-test-secret')&&e.status>=400);
});
test('network and cancellation errors are distinct',async()=>{
 await assert.rejects(complete(config,[],undefined,async()=>{throw Error('secret debug')}),{status:504});
 const controller=new AbortController();controller.abort();
 await assert.rejects(complete(config,[],controller.signal,async()=>{throw Error('abort')}),{status:499});
});
test('empty and truncated model answers do not become successful work',async()=>{
 await assert.rejects(complete(config,[],undefined,ok('')));
 await assert.rejects(complete(config,[],undefined,async()=>Response.json({choices:[{finish_reason:'length',message:{content:'partial'}}]})));
});
test('review requires explicit boolean and feedback, preserves rejection',()=>{
 assert.deepEqual(parseReview('{"pass":false,"feedback":"Missing validation"}'),{pass:false,feedback:'Missing validation'});
 assert.equal(parseReview('```json\n{"pass":true,"feedback":"Complete"}\n```').pass,true);
 for(const text of ['Looks good','{"pass":"true","feedback":"ok"}','{"pass":true}'])assert.throws(()=>parseReview(text));
});
test('role prompts bound repository context and tool capability',()=>{
 assert.match(instructions('Pixel','untrusted text'),/Develop/);
 assert.match(instructions('Mochi'),/ไม่มีเครื่องมือค้นเว็บ/);
 assert.match(instructions('Atlas','untrusted text'),/<reference>\nuntrusted text\n<\/reference>/);
});
test('cancelled response cannot turn into a successful result',async()=>{
 const controller=new AbortController();controller.abort();
 await assert.rejects(complete(config,[],controller.signal,ok('late answer')),{status:499});
});
