Agradecemos tu interés. Tu perfil muestra potencial para el estándar que buscamos en T1.

🎯Primer Paso: PRUEBA TÉCNICA
Esta no es una prueba típica. Evaluaremos tu capacidad para:

Resolver problemas reales del ecosistema T1
Pensar en experiencia de usuario y conversión
Tomar decisiones técnicas que escalen

INSTRUCCIONES
Tiempo límite: 72 horas a partir de este correo
Entrega: Repositorio GitHub

EL RETO: “Component library"
Crear una librería de componentes reutilizable con sistema de analíticas donde el usuario pueda visualizar un demo de los componentes y su funcionamiento

Conoce más en el archivo adjunto. ¡No olvides leer cada paso!


📤ENTREGA
Envía a: axmejia@sears.com.mx y helen.blanco@claroshop.com
Incluye: Repositorio GitHub
⚡EXPECTATIVAS T1
Esta prueba simula un proyecto real del ecosistema T1. Esperamos:

Mentalidad de dueño: cada línea de código pensada para escalar
Obsesión por UX: interfaces que conviertan y retengan usuarios
Código enterprise: listo para millones de usuarios en LATAM
Problem solving: capacidad de tomar decisiones sin supervisión constante
¡Demuéstranos por qué eres el Frontend Rockstar que T1 necesita!


Objetivo:
Crear una librería de componentes reutilizable con sistema de analíticas donde el usuario
pueda visualizar un demo de los componentes y su funcionamiento

Funcionalidades a Implementar:
Frontend - Librería de Componentes
Componentes Requeridos:
1. Button
o Variantes: primary, secondary, danger
o Estados: default, loading, disabled
o Soporte para iconos opcionales
2. Input
o Tipos: text, email, password
o Estados de validación: default, error, success
o Estado disabled
o Placeholder y label
3. Modal
o Header, body, footer configurables
o Función de cerrar (X y overlay)
o Diferentes tamaños: small, medium, large
4. Card
o Header, body, footer opcionales
o Soporte para imágenes
o Diferentes estilos de borde
Requerimientos Técnicos:
• TypeScript obligatorio con interfaces completas
• Responsive design (mobile-first)
• Tests unitarios que cubran las funcionalidades principales de cada componente y
se ejecuten exitosamente
o Mínimo 3 tests por componente (renderizado, interacciones, props)
o Tests de integración del sistema de tracking
o Coverage mínimo del 80% en componentes
o Ejecutables con comando (ej. npm test / yarn test)
• Documentación con ejemplos de uso y guía de instalación para otros
desarrolladores
• Exportación centralizada desde index.ts - Un archivo principal que exporte todos los
componentes para facilitar las importaciones
• Tokens de diseño:
o Archivo dedicado (design-tokens.ts, design-system.ts, etc.)
o Mínimo: colores, espaciado, tipografía, border-radius
o Utilizados en al menos 80% de los estilos de componentes
o Variables CSS/JS que demuestren reutilización consistente

Integración Frontend-Backend
Sistema de tracking automático integrado en componentes que registre interacciones
relevantes y las envíe al backend de forma transparente para el desarrollador final.
La demo page debe incluir:
• Showcase de los 4 componentes con todas sus variantes funcionales
• Dashboard de "Estadísticas en Tiempo Real" visible
• Contador de interacciones que se actualice automáticamente
• Funcionalidad de exportación CSV y JSON
• Autenticación (login/logout) funcional

Backend - API de Analíticas
Endpoints Requeridos:
Autenticación:
• POST /api/auth/register - Registro de usuarios
• POST /api/auth/login - Autenticación básica con JWT
Tracking de Componentes:
• POST /api/components/track - Registrar uso de componente (público)
• GET /api/components/stats - Estadísticas básicas (público)
• GET /api/components/export - Exportar datos de tracking en formato CSV (autenticado)
• GET /api/health - Health check
Modelo de Datos:
Los datos de tracking deben incluir información relevante sobre el uso de componentes
(nombre, variante, acción, timestamp, etc.)

Requerimientos Técnicos:
• JWT Authentication para endpoint de exportación
• Validación de datos con middleware
• Manejo de errores con códigos HTTP apropiados
• Variables de entorno para configuración (DB, JWT secret, etc.)
• Logging básico para debugging
• Documentación de API completa en README con ejemplos de uso de cada
endpoint

Stack Tecnológico:
Frontend:
• Next.js o Remix
• TypeScript
• Tailwind CSS, CSS Modules o Styled Component
• Jest + Testing Library
Backend:
• Node.js + Express
• MongoDB (Atlas gratuito)
• JWT para autenticación básica
• Mongoose para ODM


Entregables y Reglas:
Entrega:
• El proyecto debe ejecutarse completamente siguiendo únicamente las
instrucciones del README
• Todos los endpoints del backend deben ser funcionales
• Vía: GitHub (repositorio público o privado con acceso)
• Acceso a usuario: mario.cardenas@t1paginas.com

Base de datos:
• MongoDB Atlas (cuenta gratuita) con acceso público configurado y credenciales
válidas incluidas en el proyecto
• Incluir archivo .env.example con estructura de variables necesarias
Tiempo de entrega:
• El tiempo de entrega es de 72 horas después de recibir el examen.
