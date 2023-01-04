## Syllabus

### Hi guys, welcome to an aged squad

### Syllabus structure

```
    project
    │   docs
    │   │
    │   └─── syllabus: what you need to know
    │        │
    │        └─── diagrams: summarize logic coding flow
    └───src
    │   │
    │   └─── squads
    │        │
    │        └─── syllabus
    │             │
    │             └─── components: small component to re-used
    │             │
    │             └─── context: some contexts
    │             │
    │             └─── hooks: custom hooks
    │             │ 
    │             └─── providers: config provider Syllabus  
    │             │
    │             └─── pages
    │                  │
    │                  └─── Assigment
    │                  │
    │                  └─── Book
    │                  │
    │                  └─── Course
    │                  │
    │                  └─── Flashcard
    │                  │
    │                  └─── LO
    │                  │
    │                  └─── Quiz
    │                  │
    │                  └─── StudyPlan
```

## Book

#### Book has a nested list inside

> Chapter 
>
>> Topic
>> 
>>> Learning Objective (LO)
>>>> 
>>>> Multiple Choice Question
>>>>
>>>> Fill In The Blank Question
>>>>
>>>> Manual Input Question
>>>>
>>>> Multiple Answer Question
>>>>
>>> Flashcard
>>>
>>>> Term and Definition Question
>>>>
>>> Assignment
>>>
>>> Offline Study

### Diagrams

## Study Plan

#### From now, we have 2 versions

- Version 1 (Old): Using study plan by import CSV file

- Version 2 (Implement): Changing CSV to UI to use easily

#### Two main features

- **Master study plan**: Apply for all students in a course

- **Individual study plan**: Apply specifically for each student in a course

### Diagrams

| Feature | File | Name |
| :------ | :------ | :------ |
| **Master study plan** |  |  |
| **Individual study plan** | [individual-study-plan-list.plantuml](../syllabus/diagrams/individual-study-plan-list.plantuml) | [Individual study plan list](http://www.plantuml.com/plantuml/umla/ZPHVQzim5CNVzIdEki4IqvQnHuTkPNqOWNNi3-mbXA3QrxQ88ddwiywKVlTPYXEiRiwg9-5xx--USn2-jeuRvtUInGlBFseuZQKgnIzHUYxntVcomnV9rO8PQedtJGMN4ZyzcGvPTgEziHJQI3dxILZtussMpLuLyVj6bFC5KzeHZAWRnm1jIZARkox7Gs5w7fKRxlAIRF78WAl-C233DtBUA300k2Z6IvQbpM6T4QfUhHcf4e7FW4gRRUnF5HwqtNBLzSgUidfz0283ageWCTqV5TXzV_2NOqpy6hQiphmbOy_MiVs99F2Q2pKjB4OS4fvIU8uaJI39yt-93fbEkegh4r-feC7W4C0cZcpQKEtj9cR3DHXckRU4HkjjRx8sshT7ueTksD7R74LwZaH9ycG6vRUytJSXxeRJ85uq62ZFy7VSdMFrm70uzf3puL4j_gfzvZkQg9v8RwaglLeV-nz7RrLKc6NPlzLTIbArQx8CBwwky6OErv32p1bFyyWwDRnIwykaSfgsFozRBgasH2e_13WOVsr7cSFnEqbxFoGjOLPnQP-3mRrmZVPk2gPAKR44ES6ZNUkwyQXrkbsm21X-JxXlXEn1Dr8KMsW5HRyTMbuJX0hkz-Flvn0Miuxid5syKth10efTzoY_aty0) |