# Roadmap and verification

## Phase 1: usable AI planning workspace
Deploy C# backend, provider credentials, health + real chat + all-team task/review smoke tests. Add connection readiness display (not just mode). Store/reload server tasks and history. Verify docs context actually reaches model.

## Phase 2: real Coordinator
Atlas makes plan/subtasks/owners/dependencies/reviewers, schedules independent work, final synthesis, budget/timeout/retry bounds. Preserve task/step IDs and exact evidence/source revision. Add skill registry and memory scope.

## Phase 3: action layer
Read repo → propose edits → isolated checkout/container → change files → build/tests → artifact/diff → reviewer → PR. GitHub App permissions narrow to repo/paths; execution policy and user approval per action. Add reliable queue and recovery before long unattended tasks.

## Verification checklist
| Test | Expected evidence |
|---|---|
| frontend build/typecheck | exit 0, artifact/version |
| backend build | dotnet build/Docker publish exit 0 |
| no token / wrong token | 401 |
| missing model/key | visible error; no fake successful task |
| valid chat | provider result and correct selected actor |
| all-team run | each worker output + separate reviewer |
| review false/invalid JSON | bounded revision then needs-review if unresolved |
| duplicate UUID | 409 without second provider workflow |
| stop/restart | cancelled/interrupted, no phantom running |
| shared docs load | all files same SHA; failed load not marked ready |
| docs context | model references supplied requirement with correct revision |
| refresh/another device | server state reconciles (future requirement) |
| repo write | no secrets; exact authorized diff + tests + PR |

Do not mark production ready from a successful frontend build alone. AI reviewers cannot substitute for execution checks. Remaining decisions: provider/model/budget, C# hosting, source repo migration, worker queue, repo connector permissions, conflict resolution and retention.
