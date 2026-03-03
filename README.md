# Visionari - Business Vision Platform

Plataforma educativa para desarrollar visiones empresariales poderosas en 16 idiomas.

## 🚀 INSTRUCCIONES DE DEPLOYMENT

### PASO 1: Crear Repositorio en GitHub

1. Ve a github.com
2. Click "New repository"
3. Nombre: `visionari-app`
4. Privado o Público (tu elección)
5. **NO** inicializar con README
6. Click "Create repository"

### PASO 2: Subir Código al Repositorio

```bash
# En tu computadora, navega a la carpeta con estos archivos
cd visionari-base

# Inicializa git
git init

# Agrega todos los archivos
git add .

# Primer commit
git commit -m "Initial commit: Visionari base structure with i18n"

# Conecta con GitHub (reemplaza TU-USUARIO)
git remote add origin https://github.com/TU-USUARIO/visionari-app.git

# Sube los archivos
git push -u origin main
```

### PASO 3: Deploy en Vercel

1. Ve a vercel.com
2. Click "Add New Project"
3. Importa tu repositorio `visionari-app`
4. Framework Preset: **Next.js** (auto-detectado)
5. Root Directory: `./` (dejar por defecto)
6. **NO HAGAS CLICK EN DEPLOY AÚN**

### PASO 4: Configurar Variables de Entorno en Vercel

En Vercel, antes de hacer deploy, agrega estas variables:

#### Variables de Supabase:

```
NEXT_PUBLIC_SUPABASE_URL = https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY = eyJhbGc...tu-anon-key
SUPABASE_SERVICE_ROLE_KEY = eyJhbGc...tu-service-role-key
```

**Dónde obtenerlas:**
1. Ve a supabase.com → Tu proyecto
2. Settings → API
3. Copia:
   - Project URL → `NEXT_PUBLIC_SUPABASE_URL`
   - `anon` `public` key → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `service_role` `secret` key → `SUPABASE_SERVICE_ROLE_KEY`

#### Variable de App URL:

```
NEXT_PUBLIC_APP_URL = https://visionari.pro
```

### PASO 5: Deploy

1. Click **"Deploy"**
2. Espera 2-3 minutos
3. ✅ **Sitio live!**

### PASO 6: Conectar Dominio Personalizado

1. En Vercel, ve a tu proyecto
2. Settings → Domains
3. Add Domain: `visionari.pro`
4. Vercel te da instrucciones DNS
5. Ve a Porkbun (tu registrador)
6. Configura DNS como indica Vercel
7. Espera 15-60 min para SSL

---

## 📁 Estructura del Proyecto

```
visionari-app/
├── app/
│   ├── [locale]/          # Rutas multiidioma
│   │   ├── layout.tsx     # Layout con traducciones
│   │   └── page.tsx       # Landing page
│   ├── layout.tsx         # Layout raíz
│   ├── page.tsx           # Redirect a idioma
│   └── globals.css        # Estilos globales
│
├── messages/              # Traducciones
│   ├── es.json           # Español (completo)
│   ├── en.json           # English (completo)
│   └── ...               # Otros idiomas (agregar después)
│
├── i18n.ts               # Configuración idiomas
├── middleware.ts         # Detector de idioma
├── next.config.js        # Config Next.js
├── package.json          # Dependencias
└── tailwind.config.js    # Config Tailwind
```

---

## 🌍 Sistema de Idiomas

### Rutas Generadas Automáticamente

El sistema genera estas rutas automáticamente:

```
visionari.pro/            → Detecta idioma → Redirect
visionari.pro/es/         → Landing en español
visionari.pro/en/         → Landing en inglés
visionari.pro/pt/         → Landing en portugués
... (así para 16 idiomas)
```

### Agregar Más Idiomas

Para agregar traducciones de otros idiomas:

1. Crea archivo en `messages/`:
   - `messages/pt.json` (Português)
   - `messages/fr.json` (Français)
   - etc.

2. Copia estructura de `messages/es.json`
3. Traduce los valores
4. **Listo!** El sistema los detecta automáticamente

---

## 🛠️ Desarrollo Local

```bash
# Instalar dependencias
npm install

# Crear archivo .env.local (copia de .env.example)
cp .env.example .env.local

# Edita .env.local con tus credenciales reales

# Ejecutar en modo desarrollo
npm run dev

# Abrir en navegador
http://localhost:3000
```

---

## ✅ Verificación

### Checklist Post-Deploy

- [ ] Sitio carga en `https://tu-proyecto.vercel.app`
- [ ] Puedes acceder a `/es` (español)
- [ ] Puedes acceder a `/en` (inglés)
- [ ] Landing page se ve correctamente
- [ ] Navegación funciona
- [ ] Dominio personalizado conectado
- [ ] SSL activo (https://)

### Testing Idiomas

Prueba estas URLs:

```
https://visionari.pro/es    → Debe mostrar todo en español
https://visionari.pro/en    → Debe mostrar todo en inglés
https://visionari.pro/      → Debe detectar tu idioma y redirigir
```

---

## 🔧 Troubleshooting

### "Build Error" en Vercel

**Solución:**
- Verifica que todas las dependencias estén en `package.json`
- Asegúrate que no haya errores de TypeScript
- Revisa los logs de build en Vercel

### "404 Not Found" en rutas

**Solución:**
- Verifica que el middleware esté en la raíz del proyecto
- Confirma que `i18n.ts` tiene todos los locales listados
- Redeploy desde Vercel dashboard

### Traducciones no aparecen

**Solución:**
- Verifica que el archivo JSON está en `messages/`
- Confirma que el JSON es válido (sin comas extras)
- Verifica que el locale está en el array en `i18n.ts`

---

## 📚 Próximos Pasos

Una vez que el sitio base esté funcionando:

1. **Mañana:** Agregar autenticación (Login/Signup)
2. **Jueves:** Crear Componente 1 (gratis)
3. **Viernes:** Integrar Paddle (pagos)
4. **Sábado-Domingo:** Componentes 2-8
5. **Lunes:** Testing final
6. **Próximo Jueves:** 🚀 Lanzamiento

---

## 🎯 Resultado Esperado

Al finalizar este bloque tendrás:

✅ Landing page profesional
✅ Sistema multiidioma (16 idiomas)
✅ Deployado en Vercel
✅ Dominio personalizado funcionando
✅ SSL activo
✅ Base sólida para construir el resto

**Tiempo estimado:** 1-2 horas

---

## 💬 Soporte

Si tienes problemas:

1. Revisa los logs en Vercel (Runtime Logs)
2. Verifica las variables de entorno
3. Asegúrate que el repositorio GitHub tenga todos los archivos

---

**¡Éxito, Henry! 🚀**

*Fundación construida. Ahora vienen las paredes.*
