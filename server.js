console.log("back")
const fs = require('fs');
const sqlite3 = require('sqlite3').verbose();
const express = require('express')
const cors = require('cors');
const {open} = require('sqlite')
const path = require('path')
const dbPath = path.join(__dirname, './data2.db')
const app = express()
app.use(express.json())
app.use(cors());
let db2 = null
const initializeDBAndServer = async () => {
  try {
    db2 = await open({
      filename: dbPath,
      driver: sqlite3.Database,
    })
    app.listen(3000, () => {
      console.log('Server is Running at http://localhost:3000/')
    })
  } catch (e) {
    console.log(`DB Error:${e.message}`)
    process.exit(1)
  }
}
initializeDBAndServer()



const db = new sqlite3.Database('./data2.db');
fs.readFile('./NxtWave_Raw', 'utf8', (err, data) => {
    console.log("IN the file")
    if (err) {
        console.error(err);
        return;
    }

    
    db.serialize(() => {
        db.run('CREATE TABLE IF NOT EXISTS YourTable (Name TEXT,Age INT,Country TEXT,Mobile TEXT, Email TEXT)');

        
        data.split('\n').forEach(line => {
            
            const [name,age,country,mobile,email] = line.trim().split('|')
            db.run('INSERT INTO YourTable (Name,Age,Country,Mobile,Email) VALUES (?,?,?,?,?)', [name,age,country,mobile,email]);
        });

        
        
    });
});







app.get('/', (req, res) => {
  res.send('SQLite Server is running!');
});
app.get('/users',async (req,res)=>{
  console.log("IN THE GETT");
  const search=req.query.search
  // const option=req.query.option
  const query=`select * from YourTabl where Name='${search}'`
  const data= await db.run(query)
  console.log("DD",data)
  res.send(data)
})


