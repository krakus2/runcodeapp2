const mysql = require('mysql');

const db = mysql.createConnection({
   host: 'localhost',
   user: 'root',
   password: 'rodezjan2',
   database: 'tasks'
});

db.connect(function(err) {
   if (err) {
      console.error('error connecting: ' + err.stack);
      return;
   }
   console.log('connected as id ' + db.threadId);
});

module.exports = db;
