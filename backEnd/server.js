console.log("back")

const sqlite3 = require('sqlite3').verbose();
const express = require('express')
const bodyParser = require('body-parser');
const cors = require('cors');
const {open} = require('sqlite')
const path = require('path')
const dbPath = path.join(__dirname, './data2.db')
const app = express()
app.use(bodyParser.text())
app.use(cors());

const initializeDBAndServer = async () => {
  try {
    
    app.listen(3000, () => {
      console.log('Server is Running at http://localhost:3000/')
    })
  } catch (e) {
    console.log(`DB Error:${e.message}`)
    process.exit(1)
  }
}
initializeDBAndServer()







const fs = require('fs');


// const textData = fs.readFileSync('./NxtWave_Raw', 'utf-8');


// const lines = textData.split('\n');
// const dataRows = lines.map(line => line.split(','));



// const db = new sqlite3.Database('dataabase.db');


// db.serialize(async() => {
  
//   db.run('CREATE TABLE IF NOT EXISTS YourTable (Name TEXT,Age INT,Country TEXT,Mobile TEXT, Email TEXT)');

//   const stmt = db.prepare('INSERT INTO YourTable (Name,Age,Country,Mobile,Email) VALUES (?,?,?,?,?)');
//   dataRows.forEach(row => {
//     const items=row.map(each=>each.split("|"))
   
    
//     stmt.run(items[0][1], items[0][2],items[0][3],items[0][4],items[0][5]);
    
//   });
//   stmt.finalize();

//   console.log('Data inserted into SQLite database');
//   const query='select * from YourTable'
// const ou= await db.all(query)
// console.log("DDd",ou);
// });









app.get('/', (req, res) => {
  res.send('SQLite Server is running!');
});
app.post('/users',async (req,res)=>{
  
  const search=req.body
  let output=""
 
  fs.readFile('./NxtWave_Raw', 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading file:', err);
      return;
    }
  
    
    if (data.includes(search)) {
      output=`Found '${search}' in the file.`;
    } else {
      output=`'${search}' not found in the file.`;
    }
    res.send({message:output})
    console.log("ou",output);
  });
  
  
})


