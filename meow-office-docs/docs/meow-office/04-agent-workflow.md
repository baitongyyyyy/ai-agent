# Agent workflow

## Single agent target loop
Understand → Context → Plan → Act → Observe → Verify → Reflect
Team เพิ่ม Delegate/Handoff โดยส่ง goal, inputs, expected output, acceptance criteria และ evidence ให้ผู้รับ

## Implemented AI workflow (source, ยังไม่ verified end-to-end)
1. เลือก all หรือ mochi/atlas/pixel
2. all ใช้ fixed sequence: Mochi → Atlas → Pixel; specific target ใช้บทบาทเดียว
3. เรียก LLM พร้อม goal, prior team output และ shared-document context ถ้ามี
4. Reviewer: Mochi → Atlas, Atlas → Pixel, Pixel → Atlas
5. reviewer คืน JSON `{pass:boolean, comments:string}`
6. fail → revise 1 รอบ → re-review 1 รอบ; invalid JSON ถือว่าไม่ผ่าน
7. ทุก verdict ผ่าน → completed; มีไม่ผ่าน → needs-review
8. Ivy ตรวจ/อนุมัติ needs-review ได้; cancellation/exception บันทึก cancelled/failed

Demo ใช้ steps/template ใน TypeScript ไม่ได้เรียกโมเดล; จำนวน steps ใน Demo ไม่จำเป็นต้องเท่ากับ AI workflow

## Coordinator target (ยังไม่ implement)
Ivy สั่ง goal กับ Atlas → classify → เลือกทีมที่เกี่ยวข้อง → แตก subtasks → dependencies → independent work ที่ทำ parallel ได้ → review → merge/summarize
Subtask contract: id, parentTaskId, goal, assignee, inputs, dependencies, expectedArtifacts, acceptanceCriteria, reviewer, status, evidence
Atlas ใน group chat ตอนนี้ตอบตาม persona Architect ไม่มี dynamic delegation/planning engine/final synthesis จริง

## Review versus verify
LLM review คือการตรวจ reasoning/consistency; verification คือหลักฐานจาก environment เช่น executed build/test/API/DB checks ต้องแสดงแยกกัน ไม่ใช้ confidence เป็นหลักฐานทดแทน

## Proposed modes/skills
Auto: release เมื่อ acceptance/evidence/review ผ่าน; Human approval: Ivy อนุมัติ; Critical: อย่างน้อย 2 independent reviews และ executed checks
Skill registry ที่เสนอ: skillCode, team, description, promptTemplate, inputSchema, outputSchema, version
`/poteto-mode` ตอนนี้เป็น command alias ของ create task ไม่ได้ติดตั้ง/เรียก Cursor pstack plugin; ลิงก์ต้นแบบ https://github.com/cursor/plugins/tree/main/pstack ยังไม่ได้ตรวจความเข้ากันได้
