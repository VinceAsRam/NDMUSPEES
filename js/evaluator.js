var mysql = require('mysql');

var evaluate = document.getElementById("evaluate");


evaluate.addEventListener("click", () => {
    var newContent = '';
    var connection = mysql.createConnection({

        host: '127.0.0.1',
        user: 'root',
        password: null,
        database: 'spees'
    });
    connection.connect((err) => {
        if (err) {
            return console.log(err.stack);
        }
        else
            console.log("Connection Successfully established");
    });
    $queryString = 'Select * from `evaluator`';

    connection.query($queryString, (err, rows, fields) => {
        if (err) {
            return console.log("Error Occured from Query!", err);
        }
        console.log(rows);

        newContent += "Welcome " + rows[0].E_FName + " " + rows[0].E_MName + " " + rows[0].E_LName;
        document.getElementById("evalcontent").innerHTML = newContent;
    });   
     connection.end(() => {
        console.log("Connection Successfully Closed");
    });


}, false);