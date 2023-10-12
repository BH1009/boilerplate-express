let express = require('express');
let app = express();
require('dotenv').config();
const bodyParser = require('body-parser')

// 1 Bienvenido a la consola de Node
console.log("Hello Express");

//2  Iniciar servidor en express
// app.get('/', (req, res) => {
//   res.send("Hello Express")
// });


//4 Sirve recursos estáticos
app.use('/public', express.static(__dirname + "/public"));

//7 Implementa un Middleware de registro de peticiones a nivel raíz
app.use((req, res, next) => {
  console.log(`${req.method} ${req.path} - ${req.ip}`);
  next();
});

//8 Encadenando Middlewares para crear un servidor horario
app.use('/now', (req, res, next) => {
  // let now = new Date();
  // now.setHours(now.getHours() - 6);
  // req.time = now.toString();
  req.time = new Date().toString(); 
  next();
}, (req, res) => {
  res.json({'time': req.time});
});

//10. Usa body-parser para analizar las peticiones POST
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json());

//3  Sirve un archivo HTML
app.get('/', (req, res) => {
  res.sendFile(__dirname + "/views/index.html");
});

//5 Sirve JSON en una ruta específica
// app.get('/json', (req, res) => {
//   res.json({"message": "Hello json"})
// });

//6 Usa el archivo .env
app.get('/json', (req, res) => {
  if(process.env['MESSAGE_STYLE'] == "uppercase"){
    res.json({"message": "HELLO JSON"});
  }
  else{
    res.json({"message": "Hello json"}); 
  }
});

//8. Obtén la entrada de parámetros de ruta del cliente
app.get('/:word/echo', (req, res) => {
  let word = req.params.word;
  res.json({"echo": word})
});

//9. Obtén la entrada de parámetros de consulta del cliente
app.route('/name')
  .get((req, res) => {
    const {first: first, last: last} = req.query;
    res.json({"name": `${first} ${last}`})
  })
  //11. Obtén datos de las peticiones POST
  .post((req, res) => {
    const {first: first, last: last} = req.body;
    res.json({"name": `${first} ${last}`})
  })

 module.exports = app;