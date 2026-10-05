# Architecture

## Current source structure
```text
frontend/src/
  pages/WorkspacePage.tsx
  components/workspace/OfficeMap.tsx
  components/ui/
  lib/workspace.ts
  lib/knowledge.ts
  hooks/use-mobile.ts
  styles.css
backend/MeowOffice.Api/
  Domain/Models.cs
  Application/TaskOrchestrator.cs
  Infrastructure/WorkspaceDb.cs
  Infrastructure/LlmClient.cs
  Hubs/WorkspaceHub.cs
  Program.cs
```
โฮสต์ Meow ใช้ React บน Vinext/Vite (`app/page.tsx`); ZIP มี standalone React + Vite ด้วย UI เดียวกัน Site hosting รัน C# ไม่ได้ ต้อง deploy backend แยก

## Current flow
React → C# HTTP API → LLM provider (Chat Completions compatible)
TaskOrchestrator → worker role → reviewer role → optional revision/re-review → SQLite → HTTP result
SignalR emits TaskUpdated แต่ frontend ยังไม่ subscribe
GitHub docs → read-only frontend loader → selected document snapshot → request.knowledgeContext → prompts ของ C# backend รุ่นใหม่

Chat/messages/tasks UI อยู่ localStorage; API task records อยู่ SQLite จึงยังไม่ใช่ unified persistence หรือ multi-device chat

## Target architecture
Modular monolith: Workspace, Chat, Tasks, Agents, Runs, Skills, Artifacts, Reviews, Memory. แยก Worker/isolated action layer เมื่อเพิ่ม execution จริง
FE ที่เสนอ: React/TypeScript, Tailwind/AntD, TanStack Query, Zustand, React Router, SignalR, react-konva หรือ Phaser
BE ที่เสนอ: .NET 8, EF Core/PostgreSQL, SignalR, MediatR, Redis, BackgroundService/Hangfire; RabbitMQ หากจำเป็น

รายการข้างบนเป็นคำแนะนำจาก design เดิม ปัจจุบันไม่ได้ใช้ AntD, TanStack Query, Zustand, Konva, Phaser, Redis, PostgreSQL, Hangfire, RabbitMQ หรือ MediatR ทั้งหมด

## Production boundaries
Backend จำเป็นสำหรับ secrets/model calls; durable worker queue จำเป็นหากต้องทำต่อหลังปิดเว็บ; repo actions ต้องแยก sandbox, permissions, audit และ verification
GitHub plugin ของ Gee ไม่ได้ถูกส่งให้ Meow อัตโนมัติ Meow รุ่นนี้อ่านเฉพาะ docs public ผ่าน loader ไม่ได้มี token สำหรับเขียน repo
