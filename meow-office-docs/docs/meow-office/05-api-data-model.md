# API and data model

## Endpoints present in C# source
ทุก endpoint ยกเว้น health ต้อง `Authorization: Bearer <workspace token>`
| Method | Path | Purpose |
|---|---|---|
| GET | /health | process health เท่านั้น ไม่ยืนยัน provider พร้อม |
| GET | /api/agents | available role names |
| POST | /api/chats/message | target,message,history,knowledgeContext? → sender,text |
| POST | /api/tasks/run | id(UUID),goal,target,knowledgeContext? → run result |
| GET | /api/tasks | persisted task records (latest 200 หลัง materialize) |
| GET | /api/tasks/{id} | specific persisted task |
| POST | /api/tasks/{id}/approve | needs-review → completed |
| SignalR | /hubs/workspace | TaskUpdated; client subscribe ยังไม่ได้ทำ |

limits: message 8000 chars, goal 4000 chars; context 40000 chars; target all/mochi/atlas/pixel. duplicate task ID คืน 409, concurrency limit task runs 2, chat fixed window 30/minute; บาง malformed inputs/error paths ยังต้องทดสอบ/เสริม validation

```json
{"id":"5b58dc3a-c5fc-4ff5-a36b-5c6b6e489c9c","goal":"ออกแบบ task API","target":"all","knowledgeContext":"Repository snapshot and selected project documents..."}
```
Run result: id,title,target,status,steps[],createdAt. Step: actor,title,status,output. Request-bound run ไม่ใช่ durable background submission

## Current SQLite entity
TaskRecord: Id (PK), Title, Target, Status, StepsJson, CreatedAt. Startup เปลี่ยน running เดิมเป็น interrupted. EnsureCreated ใช้สร้าง schema ไม่ใช่ migration workflow
Chat history/doc snapshots ยังไม่ได้ persist ที่ server เป็นตารางเฉพาะ; context ส่งเข้าพร้อม request; UI task snapshot เก็บ repo SHA เมื่อแนบ docs แต่ server ยังต้องต่อยอด audit persistence

## Full target schema (proposed only)
| Table | Fields ที่เสนอ |
|---|---|
| users | id,name,email,role |
| workspaces | id,name,project_name |
| rooms | id,workspace_id,room_type,name,layout_config |
| agents | id,workspace_id,team_type,name,avatar_type,persona,default_model,status |
| agent_skills | id,agent_id/team_type,skill_code,config_json,version |
| chats | id,workspace_id,chat_type,room_id,task_id |
| messages | id,chat_id,sender_type,sender_id,message_type,content,created_at |
| tasks | id,workspace_id,title,description,created_by,assigned_team,assigned_agent,status,priority,parent_task_id |
| task_assignments | id,task_id,assignee_type,assignee_id,assigned_at |
| runs | id,task_id,orchestrator_agent_id,status,started_at,ended_at |
| run_steps | id,run_id,step_type,actor_agent_id,input_json,output_json,status,created_at |
| artifacts | id,task_id,run_id,artifact_type,title,content,file_url,source_commit_sha |
| reviews | id,task_id,source_artifact_id,reviewer_agent_id,review_type,result,comments |
| memories | id,workspace_id,team_type,key,summary,embedding/metadata |

## Proposed APIs not implemented
/api/workspaces, /api/rooms/{id}/presence, /api/agents/{id}/assign-task, /api/chats/{id}/messages, /api/tasks/{id}/start/review, /api/runs/{id}/steps, /api/skills/execute, /api/artifacts
อย่าเรียก endpoints จาก design เดิมโดยสมมติว่ามีแล้ว
