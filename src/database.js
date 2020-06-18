const mysql = require('promise-mysql')
//mariadb local2 phpmyadmin xampp (usando) heidisql
//nota mysql puerto no se conecta
const connection=mysql.createConnection({
    host: 'localhost',
   user: 'root',
   password: '',
   database: 'electrondb2',
   port: 3306
})

function getConnection(){
    return connection
}

module.exports={getConnection}