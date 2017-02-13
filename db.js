var pg = require('pg');

// var config = {
//   user: 'postgres',
//   database: 'Node1912',
//   password: 'khoapham',
//   host: 'localhost',
//   port: 5432,
//   max: 10,
//   idleTimeoutMillis: 1000
// };
//
// var pool = new pg.Pool(config);
var URI='
postgres://ivcapuewoauidm:d180b1e6fdd9be3c7f56075b5620645c896ccc1aa5474550d7e365cc9601e477@ec2-107-22-223-6.compute-1.amazonaws.com:5432/d6kncctl4240nl';
function query(sql, cb){
  pg.connect(URI,(err, client, done) => {
    if(err) return cb(err);
    done();
    client.query(sql, cb);
  });
}

function getInfoById(id, cb){
  query('SELECT * FROM "HotGirl" WHERE id = ' + id, cb);
}

function likeById(id, cb) {
  var sql = `UPDATE public."HotGirl" SET "like"= "like" + 1
  WHERE id = ${id} RETURNING "like"`;
  query(sql, cb);
}
function dislikeById(id, cb) {
  var sql = `UPDATE public."HotGirl" SET "dislike"= "dislike" + 1
  WHERE id = ${id} RETURNING "dislike"`;
  query(sql, cb);
}

// getInfoById(3, (err, result) => console.log(result.rows));
// likeById(1, (err, result) => console.log(result.rows));

module.exports = {getInfoById, likeById, dislikeById};
