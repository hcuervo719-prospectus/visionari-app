# Visionari - Business Vision Platform

Plataforma educativa para desarrollar visiones empresariales poderosas en 16 idiomas.

## 🚀 DEPLOYMENT - PASO A PASO

### PASO 1: Verificar Archivos

Asegúrate de tener esta estructura:

```
visionari-app/
├── app/
│   ├── [locale]/
│   │   ├── layout.tsx
│   │   └── page.tsx
│   ├── layout.tsx
│   ├── page.tsx
│   └── globals.css
├── messages/
│   ├── es.json
│   └── en.json
├── .env.example
├── .gitignore
├── i18n.ts
├── middleware.ts
├── next.config.js
├── package.json
├── postcss.config.js
├── tailwind.config.js
└── tsconfig.json
```

### PASO 2: Inicializar Git y Subir a GitHub

```bash
# En la carpeta de tu proyecto
git init
git add .
git commit -m "Initial commit: Visionari base with i18n"

# Conecta con GitHub (reemplaza TU-USUARIO)
git remote add origin https://github.com/TU-USUARIO/visionari-app.git
git branch -M main
git push -u origin main
```

### PASO 3: Deploy en Vercel

1. Ve a **vercel.com**
2. Click **"Add New Project"**
3. Importa tu repositorio `visionari-app`
4. Framework Preset: **Next.js** (auto-detectado)
5. **NO HAGAS CLICK EN DEPLOY TODAVÍA**

### PASO 4: Configurar Variables de Entorno

En Vercel, antes de deploy, ve a **"Environment Variables"** y agrega:

#### Supabase (por ahora valores dummy - actualizarás después):

```
NEXT_PUBLIC_SUPABASE_URL = https://placeholder.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY = placeholder-key
```

#### App URL:

```
NEXT_PUBLIC_APP_URL = https://visionari.pro
```

**Nota:** Las credenciales Supabase reales las configuraremos mañana cuando implementemos auth.

### PASO 5: Deploy

1. Click **"Deploy"**
2. Espera 2-3 minutos
3. ✅ **Sitio live!**

Vercel te dará una URL como: `https://visionari-app-xxx.vercel.app`

### PASO 6: Probar que Funciona

Abre estas URLs y verifica:

```
https://tu-proyecto.vercel.app/es    → Debe cargar landing en español
https://tu-proyecto.vercel.app/en    → Debe cargar landing en inglés
https://tu-proyecto.vercel.app/      → Debe redirigir a /en o /es
```

✅ Si ves la landing page, **¡FUNCIONA!**

### PASO 7: Conectar Dominio (Opcional por ahora)

1. En Vercel → Settings → Domains
2. Add Domain: `visionari.pro`
3. Sigue instrucciones DNS de Vercel
4. Configura en Porkbun
5. Espera 15-60 min para SSL

---

## 🌍 Cómo Funciona el Sistema de Idiomas

### Detección Automática

El middleware detecta el idioma del navegador automáticamente:

```
Usuario con navegador en español → visionari.pro/es
Usuario con navegador en inglés → visionari.pro/en
Usuario con navegador en japonés → visionari.pro/ja
```

### Rutas Disponibles

```
/es  → Español
/en  → English  
/pt  → Português
/fr  → Français
/de  → Deutsch
/it  → Italiano
/nl  → Nederlands
/pl  → Polski
/tr  → Türkçe
/ja  → 日本語
/ko  → 한국어
/ru  → Русский
/hi  → हिन्दी
/id  → Bahasa Indonesia
/sv  → Svenska
/no  → Norsk
```

**Por ahora solo tienes traducciones para ES y EN.**

Las demás rutas funcionan pero mostrarán contenido en inglés hasta que agregues sus traducciones.

---

## 📝 Agregar Más Traducciones

Para agregar un nuevo idioma (ejemplo: Português):

1. Crea `messages/pt.json`
2. Copia estructura de `messages/es.json`
3. Traduce todos los textos
4. Commit y push
5. Vercel redeploy automático
6. **¡Listo!** Ya funciona `/pt`

---

## 🛠️ Desarrollo Local (Opcional)

Si quieres probar localmente antes de subir:

```bash
# Instalar dependencias
npm install

# Ejecutar en modo desarrollo
npm run dev

# Abrir navegador
http://localhost:3000
```

---

## ✅ Checklist Post-Deploy

- [ ] Sitio carga en Vercel URL
- [ ] `/es` muestra landing en español
- [ ] `/en` muestra landing en inglés
- [ ] Navegación funciona
- [ ] Hero section se ve bien
- [ ] Features section se ve bien
- [ ] Pricing section se ve bien
- [ ] Footer se ve bien

---

## 🔧 Troubleshooting

### Error: "Cannot find module 'next-intl'"

**Solución:** Vercel instala dependencias automáticamente. Si falla:
1. Verifica que `package.json` esté en la raíz
2. Redeploy desde Vercel dashboard

### Error: "404 Not Found"

**Solución:** 
1. Verifica que `middleware.ts` esté en la raíz del proyecto
2. Verifica que `i18n.ts` esté en la raíz
3. Redeploy

### Traducciones no aparecen

**Solución:**
1. Verifica que archivos JSON estén en `messages/`
2. Confirma que JSON es válido (sin comas extras)
3. Vercel logs mostrarán el error específico

---

## 📚 Próximos Pasos

**Mañana (Miércoles):**
- [ ] Configurar Supabase real
- [ ] Agregar sistema de autenticación
- [ ] Páginas Login/Signup

**Jueves:**
- [ ] Crear Componente 1 (gratis)
- [ ] Sistema de navegación entre secciones

**Viernes:**
- [ ] Integración Paddle (si ya está verificado)
- [ ] Paywall después Componente 1

**Fin de semana:**
- [ ] Componentes 2-8
- [ ] Dashboard usuario

**Lunes:**
- [ ] Testing completo
- [ ] Optimizaciones

**Jueves 13 Marzo:**
- [ ] 🚀 LANZAMIENTO

---

## 🎯 Resultado Esperado HOY

Al terminar este primer deploy tendrás:

✅ Landing page profesional funcionando
✅ Sistema multiidioma (rutas para 16 idiomas)
✅ Deployado en Vercel
✅ Auto-deploy en cada git push
✅ Base sólida para construir el resto

**Tiempo: 30-60 minutos**

---

**¡Éxito, Henry! 🚀**

*Fundación lista. Mañana construimos las paredes.*
