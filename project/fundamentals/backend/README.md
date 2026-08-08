# IAM backend

Express + Mongoose backend: authentication with rotating JWTs, role
hierarchy, and RBAC middleware.

## Setup

```bash
cp .env.example .env    # fill in real secrets
npm install
npm run seed             # creates Viewer -> Editor -> Admin -> SuperAdmin
                          # and a superadmin / ChangeMe123! login
npm run dev
```

## How auth works

- `POST /api/auth/login` — verifies credentials, returns a short-lived
  access token in the JSON body, and sets a long-lived refresh token as an
  httpOnly cookie (scoped to `/api/auth` only).
- `POST /api/auth/refresh` — reads the refresh cookie, rotates it (old one
  revoked, new one issued in the same "family"), returns a new access
  token. If a *revoked* token is ever presented again, the whole family is
  killed and the user must log in again — that's the theft-detection part
  of rotation.
- `POST /api/auth/logout` — revokes the current refresh token.
- Access tokens carry `roles` and a flattened `permissions` array resolved
  from the role hierarchy at issue time (see `src/utils/permissions.js`).

## Role hierarchy

A role can set `parentRole`. Effective permissions = the role's own
permissions unioned with every permission in its parent chain. Seeded
example: `Viewer -> Editor -> Admin -> SuperAdmin` (SuperAdmin has `"*"`,
which `hasPermission()` treats as all-access).

## Frontend integration notes

- Your `api/axios.js` should send `withCredentials: true` so the refresh
  cookie round-trips, and attach `Authorization: Bearer <accessToken>` from
  wherever you keep the access token (memory / Zustand store, not
  localStorage, since XSS could read it).
- Add a response interceptor: on a 401 from a protected route, call
  `POST /api/auth/refresh` once, update the stored access token, and retry
  the original request. If refresh also fails, redirect to `/login`.
- `UserAddModal.jsx`'s roleIds should be populated from `GET /api/roles`
  instead of the hardcoded list once you wire this up -- the seeded roles'
  `slug` fields (`admin`, `editor`, `viewer`) already match what the modal
  currently hardcodes.

## Profile picture uploads

`POST /api/users` accepts `multipart/form-data` (not JSON) so it can carry
an `avatar` file alongside the text fields, matching `UserAddModal.jsx`'s
`FormData` submission:

- `multer` (`src/middlewares/upload.js`) validates the file is an image,
  caps it at 2MB, and writes it to `uploads/avatars/<random-hash>.<ext>`.
- The saved path becomes `User.avatarUrl`, e.g. `/uploads/avatars/ab12....jpg`.
- `app.js` serves that folder statically at `/uploads`, so the frontend can
  render `<img src={\`${API_ORIGIN}${user.avatarUrl}\`} />` directly.
- If validation fails *after* the file is already written (bad username,
  duplicate email, etc.), the controller deletes the orphaned file so
  `uploads/avatars/` doesn't accumulate junk.
- This is local-disk storage, fine for development. For production, swap
  `multer.diskStorage` for `multer-s3` (or similar) pointed at your bucket
  — the rest of the flow (validation, `avatarUrl` field, static serving)
  stays conceptually the same.
