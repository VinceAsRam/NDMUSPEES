var mysql = require('mysql');
var username = '';
var pass = '';
const remote = require('electron').remote
var connection = mysql.createConnection({
    host: 'localhost',
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

var $queryString = "Select E_LName,Password from Evaluator";
connection.query($queryString, (err, rows, fields) => {
    if (err) {
        return console.log("Error Occured from Query!", err);
    }
    console.log(rows);
    username = rows[0].E_LName;
    pass = rows[0].Password;


});
document.getElementById("submit").addEventListener("click", () => {
    
    if(username == document.getElementById("usrname").value && pass==document.getElementById("psw").value){
        remote.getCurrentWindow().loadURL('C:/Users/Clueless/electron-quick-start/index.html');
        function myFunction() {
            var x = document.getElementById("snackbar");
  
            x.className = "show";
            // After 3 seconds, remove the show class from DIV
            setTimeout(function () { x.className = x.className.replace("show", ""); }, 5000);
          }
    }
    else{
        alert("Incorrect Account");
        document.getElementById("usrname").value=""
        document.getElementById("psw").value = ""
    }
},false);
document.getElementById("exit").addEventListener("click", () =>{

    window.close();
})