# Plan: Landing Híbrida + Email Verification

## Rama de trabajo
`feature/lading-hybrid`

---

## Principios transversales

| Principio | Aplicación |
|---|---|
| **SRP** | Cada componente/hook tiene una sola razón para cambiar |
| **Clean Code** | Sin lógica en LandingPage, sin prop drilling, sin `any` |
| **Modularidad** | Cada sección es un componente independiente e importable |
| **Escalabilidad** | Datos de config en archivos separados, no hardcodeados en JSX |

---

## Estructura de carpetas resultante

```
src/
  components/
    landing/               ← NUEVA
      HeroSection.tsx      — CTA condicional según auth
      InteractiveDemo.tsx  — UI del demo (solo render)
      FocusSection.tsx     — 3 bloques de valor (solo render)
      CTASection.tsx       — Banner final de conversión
  hooks/
    useDemo.ts             ← NUEVO — lógica aislada del demo
  lib/
    landingData.ts         ← NUEVO — config array de Focus items
  types/
    landing.ts             ← NUEVO — DemoTask, FocusItem
  pages/
    LandingPage.tsx        — Shell: solo compone secciones
    VerifyEmailPage.tsx    — (Phase 3) validación de token
```

---

## Phase 1 — Routing Refactor

**Objetivo**: hacer `/` pública y mover la app a `/tasks`.

| Archivo | Cambio |
|---|---|
| `src/App.tsx` | `/` → `LandingPage` (pública); `/tasks` → `TasksPage` (protegida) |
| `src/contexts/AuthContext.tsx` | `navigate('/')` → `navigate('/tasks')` post-login/register |
| `src/components/auth/ProtectedRoute.tsx` | redirect destino → `/tasks` |

**Criterio de éxito**: acceder a `/` sin token no redirige; acceder a `/tasks` sin token sí redirige.

---

## Phase 2 — LandingPage

### Regla de diseño
`LandingPage.tsx` es un **coordinador puro**: no tiene `useState`, no llama hooks de negocio, solo ensambla las secciones.

```tsx
// src/pages/LandingPage.tsx
export default function LandingPage() {
  return (
    <Box>
      <HeroSection />
      <InteractiveDemo />
      <FocusSection />
      <CTASection />
    </Box>
  )
}
```

---

### HeroSection — `src/components/landing/HeroSection.tsx`

**SRP**: solo decide qué CTA mostrar según el estado de auth.

- Lee `user` de `useContext(AuthContext)` internamente — sin props de auth
- Logueado → `"Ir a mis tareas"` → `/tasks`
- No logueado → `"Empieza gratis"` → `/register` + botón secundario `"Iniciar sesión"` → `/login`

---

### InteractiveDemo — `src/components/landing/InteractiveDemo.tsx`

**SRP**: solo renderiza. La lógica vive en `useDemo`.

**`src/hooks/useDemo.ts`** — responsabilidad única:
- Lista de tareas demo (máx 5)
- `addTask(text: string): void`
- `toggleTask(id: number): void`
- `showSnackbar: boolean` — se activa al completar el primer ítem
- `dismissSnackbar(): void`

**`src/types/landing.ts`**:
```ts
export interface DemoTask {
  id: number
  text: string
  done: boolean
}
```

**UX**:
- Al marcar la primera tarea → `Snackbar` MUI: *"¿Quieres guardar esto? Regístrate gratis →"*
- Limite de 5 tareas — si se alcanza, el input se deshabilita con mensaje "Regístrate para añadir más"

---

### FocusSection — `src/components/landing/FocusSection.tsx`

**SRP**: solo mapea y renderiza. Los datos están en `src/lib/landingData.ts`.

**`src/lib/landingData.ts`**:
```ts
export interface FocusItem {
  icon: SvgIconComponent
  title: string
  description: string
}

export const focusItems: FocusItem[] = [
  { icon: PsychologyIcon,    title: 'Captura el ruido',       description: 'Vuelca todo lo que tienes en la cabeza' },
  { icon: FilterAltIcon,     title: 'Organiza con claridad',  description: 'Prioridades y estados en un solo lugar' },
  { icon: RocketLaunchIcon,  title: 'Ejecuta con foco',       description: 'Sin distracciones, una tarea a la vez' },
]
```

- Layout `Grid2` responsivo (1 col mobile / 3 col desktop)
- Para añadir un nuevo bloque: solo agregar un objeto al array

---

### CTASection — `src/components/landing/CTASection.tsx`

- Banner con fondo oscuro diferenciado (`#111`)
- Botón primario: `"Crear cuenta gratis"` → `/register`
- Link secundario: `"Ya tengo cuenta"` → `/login`
- Solo visible a usuarios no autenticados (leer `user` internamente)

---

## Phase 3 — Email Verification *(OPCIONAL)*

> **Precondición**: ✅ Backend ya implementado y documentado en `FRONTEND_SUMMARY.md`

### Endpoints reales del backend

| Endpoint | Descripción |
|---|---|
| `POST /api/auth/register` | Ahora devuelve `{ message }` — ya NO devuelve token |
| `POST /api/auth/login` | Responde `403 { error }` si email no verificado |
| `GET /api/auth/verify-email?token=xxx` | Verifica el token del email |
| `POST /api/auth/forgot-password` | Envía email de recuperación; responde 200 siempre |
| `POST /api/auth/reset-password` | Resetea la contraseña con token de la URL |

### Archivos frontend a crear/modificar

| Archivo | Cambio |
|---|---|
| `src/api/auth.ts` | +`verifyEmail(token)`, +`forgotPassword(email)`, +`resetPassword(token, newPassword)` |
| `src/pages/RegisterPage.tsx` | Reemplazar auto-login por pantalla "Revisa tu correo" (el backend ya no devuelve token) |
| `src/pages/LoginPage.tsx` | Manejar `403` con el mensaje del backend + link "Reenviar verificación" |
| `src/pages/VerifyEmailPage.tsx` | *(nueva)* Lee `token` de `URLSearchParams`, llama `GET /api/auth/verify-email?token=`, muestra loading/success/error |
| `src/pages/ForgotPasswordPage.tsx` | *(nueva)* Formulario de email → `POST /api/auth/forgot-password` → muestra mensaje genérico |
| `src/pages/ResetPasswordPage.tsx` | *(nueva)* Lee `token` de URL, formulario nueva contraseña → `POST /api/auth/reset-password` |
| `src/App.tsx` | +rutas públicas `/verify-email`, `/forgot-password`, `/reset-password` |

### Flujo completo

```
Register (email+pass)
  → POST /api/auth/register
  → Response 201 { message: "Revisa tu email..." }
  → frontend muestra pantalla "Revisa tu bandeja" — sin auto-login

Verificación de email
  → usuario hace click en el link del email
  → navega a /verify-email?token=abc123
  → VerifyEmailPage llama GET /api/auth/verify-email?token=abc123
  → 200 → redirige a /login con mensaje "Email verificado ✓"
  → 400 { error: "Token inválido" } → token ya usado o no existe
  → 410 { error: "El token ha expirado" } → expiró (24h) → mostrar opción de reenvío

Login con email no verificado
  → POST /api/auth/login
  → 403 { error: "Debes verificar tu email antes de iniciar sesión" }
  → LoginPage muestra el mensaje + link a /forgot-password para reenviar

Recuperación de contraseña
  → usuario va a /forgot-password
  → ingresa email → POST /api/auth/forgot-password
  → siempre muestra: "Si el email existe, recibirás instrucciones"

Reset de contraseña
  → usuario hace click en link del email
  → navega a /reset-password?token=xxx
  → ResetPasswordPage muestra formulario de nueva contraseña
  → POST /api/auth/reset-password con { token, newPassword }
  → 200 → redirige a /login
  → 400/410 → muestra error correspondiente
```

### SRP por componente (Phase 3)

- **`VerifyEmailPage`** — un hook `useVerifyEmail(token)` maneja la llamada y estado `'loading' | 'success' | 'error' | 'expired'`; el componente solo renderiza el estado
- **`ForgotPasswordPage`** — formulario simple con zod (solo email); muestra el mensaje genérico siempre
- **`ResetPasswordPage`** — formulario con zod (newPassword + confirmPassword); lee token de URLSearchParams; hook `useResetPassword()`

---

## Checklist de verificación

### Phase 1
- [ ] `/` carga `LandingPage` sin token sin redirigir
- [ ] `/tasks` sin token → redirige a `/login`
- [ ] Login/register exitoso → llega a `/tasks`

### Phase 2
- [ ] Hero muestra CTA correcto según estado de auth
- [ ] Demo: se pueden añadir hasta 5 tareas
- [ ] Demo: `Snackbar` aparece al marcar el primer ítem
- [ ] Demo: input se deshabilita al llegar al límite
- [ ] Focus: 3 bloques visibles en mobile y desktop
- [ ] CTA final no visible si el usuario ya está logueado

### Phase 3 *(cuando el backend esté listo)*
- [ ] Register → pantalla "Revisa tu correo", sin auto-login (backend ya no devuelve token)
- [ ] `/verify-email?token=xxx` → loading → success → redirect a `/login`
- [ ] `/verify-email?token=inválido` → error "Token inválido" (400)
- [ ] `/verify-email?token=expirado` → error "Token expirado" (410) + opción de reenvío
- [ ] Login con email no verificado → 403 → mensaje del backend + link a forgot-password
- [ ] `/forgot-password` → formulario email → mensaje genérico siempre
- [ ] `/reset-password?token=xxx` → formulario nueva contraseña → redirect a `/login`
- [ ] `/reset-password?token=expirado` → error 410 correspondiente
