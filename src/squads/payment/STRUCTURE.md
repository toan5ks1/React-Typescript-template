# Project structure

```
    payment

    │
    └─── common: files: types, utils, helpers, constants, ...
    │
    └─── components: components that gets reused throughout the module, usually made of one material components
    │
    └─── hooks: all the custom hooks in the module
    │
    └─── stores: store redux saga
    │
    └─── pages: Contains list main page components
    │       └─── MasterData: Contains the main page component, tests and | supporting components
    |               |
    │               └─── index.ts: contains module config
    │               |
    │               └─── contains folders of components that gets used only once in the main page component, usually made of multiple material
    │       |
    |       └─── OrderManagement: Similar to MasterData
    |               |
    │               └─── index.ts: contains module config
    |
    └─── test-utils: all mock tests and components support for testing
```
