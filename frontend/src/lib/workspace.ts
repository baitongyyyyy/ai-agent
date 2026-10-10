export const agents = [
 {id:'mochi',name:'Mochi',breed:'Siamese',team:'Research',color:'#7870c6',emoji:'🐱',role:'ค้นคว้า · ตรวจสอบแหล่งข้อมูล'},
 {id:'atlas',name:'Atlas',breed:'British Shorthair',team:'Architect',color:'#43849a',emoji:'🐈‍⬛',role:'ออกแบบระบบ · วางโครงสร้าง'},
 {id:'pixel',name:'Pixel',breed:'Bengal',team:'Develop',color:'#b67c44',emoji:'🐈',role:'พัฒนา · ทดสอบงาน'}
];
export type Message = {id:string;channel:string;sender:string;text:string;time:string};
export type Step = {actor:string;title:string;status:'pending'|'running'|'done'|'failed';output:string};
export type Task = {id:string;title:string;target:string;status:string;steps:Step[];created:string;mode:'hosted'|'demo'|'api';knowledgeRevision?:string};
export type Settings = {mode:'hosted'|'demo'|'api';apiUrl:string;accessToken:string};
export const uid = () => crypto.randomUUID();
export const stamp = () => new Date().toLocaleTimeString('th-TH',{hour:'2-digit',minute:'2-digit'});
export function stepsFor(target:string):Step[] {
 const all = [{actor:'Mochi',title:'Research',status:'pending' as const,output:''},{actor:'Atlas',title:'Architecture',status:'pending' as const,output:''},{actor:'Pixel',title:'Implementation plan',status:'pending' as const,output:''},{actor:'Atlas',title:'Cross-check',status:'pending' as const,output:''}];
 if(target==='all')return all;
 const a=agents.find(a=>a.id===target);
 return [all.find(s=>s.actor===a?.name)!,{actor:target==='atlas'?'Pixel':'Atlas',title:'Cross-check',status:'pending',output:''}];
}
export function demoOutput(step:Step,title:string) {
 const intro=`ตัวอย่างขั้นตอนสำหรับ “${title}”\n\n`;
 if(step.title==='Research')return intro+'1. รวบรวม requirement และข้อจำกัด\n2. ระบุข้อมูลที่ต้องค้นเพิ่ม พร้อมแหล่งอ้างอิง\n3. แยกข้อเท็จจริงออกจากสมมติฐาน\n\nโหมดทดลอง: ยังไม่ได้ค้นเว็บหรือยืนยันข้อเท็จจริง';
 if(step.title==='Architecture')return intro+'แนวทางเบื้องต้น\n• แบ่ง UI, Application และ Infrastructure\n• กำหนด API contract ก่อนเริ่มพัฒนา\n• วางสถานะงานและการจัดการ error\n• กำหนด acceptance criteria ที่ตรวจสอบได้\n\nโหมดทดลอง: เป็นแม่แบบตัวอย่าง ยังไม่ใช่การออกแบบจาก AI';
 if(step.title==='Cross-check')return intro+'รายการตรวจสอบ\n□ ตรงกับ requirement ทุกข้อ\n□ ข้อมูลมีแหล่งอ้างอิง\n□ API และข้อมูลสอดคล้องกัน\n□ มีการทดสอบ happy path และ error path\n\nโหมดทดลอง: ยังไม่มีผู้รีวิวหรือการทดสอบจริง จึงต้องตรวจงานต่อ';
 return intro+'แผนพัฒนาตัวอย่าง\n1. สร้าง model และ service interface\n2. เชื่อม UI กับ API\n3. จัดการ loading / error / retry\n4. ตรวจ build และ acceptance criteria\n\nโหมดทดลอง: ยังไม่ได้สร้างโค้ดหรือรันการทดสอบ';
}
