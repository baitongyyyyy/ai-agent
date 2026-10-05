# Decisions

| ID | Decision | Status | Reason / trade-off |
|---|---|---|---|
| ADR-01 | Start with modular monolith | Target | simpler coordination/deployment than early microservices |
| ADR-02 | MVP UI uses React/CSS + emoji avatars | Implemented | fast usable prototype; not full Gather engine or breed sprites |
| ADR-03 | Chat/planning before repo execution | Implemented boundary | execution/verification/tool permissions need separate action layer |
| ADR-04 | SQLite for backend MVP | Source exists | small setup; differs from original PostgreSQL plan |
| ADR-05 | Separate reviewer role and bounded revision | Source exists | fail closes to needs-review; cannot guarantee no mistakes |
| ADR-06 | Atlas as Coordinator-facing persona | Proposed | current group responder; dynamic planner remains future work |
| ADR-07 | GitHub docs as common source | Added 5 Oct | Ivy/Gee/Meow can reference same revision; no automatic shared memory |
| ADR-08 | Public read-only snapshot loader | Added source 5 Oct | no frontend token; private repo/read/write integration must be redesigned |
| ADR-09 | User opt-in selected snapshot as AI context | Added source 5 Oct | make source/version visible and avoid implicit data sharing |
| ADR-10 | No real pstack integration yet | Current limitation | command alias only; plugin compatibility not verified |

When changing a decision, record date, problem, alternatives, chosen option, consequences and implementation/verification state. Do not confuse original recommended libraries/tables/APIs with delivered implementation.
