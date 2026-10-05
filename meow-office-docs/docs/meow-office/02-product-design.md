# Product / UX design

## Visual direction
Cozy pastel cat office, clean productivity surface. ทีม Research ใช้ฟ้า/ม่วง, Architect ใช้เทาอมฟ้า, Develop ใช้โทนมิ้นต์/ส้ม สิ่งสำคัญคือคนใช้สั่งงานและติดตามสถานะได้ง่าย

## Workspace layout
- Top bar: workspace/project, settings, new task
- Left navigation: office, task board, artifacts, agents, team chat, mode
- Main canvas: ห้อง Research, Architect, Develop, Huddle/cross-check และ coffee corner
- Right panel: Chat / Task / Artifacts; input ด้านล่าง พร้อม target
- Mobile: sidebar เป็น icon rail และ chat เป็น panel เปิด/ปิดได้

## Target rooms and screens
Lobby, Research room (books/references), Architect room (blueprints), Develop room (terminal), Meeting room (cross-check)
หน้าที่วางไว้: Workspace, Team Room, Task Detail, Artifact, Run Timeline/Audit, Settings/Skill Config
MVP ปัจจุบันใช้ workspace view เดียวและ panel/state switches; ยังไม่มี routes สำหรับทุกหน้าที่วางไว้

## Interactions
คลิกแมว → private chat; All team → team chat; `/task` หรือสร้างงาน → workflow; task card → steps; Artifacts → outputs/export; Settings → mode/backend/token; Documents → โหลดเอกสารกลางและเปิดไฟล์จาก repo

## Avatar/status target
Idle, Thinking, Researching, Designing, Coding, Reviewing, Waiting for approval; movement/animations ควรผูกกับ activity จริง
ปัจจุบันใช้ emoji แทน avatar แต่ละ breed และ UI movement ของ Ivy ไม่มี physics/collision/multiplayer presence ห้องไม่ได้เปลี่ยนที่จริงตามงาน และข้อความ online/available เป็น UI state ไม่ใช่ backend presence evidence

## Acceptance for future design
- คลิก agent ต้องไม่ทำให้คำสั่งที่ส่งแล้วเปลี่ยนผู้รับ
- review failure/error ไม่ใช้สีเดียวกับ success
- modal รองรับ focus/keyboard; sidebar/tab/select ใช้ accessibility primitives
- Demo results แสดงเป็น examples; AI review completion แยกจาก executed verification
