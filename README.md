Modulize Backend API

Este repositorio contiene la API RESTful para la plataforma de gestión de inventario Modulize. Está construido con una arquitectura robusta y modular utilizando NestJS y Prisma como ORM para la interacción con la base de datos.
🛠️ Stack Tecnológico

    Framework: NestJS (Node.js framework progressive)

    Lenguaje: TypeScript

    ORM & Base de Datos: Prisma (con PostgreSQL como base de datos recomendada)

    Autenticación: JWT (JSON Web Tokens) y Guards de NestJS.

    Gestor de Paquetes: pnpm

📋 Prerrequisitos

Antes de comenzar, asegúrate de tener instalado lo siguiente en tu entorno de desarrollo (Este backend se hizo con Ubuntu Linux):

    Node.js (Versión LTS recomendada, v18 o superior).

    pnpm: El gestor de paquetes utilizado en este proyecto.
    Bash

    npm install -g pnpm

    Instancia de Base de Datos: Debes tener corriendo una base de datos (preferiblemente PostgreSQL) localmente o en Docker, y tener a mano la URL de conexión.

🚀 Instalación y Configuración Inicial

Sigue estos pasos para levantar el proyecto localmente.

1. Clonar el repositorio e instalar dependencias
   Bash

# Clona el repositorio (reemplaza con tu URL si es necesario)

git clone <https://github.com/Calebabisai/backend-Modulize>
cd backend-modulize

# Instala las dependencias usando pnpm

pnpm install

2. Configuración de Variables de Entorno (Ver tambien archivo .env.template)

El proyecto necesita un archivo .env en la raíz para funcionar.

    Crea un archivo llamado .env en la raíz del proyecto.

    Copia el siguiente contenido y ajusta los valores según tu entorno local:

Fragmento de código

# --- Configuración del Servidor ---

PORT=3000

# --- Configuración de la Base de Datos (Prisma) ---

# Reemplaza user:password@localhost:5432/mydb con tus credenciales reales de PostgreSQL

DATABASE_URL="postgresql://usuario:password@localhost:5432/modulize_db?schema=public"

# --- Autenticación (JWT) ---

# ¡Usa una cadena larga y secreta aquí!

JWT_SECRET="ESTA_ES_UNA_CLAVE_SECRETA_SUPER_SEGURA_PARA_DESARROLLO"
JWT_EXPIRES_IN="1d"

3. Configuración de la Base de Datos con Prisma

Una vez configurado el .env, necesitamos sincronizar el esquema de Prisma con tu base de datos y cargar los datos iniciales (seed).
Bash

# 1. Ejecuta las migraciones para crear las tablas en tu base de datos

pnpm prisma migrate dev --name init

# 2. (Opcional) Genera el cliente de Prisma (usualmente se hace solo tras el migrate)

pnpm prisma generate

# 3. Carga los datos iniciales (Seed)

# Esto ejecutará el script ubicado en prisma/seed.ts para crear usuarios admin, categorías base, etc.

pnpm prisma db seed

    Tip: Puedes usar Prisma Studio para una interfaz visual de tu base de datos ejecutando pnpm prisma studio.

▶️ Ejecutar la Aplicación
Modo Desarrollo (con recarga automática - watch mode)

Este es el comando que usarás la mayor parte del tiempo mientras programas.
Bash

pnpm start:dev

La API estará disponible en: http://localhost:3000 (o el puerto que definiste en el .env).
Modo Producción

Para simular un entorno de producción o desplegar:
Bash

# Compila el proyecto a JavaScript (carpeta /dist)

pnpm build

# Ejecuta el build optimizado

pnpm start:prod

📂 Estructura del Proyecto

La arquitectura se basa en la estructura modular de NestJS, separando responsabilidades claramente.

src/
├── auth/ # Módulo de autenticación (Login, Registro, Estrategias JWT, Guards)
├── category/ # Módulo de gestión de categorías (CRUD)
├── products/ # Módulo de gestión de productos (CRUD)
├── users/ # Módulo de gestión de usuarios
├── common/ # Recursos compartidos (Enums como Roles, decoradores personalizados)
├── prisma/ # Servicio de conexión a Prisma y Seeders
├── main.ts # Punto de entrada de la aplicación
└── app.module.ts # Módulo raíz que importa el resto de funcionalidades

📄 Documentación de API (Swagger)

Una vez que la aplicación esté corriendo, puedes acceder a la documentación interactiva de la API (Swagger/OpenAPI) en:

http://localhost:3000/docs (Ajusta la ruta según tu configuración en main.ts).

![alt text](image.png)

## License

Nest is [MIT licensed](https://github.com/nestjs/nest/blob/master/LICENSE).
