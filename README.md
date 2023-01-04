# School portal

## Project structure

```
    project
    │   tsconfig.json
    │
    └───src
    │   │
    │   └─── assets: icons, images, ...
    │   │
    │   └─── components: small component to re-used
    │   │
    │   └─── constants: declare constant for project
    │   │
    │   └─── context: some contexts
    │   │
    │   └─── hooks: custom hooks
    │   │
    │   └─── internals: create internal packages use inside project
    │   │
    │   └─── models: structure of entities
    │   │
    │   └─── packages
    │   │
    │   └─── pages: react-admin router
    │   │
    │   └─── providers: config provider for app
    │   │
    │   └─── services: connect with hasura, BE
    │   │
    │   └─── store: redux store
    │   │
    │   └─── styles: custom theme
    │   │
    │   └─── typings: config common types, interfaces
    │   │
    │   └─── utils: errors code, helper function, timezone
    │   │
    │   └─── ...
```

## Naming convention in our product

-   camelCase: i18n, variable

-   Pascal Case: enum, components

-   data-test-id: http://getbem.com/naming/

```
Example:
- ProviderTypes, Entities
- BookList.tsx, DataPicker.tsx
```

-   kebab-case: other filenames in src

```
Example: ra-auth.ts
```

-   snake_case: naming file of features

-   BEM - Block Element Modifier: define data-testid in component

```
 Example: Expander__name
```

## Organize import

1. React
2. Package
3. Component
4. Hook
5. Model/Const/Util

## Before run

1. Setup GITHUB_TOKEN.

-   Create a new [PERSONAL ACCESS TOKEN](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token) with these recommended scopes:
    ![PAT Scopes](./docs/pat-scopes.png)

-   Open file `~/.bashrc` or `~/.zshrc` and export your token then close and save the file.

    ```
    export GITHUB_TOKEN='YOUR_PERSONAL_ACCESS_TOKEN'
    ```

-   Use the `source` command to apply the changes
    -   With bash:
    ```
    source ~/.bashrc
    ```
    -   With zsh:
    ```
    source ~/.zshrc
    ```

2.  Add config if you run outside docker

-   ```
    git config --global url."https://${GITHUB_TOKEN}:x-oauth-basic@github.com/".insteadOf git@github.com: \
    && git config --global url."https://".insteadOf git://
    ```
-   ```
    git config --global --add url."https://${GITHUB_TOKEN}:x-oauth-basic@github.com/manabie-com".insteadOf "https://github.com/manabie-com"
    ```

-   Verify at ~/.gitconfig has added configs:

    ```
    [url "https://YOUR_PERSONAL_ACCESS_TOKEN:x-oauth-basic@github.com/"]
        insteadOf = git@github.com:
    [url "https://"]
        insteadOf = git://
    [url "https://YOUR_PERSONAL_ACCESS_TOKEN:x-oauth-basic@github.com/manabie-com"]
        insteadOf = https://github.com/manabie-com
    ```

3.  Add .env file. Please take a look at `MANABIE-ENV.md` to get a example

## Build Setup

1. Run on your machine

```bash
# install dependencies
$ yarn

# serve with hot reload at localhost:3001
$ yarn start

# build for staging green and launch server
$ yarn build
$ yarn deploy:staging

2. Run on docker

```bash
# install all
$ make all

# to start server -> will run localhost:30001
$ make run-app

# exec -it to service
$ make exec-service

# run test unit
$ make test-unit

# destroy all
$ make destroy

```

Note: only run test on Manabie environment

# Micro frontend

## Build structure

```mermaid
graph TD
    IMD[Import map deployer] --> |Build| build-syllabus-20220520.1(Build syllabus-20220520.1)
    IMD[Import map deployer] --> |Deploy: upload new importmap for syllabus-20220520.1| IM[Import map file]
    build-syllabus-20220520.1(Build syllabus-20220520.1) --> |upload assets into bucket| syllabus20220520.1[Image: syllabus-20220520.1]
    manabie[manabie]--> index.html[index.html]
    manabie[manabie]--> IM[Import map file]
    manabie[manabie]--> syllabus[syllabus]
    manabie[manabie]--> lesson[lesson]

    syllabus[syllabus] --> syllabus20220520.1[Image: syllabus-20220520.1]
    syllabus[syllabus] --> syllabus20220520.2[Image: syllabus-20220520.2]
    syllabus20220520.1[Image: syllabus-20220520.1] --> syllabusStaticAssets1JSCSS[JS, CSS files]
    syllabus20220520.1[Image: syllabus-20220520.1] --> syllabusStaticAssets1Image[Image files]
    syllabus20220520.2[Image: syllabus-20220520.2] --> syllabusStaticAssets2JSCSS[JS, CSS files]
    syllabus20220520.2[Image: syllabus-20220520.2] --> syllabusStaticAssets2Image[Image files]


    lesson[lesson] --> Lesson20220520.1[Image: lesson-20220520.1]
    lesson[lesson] --> Lesson20220520.2[Image: lesson-20220520.2]
    Lesson20220520.1[Image: lesson-20220520.1] --> LessonStaticAssets1JSCSS[JS, CSS files]
    Lesson20220520.1[Image: lesson-20220520.1] --> LessonStaticAssets1Image[Image files]
    Lesson20220520.2[Image: lesson-20220520.2] --> LessonStaticAssets2JSCSS[JS, CSS files]
    Lesson20220520.2[Image: lesson-20220520.2] --> LessonStaticAssets2Image[Image files]
```
