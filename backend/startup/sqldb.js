const mysql = require('mysql');

const db = mysql.createConnection({
   host: 'db4free.net',
   user: 'runcodeapp',
   password: 'aGOHnkn5',
   database: 'runcodeapp'
});

db.connect(function(err) {
   if (err) {
      console.error('error connecting: ' + err.stack);
      return;
   }
   console.log('connected as id ' + db.threadId);
});

module.exports = db;
