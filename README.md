# Sistema de alquiler de autos

Sistema de alquiler de autos de BackOffice creado con Node.js, SQLite y Bulma.io.

## Introducci贸n 馃殌

Este sistema de alquiler funciona como panel de administraci贸n de empleados para dar de alta clientes. Crear, leer, actualizar y borrar autos. Tambi茅n cuenta con autentificaci贸n de usuarios y validaci贸n de formularios del lado del servidor.

### Instalaci贸n y ejecuci贸n 馃敡

#### 1. Instalar dependencias.
```
npm install
```

#### 2. Correr el proyecto.

```
npm run start
```

#### 3. Abrir proyecto  en el navegador.

```
http://localhost:3000/
```

## Uso 馃摝

Para poder utilizar todas las funciones de la aplicaci贸n se debe iniciar sesi贸n, puede crear una cuenta o usar la siguiente:

```
Email: usuario@test.com
Contrase帽a: usuario
```

## Construido con 馃洜锔?

* [Express](https://expressjs.com/es/) - Framework para Node.js
* [Sequelize](https://sequelize.org/) - ORM
* [SQLite](https://rometools.github.io/rome/) - Base de datos
* [Bulma.io](https://bulma.io/) - Librer铆a de css
* [Nunjunks](https://mozilla.github.io/nunjucks/) - Template engine
* [Multer](https://www.npmjs.com/package/multer) - Middleware para manejar multipart/form-data (subir archivos)
* [Express-validator](https://express-validator.github.io/docs/) - Middleware para validar formularios
* [Express-session](https://www.npmjs.com/package/express-session) - Guarda datos de sessiones
* [Connect-session-sequelize](https://www.npmjs.com/package/connect-session-sequelize) - Guarda sesiones en base de datos SQL utilizando sequelize
* [Csurf](https://www.npmjs.com/package/csurf) - Middleware de protecci贸n
* [Body-parser](https://www.npmjs.com/package/body-parser) - Parsing middleware
* [Bcryptjs](https://www.npmjs.com/package/bcryptjs) - Encripta contrase帽as
