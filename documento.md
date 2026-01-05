# Sistema de Reservas de Espacios de Oficina (SREO) - Backend NestJS

## 📋 Descripción del Proyecto
El **SREO** es una plataforma digital diseñada para optimizar la reserva, control y uso de espacios físicos (salas de reuniones, puestos flexibles) dentro de una unidad de trabajo. El sistema permite centralizar la gestión de activos y asegurar un uso eficiente de los ambientes compartidos.

Este documento cubre únicamente el desarrollo del backend utilizando NestJS con Clean Architecture y Swagger para documentación de API.

## 🏗️ Arquitectura Propuesta: Clean Architecture (NestJS)
Para garantizar la escalabilidad y el cumplimiento de los Requisitos No Funcionales, el proyecto se divide en:
- **Domain:** Entidades de negocio, interfaces de repositorios y lógica de dominio.
- **Application:** Casos de uso (servicios de aplicación), DTOs y lógica de aplicación.
- **Infrastructure:** Implementación de Base de Datos (Prisma), servicios externos y notificaciones.
- **Presentation:** API REST (NestJS).

## 📂 Estructura de Directorios (Backend NestJS)
```
src/
├── domain/
│   ├── entities/
│   │   ├── usuario.entity.ts
│   │   ├── espacio.entity.ts
│   │   └── reserva.entity.ts
│   ├── interfaces/
│   │   ├── usuario-repository.interface.ts
│   │   ├── espacio-repository.interface.ts
│   │   └── reserva-repository.interface.ts
│   └── value-objects/
├── application/
│   ├── dtos/
│   ├── services/
│   ├── interfaces/
│   └── use-cases/
├── infrastructure/
│   ├── data/
│   ├── repositories/
│   └── services/
├── presentation/
│   ├── controllers/
│   ├── modules/
│   └── main.ts
```

---

## 🚀 Planificación de Sprints (Product Backlog)

### Sprint 1: Funcionalidad Core (13/10/2025 - 27/10/2025)
**Objetivo:** Implementar el acceso seguro, la lógica de reserva base y la base de datos.
- **HU-01: Gestión de Acceso** - Registro, login y hashing de contraseñas (RNF2).
- **HU-04: Realización de Reserva** - Crear solicitudes en estado "Pendiente".
- **HU-05: Gestión de Solicitudes** - Aprobación o rechazo por parte del Administrador.

### Sprint 2: Gestión de Recursos y Tiempo Real (28/10/2025 - 10/11/2025)
**Objetivo:** Disponibilidad en tiempo real, CRUD de recursos y filtros de búsqueda.
- **HU-03: Disponibilidad** - Cálculo de disponibilidad en tiempo real.
- **HU-08: Mantenimiento de Recursos** - Añadir, editar y eliminar espacios físicos.
- **HU-02: Búsqueda y Filtro** - Filtrar por tipo, capacidad o características.

### Sprint 3: Gestión Avanzada (11/11/2025 - 24/11/2025)
**Objetivo:** Implementar reportes detallados y políticas de reserva estrictas.
- **HU-10: Generación de Reportes** - Métricas de ocupación y descarga de archivos (CSV/PDF).
- **HU-09: Configuración de Políticas** - Reglas de duración máxima y antelación.

### Sprint 4: Notificaciones y Cierre (25/11/2025 - 08/12/2025)
**Objetivo:** Notificaciones automáticas y visualización de historial.
- **HU-06: Notificaciones Automáticas** - Envío de correos tras aprobación/rechazo.
- **HU-07: Historial de Uso Personal** - Vista de reservas pasadas y futuras para Miembros.

---

## 🛠️ Requisitos No Funcionales (RNF)
- **RNF1 (Rendimiento):** Tiempo de respuesta del calendario menor a 2 segundos.
- **RNF2 (Seguridad):** Almacenamiento de contraseñas mediante algoritmos de Hashing.

---

## 📝 Commits Definidos

### Sprint 1: Funcionalidad Core
- feat: configurar proyecto NestJS con Clean Architecture y Swagger
- feat: implementar entidades de dominio (Usuario, Espacio, Reserva)
- feat: implementar gestión de acceso (HU-01)
- feat: implementar realización de reserva (HU-04)
- feat: implementar gestión de solicitudes (HU-05)

### Sprint 2: Gestión de Recursos y Tiempo Real
- feat: implementar disponibilidad en tiempo real (HU-03)
- feat: implementar mantenimiento de recursos (HU-08)
- feat: implementar búsqueda y filtro (HU-02)

### Sprint 3: Gestión Avanzada
- feat: implementar generación de reportes (HU-10)
- feat: implementar configuración de políticas (HU-09)

### Sprint 4: Notificaciones y Cierre
- feat: implementar notificaciones automáticas (HU-06)
- feat: implementar historial de uso personal (HU-07)

---

## ⚙️ Preferencias de Código
- Sin comentarios en el código.
- Todo el código en español (nombres de variables, funciones, clases en español).