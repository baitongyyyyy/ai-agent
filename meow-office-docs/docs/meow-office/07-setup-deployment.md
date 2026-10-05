# Setup and deployment

Source React/C# ดาวน์โหลดจาก **Download project** ในเว็บ Meow; repo นี้เก็บเอกสารกลางก่อน ไม่ได้ย้าย source deployment ทั้งชุดมาเป็น source-of-truth เดียวกัน

## Local frontend
Node 22+, `cd frontend`, `npm install`, `npm run dev`; localhost:5173
`npm run build` ตรวจ TypeScript แล้ว build Vite

## C# / Docker
copy .env.example → .env; ตั้ง LLM_MODEL, LLM_API_KEY, WORKSPACE_ACCESS_TOKEN (random 24+ chars), WORKSPACE_ALLOWED_ORIGINS
`docker compose up --build` จาก root ของ source bundle; backend localhost:5080
หรือใช้ SDK 8: `dotnet restore backend/MeowOffice.Api/MeowOffice.Api.csproj` แล้วตั้ง env แบบ double underscore และ `dotnet run --project backend/MeowOffice.Api --urls http://localhost:5080`

## Configuration
| Variable | Meaning |
|---|---|
| LLM__BaseUrl / LLM_BASE_URL | Chat Completions-compatible provider base URL |
| LLM__Model / LLM_MODEL | model ที่บัญชี provider รองรับ ต้องเลือกเอง |
| LLM__ApiKey / LLM_API_KEY | secret key server only |
| Workspace__AccessToken / WORKSPACE_ACCESS_TOKEN | workspace authentication secret |
| Workspace__AllowedOrigins / WORKSPACE_ALLOWED_ORIGINS | frontend origins คั่น comma |
| ConnectionStrings__Workspace | SQLite DB location |

ชื่อ double underscore ใช้กับ dotnet configuration; ตัวชื่อ uppercase single underscore ใช้ docker-compose substitution

## Hosted frontend / backend
Meow Site มีเฉพาะ React; C# ต้อง deploy แยกพร้อม HTTPS และ persistent DB volume
AllowedOrigins ใส่ `https://ivy-meow-office.nuttinee-kosa.chatgpt.site`; Settings ใส่ HTTPS backend URL
health=ok แค่ process health; ต้องทำ chat/run/provider smoke test ก่อนบอกว่าพร้อมใช้งานจริง

## Public repository boundary
repo baitongyyyyy/ai-agent เป็น public ณวันที่ตรวจ; อย่า commit .env, tokens, personal/customer data หรือ credentials. GitHub plugin ของ Gee เป็นสิทธิ์ของ session Gee ไม่ใช่สิทธิ์ Meow. ถ้าจะเปลี่ยน private ต้องทำ server-side GitHub App/connector ใหม่

Source backend ยังไม่มีผล compile/E2E ใน environment ของ Gee เนื่องจากไม่พบ dotnet/Docker; ต้องรันจริงตาม checklist และเก็บ evidence ก่อน production
