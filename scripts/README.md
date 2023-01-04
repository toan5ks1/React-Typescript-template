# When run BE in local, you should create account to login to CMS

## SQL script for 2 accounts:

-   School admin thu.vo+school@manabie.com / 123123

Run script to connect to DB

```
kubectl port-forward svc/postgres-infras -n emulator 5432
```

## To import Hasura metadata in local

Before, you should move your certificate into our project and naming local-cert.crt

run

```
yarn import-metadata:local
```
