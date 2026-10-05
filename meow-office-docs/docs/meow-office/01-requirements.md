# Requirements

## เป้าหมายของ Ivy
สร้าง AI Team Collaboration Workspace บน React + C# ให้ Ivy สั่งงานง่ายเหมือนทำงานกับทีมคน มี office แบบ Gather Town, avatar แมวหลากสายพันธุ์, ห้อง chat กลุ่มและส่วนตัว และ review ข้ามทีมเพื่อลดข้อผิดพลาด

## ทีมและหน้าที่
| Agent | ทีม | หน้าที่ | Deliverables |
|---|---|---|---|
| Mochi / Siamese | Research | ค้นคว้า requirements, reference, ข้อจำกัด, fact-check | summary, comparison, sources, assumptions |
| Atlas / British Shorthair | Architect | structure, service boundary, API, DB, acceptance criteria | architecture, API contract, sequence, DB design |
| Pixel / Bengal | Develop | technical solution, implementation, tests | code plan, code, verification evidence |

Atlas เป็นจุดประสานงานที่เสนอไว้; Coordinator ที่แตกงานเองยังไม่ implement การให้ AI รีวิวช่วยลดข้อผิดพลาด ไม่รับประกันงานถูกทั้งหมด

## Functional requirements
| ID | Requirement | Acceptance criterion |
|---|---|---|
| FR-01 | Office และ avatar แมว | เปิด workspace เห็นสามทีมและเลือกสมาชิกได้ |
| FR-02 | เคลื่อนตัวละคร | คลิกพื้นหรือกด WASD/ลูกศรให้ตัวละคร Ivy เคลื่อน |
| FR-03 | Group/team/task/private chat | เลือกผู้รับและแสดง history ถูก channel; target ไม่หลุดขณะส่ง |
| FR-04 | สั่งงานคน/ทีม/ทั้งหมด | ระบุ target ชัดเจน มี task ID และสถานะ |
| FR-05 | Coordinator | รับ goal ครั้งเดียว แตก subtasks, owner, dependencies, reviewers และรวมผล |
| FR-06 | Cross-check | ผู้สร้างกับ reviewer คนละบทบาท; review fail มี feedback/revision |
| FR-07 | Artifacts | เปิดผลแยกขั้นตอนและ export ได้ |
| FR-08 | Timeline/audit | แสดง actor, status, evidence, timestamps และ source versions |
| FR-09 | Shared documents | Ivy/Gee/Meow อ่าน docs/meow-office ที่ revision ระบุได้ |
| FR-10 | Skill configuration | รองรับ skill registry/version/model/workflow policies |
| FR-11 | Real work | อ่าน repo, research tools, generate files, isolated execution, test evidence, PR |
| FR-12 | Cancellation/recovery | หยุดได้และไม่ทิ้งสถานะ running; restart/reconnect มี reconciliation |

## ข้อกำหนดการใช้งาน
- น่ารัก สงบ ใช้งานง่าย; พื้นที่ทำงานเป็นหน้าหลัก ไม่ใช่หน้าโฆษณา
- ใช้งาน desktop/mobile และ keyboard ได้ ข้อความไทยอ่านง่าย
- ต้องแสดง Demo/AI และข้อจำกัดอย่างชัดเจน ห้ามแสดงว่า AI/search/build/test ผ่านเมื่อยังไม่ได้ทำ
- secrets อยู่ server; GitHub repository นี้เป็น public จึงใส่เฉพาะข้อมูลโปรเจกต์ที่เผยแพร่ได้
- ใช้ pstack/poteto-mode หรือ alternative ตามสมควร แต่ต้องตรวจความเข้ากันได้ก่อน integration จริง

ขอบเขตเดิมทุกข้อยังคงเป็นเป้าหมาย ดู implementation gap ใน [current status](08-current-status.md)
