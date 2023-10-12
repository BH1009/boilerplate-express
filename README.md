# Basic Node and Express

This is the boilerplate code for the Basic Node and Express Challenges. Instructions for working on these challenges start at https://www.freecodecamp.org/learn/apis-and-microservices/basic-node-and-express/

# Descripción

Node.js es un entorno de ejecución de JavaScript que permite a desarrolladores escribir programas de backend (lado del servidor) en JavaScript. Node.js viene con muchos módulos integrados — pequeños programas independientes — que ayudan en esto. Algunos de los módulos principales incluyen HTTP, que actúa como un servidor, y sistema de archivos, un módulo para leer y modificar archivos.

En el último conjunto de cursos aprendiste a instalar y administrar paquetes desde npm, que son colecciones de módulos más pequeños. Estos paquetes pueden ayudarte a construir aplicaciones más grandes y complejas.

Express es un framework para aplicaciones web y es uno de los paquetes más populares en npm. Express logra que crear un servidor y manejar el enrutamiento de tu aplicación sea mucho más fácil, ya que realiza cosas como redirigir a las personas a la página correcta cuando visitan un endpoint como /blog.

En este curso, aprenderás los fundamentos de Node y Express, incluyendo cómo crear un servidor, servir diferentes archivos y gestionar diferentes peticiones desde el navegador.

## 1. Hola express

Para crear un servidor en express se requiere de importarlo para despues crear una instancia necesitaramos de utilizar la siguiente linea.


``javascript
app.listen(port);
``

La forma en la que podremos servir una ruta es la siguiente utilizamos la instancia de express app.METHOD, que especifica el metodo HTTP, despues pasamos dos argumentos app.METHOD(PATH, HANDLER), PATH es una ruta relativa y HANDLER es una funcion que se ejecuta despues de que la solictud coincide con la ruta y tendria la siguiente forma.

``javascript
app.listen(port);
``

## 2. Servir archivos html

Para esto en lugar de solo usar send lo cambiaremos por la funcion ``sendFile(__dirname + path)`` dentro de esta funcion pasaremos la variable global '__dirname' concatenada a la ruta relativa del archivo que queremos servir.

## 3. Servir archivos estaticos

En un servidor HTML se tienen varios directorios que pueden contener hojas de estilos, scripts, imagenes entre otras cosas. Para esto se hace uso de un middleware esta función intercepta los manejadores de rutas y añaden información adicional, para esto se utiliza la funcion ``app.use(path, middleware)`` que en este caso sera express.static(path), aqui tambien se usa la rutaraltiva __dirname.

**Los Middleware deben ponerse por encima de todas las rutas**

## 4. Sirve JSON en una ruta específica

Las API's sirven datos una API REST (REpresentational State Transfer) permite el intercambio de datos de manera facil sin que el cliente conozca nada sobre el servidor, el cliente sólo necesita saber dónde está el recurso (la URL), y la acción que quiere realizar en él (el verbo). Para esto se utiliza la funcion ``res.json({"key": "data"})``.

## 5. Usa el archivo .env

El archivo **.env** es un archivo especial que se mantiene oculto se utiliza para pasar variables de entorno a la aplicación. Este archivo es secreto, solamente tú puedes acceder a él, y puede ser utilizado para almacenar datos que desees mantener privados u ocultos. Este archivo es accesible usando ``process.env.VAR_NAME``, este obejeto ``proces.env`` es un objeto global de node y las variables de entorno son pasadas como cadenas de texto. Para poder utilizarlo se necesita declarar los siguiente:

``require('dotenv').config();``

## 6. Implementa un Middleware de registro de peticiones a nivel raíz

Las funciones de Middleware son funciones que toman 3 argumentos: el objeto de la petición, el objeto de respuesta y la siguiente función en el ciclo petición-respuesta de la aplicación. Estas funciones ejecutan algún código que puede tener efectos secundarios en la aplicación, y normalmente agregan información a los objetos de la petición o respuesta. También pueden terminar el ciclo enviando una respuesta cuando se cumple alguna condición. Si no envían la respuesta cuando han terminado, comienzan la ejecución de la siguiente función en la pila de ejecución. Esto hace que se llame al tercer argumento, ``next()``.

```javascript
function(req, res, next) {
  console.log("I'm a middleware...");
  next();
}
```

## 7. Encadenando Middlewares para crear un servidor horario

Un middleware se puede montar en una ruta especifica usando app.METHOD(path, middlewareFunction). El middleware también se puede encadenar dentro de una definición de ruta.

```javascript
app.get('/user', (req, res, next) => {
  req.user = getTheUserSync();  // Hypothetical synchronous operation
  next();
}, => (req, res) {
  res.send(req.user);
});
```

Este método es útil para dividir las operaciones del servidor en unidades más pequeñas. Lo que lleva a una mejor estructura de nuestra aplicación y a la posibilidad de reutilizar código en diferentes lugares.

## 8. Obtén la entrada de parámetros de ruta del cliente

Cuando construimos una API, tenemos que permitir que los usuarios nos comuniquen lo que quieren obtener de nuestro servicio. Por ejemplo, si el cliente solicita información sobre un usuario almacenado en la base de datos, necesitan una forma de hacernos saber en qué usuario están interesados. Una posible forma de lograr este resultado es utilizando parámetros de ruta. Los parámetros de ruta son segmentos con nombre de la URL, delimitados por barras (/). Cada segmento captura el valor de la parte de la URL que coincide con su posición. Los valores capturados pueden encontrarse en el objeto req.params.

```
route_path: '/user/:userId/book/:bookId'
actual_request_URL: '/user/546/book/6754'
req.params: {userId: '546', bookId: '6754'}
```

## 9. Obtén la entrada de parámetros de consulta del cliente

Otra forma común de obtener la entrada del cliente es codificando los datos después de la ruta, usando una cadena de consulta. La cadena de consulta está delimitada por un signo de interrogación (?), e incluye parejas de campo=valor. Cada pareja está separada por un ampersand (&). Express puede analizar los datos de la cadena de consulta, y llenar el objeto req.query. Algunos caracteres, como el porcentaje (%), no pueden estar en URLs y tienen que ser codificados en un formato diferente antes de poder enviarlos. Si usas la API desde JavaScript, puedes usar métodos específicos para codificar/decodificar estos caracteres.

```
route_path: '/library'
actual_request_URL: '/library?userId=546&bookId=6754'
req.query: {userId: '546', bookId: '6754'}
```

## 10. Usa body-parser para analizar las peticiones POST

Además de GET, hay otro verbo HTTP común, es POST. POST es el método por defecto utilizado para enviar datos del cliente con formularios HTML. En la convención REST, POST se utiliza para enviar datos para crear nuevos elementos en la base de datos (un nuevo usuario, o una nueva entrada de blog). No tienes una base de datos en este proyecto, pero de todos modos aprenderás a manejar las peticiones POST.

En este tipo de peticiones, los datos no aparecen en la URL, están ocultos en el cuerpo de la petición. El cuerpo es parte de la petición HTTP, también llamada la carga útil. Aunque los datos no son visibles en la URL, esto no significa que sean privados. Para ver por qué, mire el contenido bruto de una petición HTTP POST:

```
POST /path/subpath HTTP/1.0
From: john@example.com
User-Agent: someBrowser/1.0
Content-Type: application/x-www-form-urlencoded
Content-Length: 20

name=John+Doe&age=25
```

Como puedes ver, el cuerpo está codificado como la cadena de consulta. Este es el formato por defecto utilizado por los formularios HTML. Con Ajax, también puedes utilizar JSON para manejar datos con una estructura más compleja. También hay otro tipo de codificación: multiparte/form-data. Este se utiliza para subir archivos binarios. En este ejercicio, usarás un cuerpo codificado por URL. Para analizar los datos provenientes de peticiones POST, tendrás que usar el paquete body-parser. Este paquete te permite usar una serie de middleware, que pueden decodificar datos en diferentes formatos.

El middleware body_parser maneja datos codificados por URL es devuelto por ```bodyParser.urlencoded({extended: false})```. Pasa la función devuelta por la llamada al método anterior a app.use(). Como de costumbre, el middleware debe ser montado antes de todas las rutas que dependen de él.

## 11. Obtén datos de las peticiones POST



Monta un manejador POST en la ruta /name. Es la misma ruta de antes. Hemos preparado un formulario en la página principal html. Se enviarán los mismos datos del ejercicio 10 (Query string). Si el "body-parser" está configurado correctamente, debe encontrar los parámetros en el objeto req.body. Echa un vistazo al ejemplo de la biblioteca:

```
route: POST '/library'
urlencoded_body: userId=546&bookId=6754
req.body: {userId: '546', bookId: '6754'}
```

Responde con el mismo objeto JSON que antes: {name: 'firstname lastname'}. Prueba si tu endpoint funciona usando el formulario html que proporcionamos en la página principal de la aplicación.

Nota: Hay varios métodos de http diferentes a GET y POST. Y por convención hay una correspondencia entre el verbo http y la operación que se va a ejecutar en el servidor. La asignación convencional es:

POST (a veces PUT): Crea un nuevo recurso usando la información enviada con la solicitud,

GET: Lee un recurso existente sin modificarlo,

PUT o PATCH (a veces POST): Actualiza un recurso usando los datos enviados,

DELETE => Elimina un recurso.

También hay un par de otros métodos que se utilizan para negociar una conexión con el servidor. A excepción de GET, todos los demás métodos mencionados anteriormente pueden tener un payload (es decir, los datos en el cuerpo de la solicitud). El middleware body-parser también funciona con estos métodos.
