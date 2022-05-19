const app = require('./server');

const host = "http://localhost";
const port = process.env.PORT || 8080;

app.listen(port, console.log(`Servidor iniciado en ${host}:${port}`));
