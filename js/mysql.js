var mysql = require('mysql');
const notifier = require('node-notifier');
var username = '';
var pass = '';

var i = 0;
var thisID=0;
const { remote } = require('electron')

document.getElementById("profile").addEventListener("click", () => {
    var tableBody = '';
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


    $queryString = 'Select * from `student`';

    connection.query($queryString, (err, rows, fields) => {

        if (err) {
            return console.log("Error Occured from Query!", err);
        }
        console.log(rows);
        for (var i = 0; i < rows.length; i++) {
            tableBody += '<tr class="item">';
            tableBody += '<td><i class="fa fa-user w3-xxlarge"></i><button class="w3-button w3-teal" onclick="document.getElementById("student0' + i + '">' + rows[i].StudentID + '</button></td>';
            tableBody += '<td>' + rows[i].S_LName + '</td>';
            tableBody += '<td>' + rows[i].S_FName + '</td>';
            tableBody += '<td>' + rows[i].S_MName + '</td>';
            tableBody += '<td>' + rows[i].CourseCode + '</td>';
            tableBody += '<td>' + rows[i].YearLevel + '</td>';
            tableBody += '</tr>';
            thisStudent[i] = rows[i].S_FName + " " + rows[i].S_MName + " " + rows[i].S_LName;
            console.log(thisStudent[i]);
            document.getElementById('tablebody').innerHTML = tableBody;
            thisID++;
        }

    });

    connection.end(() => {
        console.log("Connection Successfully Closed");
    });


}, false);

document.getElementById("addStudent").addEventListener("click", () => {
    ID = document.getElementById("studentid").value;
    var FName = document.getElementById("firstname").value;
    var LName = document.getElementById("lastname").value;
    var MI = document.getElementById("MI").value;
    var yearlevel = document.getElementById("yearlevel").options[document.getElementById("yearlevel").selectedIndex].text;
    var CourseCode = document.getElementById("course").options[document.getElementById("course").selectedIndex].text;
    var modal = document.getElementById("modal");


    var connection = mysql.createConnection({
        host: '127.0.0.1',
        user: 'root',
        password: null,
        database: 'spees'
    });
    var $queryString = "insert into student VALUES" +
        "(" + ID + ", '" +
        FName + "', '" +
        LName + "', '" + MI
        + "', " + "'BSIT-1314', '" +
        CourseCode + "', '" +
        yearlevel + "');";
    connection.query($queryString, (err, rows, fields) => {
        if (err) {
            console.log("Unable to add Rows", err);
        }
        else {
            console.log("Added Student!");
        }
    })
    connection.end(() => {
        console.log("Connection Successfully Closed");

    });

}, false);
document.getElementById("subject").addEventListener("click", () => {
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
    $queryString = 'Select * from `subjects` where Prerequisite LIKE "%"';

    connection.query($queryString, (err, rows, fields) => {
        if (err) {
            return console.log("Error Occured from Query!", err);
        }
        console.log(rows);
        for (var i in rows) {
            newContent += '<button class="w3-button><tr class="item">';
            newContent += '<td>' + rows[i].SubjectCode + '</td>';
            newContent += '<td>' + rows[i].SubjDescription + '</td>';
            newContent += '<td>' + rows[i].CreditUnits + '</td>';
            newContent += '<td>' + rows[i].LecUnits + '</td>';
            newContent += '<td>' + rows[i].LabUnits + '</td>';
            newContent += '<td>' + rows[i].Prerequisite + '</td>';
            newContent += '</tr></button>';
            document.getElementById('subjectbody').innerHTML = newContent;
        }

    });
    connection.end(() => {
        console.log("Connection Successfully Closed");
    });


}, false);
document.getElementById("addSubjectNow").addEventListener("click", () => {

    var subjectcode = document.getElementById("subjectcode").value;
    var subjectDesc = document.getElementById("subjectdesc").value;
    var prerequisite = document.getElementById("prerequisite").value;
    var SubjectType = document.getElementById("SubjectType").options[document.getElementById("SubjectType").selectedIndex].text;
    var units = document.getElementById("creditUnits").value;
    var labunits = document.getElementById("labUnits").value;
    var lecunits = document.getElementById("lecUnits").value;
    var yrlvl = document.getElementById("YearLevel").options[document.getElementById("YearLevel").selectedIndex].text;
    var connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: null,
        database: 'spees'
    });
    var $queryString = "insert into subjects VALUES"
        + "('" + subjectcode + "', '"
        + subjectDesc + "', '"
        + units + "', '"
        + lecunits + "', '"
        + labunits + "', '"
        + SubjectType + "', '"
        + YearLevel + "', '"
        + prerequisite + "')";
    connection.query($queryString, (err, rows, fields) => {
        if (err) {
            console.log("Unable to add Rows", err);
        }
        else {
            var onError = function (err, response) {
                console.error(err, response);
            };
            console.log("Added Student!");

        }
    })
    connection.end(() => {
        console.log("Connection Successfully Closed");

    });

}, false);


/*
        Notification Code
            notifier.notify({
                message: "Successfully Added Student",
                title: "Subject",
                // Special sound
                // Case Sensitive string for location of sound file, or use one of OS X's native sounds
                // Only Notification Center or Windows Toasters
                sound: true,//"Bottle",
                // The absolute path to the icon of the message
                // (doesn't work on balloons) 
                // If not found, a system icon will be shown
                icon: "C:/Users/Clueless/electron-quick-start/resources/logo.png",
                // Wait with callback (onClick event of the toast), until user action is taken against notification
                wait: true
            }, onError);

            notifier.on('click', function (notifierObject, options) {
                // Triggers if `wait: true` and user clicks notification
                alert("Callback triggered");
            });**/
