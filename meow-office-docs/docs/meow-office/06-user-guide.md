# User guide

เว็บ: https://ivy-meow-office.nuttinee-kosa.chatgpt.site

## Demo
เปิด Office → คลิกแมวเพื่อคุยส่วนตัว หรือ All team → พิมพ์ข้อความ; คำตอบเป็น template ตัวอย่าง
สร้างงาน: `/task ออกแบบระบบแจ้งเตือนด้วย React + C#` หรือพิมพ์ goal แล้วกดสร้างงาน
`/poteto-mode ...` เป็น alias เดียวกัน ไม่ใช่ plugin execution
เปิด Task board → task → Task/Artifacts → Download .md
Demo จบด้วย Needs review เพื่อให้ตรวจตัวอย่างเอง; “ฉันตรวจและอนุมัติงานแล้ว” เป็นการอนุมัติของ Ivy ไม่ใช่ test result

## Shared documents
คลิก **Project docs** → **โหลดเอกสารล่าสุด** → เห็น revision ของ repo และเลือกไฟล์เพื่ออ่าน
ติ๊ก **ใช้เอกสารชุดนี้กับ AI** เมื่อโหลดครบและต้องการส่ง context นี้พร้อม chat/task
อ่านจาก snapshot ของ commit เดียว ไม่ผสมไฟล์จาก main ที่อาจเปลี่ยนกลางคัน; โหลดใหม่เมื่อมีการแก้ docs
เมื่อ network/GitHub limit ล้มเหลว แสดง error และไม่รายงานว่า sync สำเร็จ
Demo อ่านเอกสารได้ แต่ไม่ reasoning จากเอกสาร; AI mode ส่งบริบทได้ต่อเมื่อใช้ backend เวอร์ชันที่รับ knowledgeContext

## AI mode
Settings → AI → backend HTTPS URL (สำหรับ hosted site) → workspace access token ที่ backend ตั้งไว้
LLM provider key/model ต้องอยู่ backend ดู [setup](07-setup-deployment.md)
All team chat ให้ Atlas ตอบ; all-team task รันสามบทบาท fixed sequence พร้อม review ไม่ได้แตกงานแบบ Coordinator
AI ตัวนี้ยังไม่มี live browsing/repo execution จึงอย่าสั่งแล้วเข้าใจว่าแก้ไฟล์หรือ run test ให้แล้ว

## Troubleshooting
- ตอบ template: ยังอยู่ Demo
- 401: workspace token ไม่ตรง/รีเฟรชหน้าแล้ว token ถูกล้าง
- 503: LLM key/model/config ยังไม่ครบ
- 502: provider/LLM request มีปัญหา ต้องตรวจ backend
- fetch/CORS: hosted HTTPS ติดต่อ localhost HTTP ไม่ได้; deploy backend HTTPS และ allow frontend origin
- 429: rate/concurrency limit ถึงแล้ว
- รีเฟรชแล้วไม่เห็นงานอีกเครื่อง: UI localStorage ยังไม่ sync กับ SQLite/chat history
- เอกสารโหลดไม่ได้: repo private/ไฟล์หาย/network หรือ GitHub API rate limit; ใช้ repo link อ่านเองจนแก้ connection
