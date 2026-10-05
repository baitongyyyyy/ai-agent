# Meow Office — Shared project knowledge

โฟลเดอร์กลางสำหรับ Ivy, Gee และ Meow ใช้อ้างอิง requirement, design, การใช้งาน และสถานะเดียวกัน

**ตรวจล่าสุด: 5 October 2026 (Asia/Bangkok)**

Upload status: prepared locally; GitHub integration rejected writes with 403 Resource not accessible by integration. No files have been committed to the canonical repository yet. Unzip the package and upload these paths, or grant the connector Contents write permission for the next attempt.

| เอกสาร | ใช้เมื่อ |
|---|---|
| [01-requirements.md](01-requirements.md) | อ่านความต้องการและ acceptance criteria |
| [02-product-design.md](02-product-design.md) | ออกแบบหน้าจอ ห้อง และ interaction |
| [03-architecture.md](03-architecture.md) | ทำความเข้าใจ React/C# และสถาปัตยกรรมเป้าหมาย |
| [04-agent-workflow.md](04-agent-workflow.md) | ตรวจการส่งงาน review และ Coordinator |
| [05-api-data-model.md](05-api-data-model.md) | ดู API/ข้อมูลที่มีจริง และ schema ที่ยังเป็นแผน |
| [06-user-guide.md](06-user-guide.md) | วิธีใช้ Demo, chat, tasks, artifacts และเอกสารร่วม |
| [07-setup-deployment.md](07-setup-deployment.md) | รันโค้ดและตั้งค่า AI |
| [08-current-status.md](08-current-status.md) | เช็คสิ่งที่ใช้งานได้ ข้อจำกัด และหลักฐาน |
| [09-roadmap-verification.md](09-roadmap-verification.md) | วางงานต่อและเกณฑ์ก่อนเปิดใช้จริง |
| [10-shared-knowledge.md](10-shared-knowledge.md) | วิธีให้ทั้งสามฝ่ายอ่าน repo เดียวกัน |
| [11-decisions.md](11-decisions.md) | เหตุผลและ trade-offs ของการตัดสินใจ |

`manifest.json` เป็นรายการไฟล์ที่ Meow โหลดให้อ่านและส่งเป็นบริบทได้ เอกสารนี้สรุปจากบทสนทนาและตรวจ source code ของ Meow ไม่ใช่ transcript ดิบ

ลำดับอ้างอิง: requirement ที่ Ivy ยืนยัน → source code/ผลทดสอบ → current status → design เป้าหมาย หากขัดกันให้รายงานความต่าง ห้ามเปลี่ยน planned เป็น implemented โดยไม่มีหลักฐาน

ข้อมูลใน GitHub เป็นไฟล์ร่วมกัน แต่ไม่ได้ทำให้ browser storage, chat history, DB หรือ memory ของ AI เชื่อมกันอัตโนมัติ Meow ต้องโหลดเอกสารก่อน และ AI mode ต้องมี backend ที่รองรับบริบท
