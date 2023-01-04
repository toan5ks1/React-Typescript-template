# Micro front-ends: USER PROFILE Contract

## Involves

---

owner: "user"
users: [adobo, payment]

---

___key: detail
## Details

Because user team now in-charge of all user related information, to allow other team to easily access user information (for authorization, show in appbar,…), user team exposes some general APIs for getting user information (user token, user profile, refresh token).

### Interfaces

```ts
// expose via __MANA__.auth
window.__MANA__.auth = {
  getUserToken(force: boolean = false): Promise<token | null>{}
  getUserProfile(): Promise<UserProfile | null>
}

interface UserProfile {
  user_id: string;
  name: string;
  schools: string[];
}

```

Explanation

```ts
getUserProfile: Return user profile (awaitable)
getUserToken: Return user token (awaitable), pass "force = true" will force refresh token
```

## Executions

### Rollout plan

PIC: @Quang Khai Nguyen (for example)

1. Provide typescript interfaces to mana-packs/<user-packages> (expected: 15/04/2022)
2. Implementation details (expected: 30/04/2022)
3. Deployment: (expected: 05/05/2022)
4. Support for integration (from 30/04/2022)

### Deprecated plan

Breaking changes:

-   Announce to all teams beforehand.
-   Deprecated fields are kept for at least 1.5 months.
-   Track deprecated field calls to see if they are used or not before the removal. Using Proxy - JavaScript | MDN . Example metric name: user*deprecated_auth*<field-need-to-track>

### Related and notes

@Thu Vo @Pham Xuan Sang … (for demo)

Leave ideas and contributions in the comments.
