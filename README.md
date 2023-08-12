# Folder structure

- Role based operations are separated into respective folders.
- like admin related task are structure in admin folder (controller, models)

# API end point

**/api/auth/register -> POST**

```json
{
  "username": "",
  "email": "",
  "password": "",
  "role": ""
}
```

---

**/api/auth/login -> POST**

```json
{
  "email": "",
  "password": "",
  "role": ""
}
```
