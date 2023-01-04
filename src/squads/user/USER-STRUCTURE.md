## Rules

## User Structure

```
  src/squads/user
├── USER-STRUCTURE.md
├── common
│   ├── constants:  const and enum
│   │
│   ├── types: include all types and interface in squads user, except types or interface of a component
│   │
│   └── utils: func helpers,...
│
├── components: global components reuse in squads user
│
├── hooks: global hooks in squads user
│
├── modules
│   ├── student-course
│   │
│   ├── student-detail
│   │   ├── components: HeaderStudentDetail, TabStudentDetail
│   │   │
│   ├── student-family
│   │
│   └── student-list
│
└── pages
    ├── Student
    │
    ├── Teacher
    │
    └── student-v2: detail.tsx, list.tsx
```
