// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.
//
//
var mysql = require('mysql');


var thisStudent=[];
var thisGrade=[];
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


$queryString = 'Select * from `student` ';

connection.query($queryString, (err, rows, fields) => {

    if (err) {
        return console.log("Error Occured from Query!", err);
    }
    console.log(rows); 
    for(var i=0;i<rows.length;i++){
    thisStudent[i] = rows[i].S_FName +", " + rows[i].S_MName + " " + rows[i].S_LName;
    thisGrade[i] = rows[i].StudentID;
    }
    connection.end(() => {
        console.log("Connection Successfully Closed");
    });


}, false);

document.getElementById("Grades").addEventListener("click", () => {
    var gradelist= '';
    var semester = document.getElementById("semester").options[document.getElementById("semester").selectedIndex].text;
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
    $queryString = 'SELECT Stud.StudentID,g.SubjectCode,g.Remarks,C.CurriculumCode,Sub.Semester from Student stud inner join grade g on Stud.StudentID=g.StudentID inner join Curriculum_subjects C on g.SubjectCode=C.SubjectCode inner join Subjects sub on sub.SubjectCode=C.SubjectCode where sub.Semester="' +  semester + '" group by SubjectCode;';

    connection.query($queryString, (err, rows, fields) => {                
        if (err) {
                return console.log("Error Occured from Query!", err);
            }
            console.log(rows);
            for (var i = 0; i < thisStudent.length; i++) {
                console.log(thisStudent[i]);
                
                gradelist += '<tr class="item">';
                gradelist += '<td>' + thisStudent[i] + '<button onclick="accordion(' + "'student0"+ (i+1) + "')" +    '"class="w3-button  w3-right-align w3-dark-grey" id="OGrade" style="float:right">View Grades' + "</button>";
                gradelist += '<td><table class="w3-hide w3-table w3-animate-zoom" id="student0' + (i+1)+'"><thead><tr><th>Subject Code</th>';
                gradelist += '<th>Remarks</th></tr></thead>';
                for(var j in rows){
                gradelist += '<tbody class="item"><tr><td>' + rows[j].SubjectCode + '</td>';
                gradelist += '<td>' + rows[j].Remarks + '</td></tr>';
                
                }
                gradelist += '</tbody></table></td>';
                
            }
            
                document.getElementById('GradeList').innerHTML = gradelist;
    });
      
     connection.end(() => {
        console.log("Connection Successfully Closed");
    });


}, false);


//Shows and Hides the content of the Accordion
function accordion(id) {
    var x = document.getElementById(id);
    if (x.className.indexOf("w3-show") == -1) {
      x.className += " w3-show";
    } else {
      x.className = x.className.replace(" w3-show", "");
    }
  }

  document.getElementById("curriculum").addEventListener("click", () => {
    var CurrTable = '';
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


    $queryString = 'select C.CurriculumCode,C.courseCode,co.CrsDescription,DATE_FORMAT(C.EffectiveDate,"%M %d %Y") as StartDate,DATE_FORMAT(C.EndDate,"%M %d %Y") as EndDate from Curriculum C inner join  Course co on C.CourseCode=Co.CourseCode';

    connection.query($queryString, (err, rows, fields) => {

        if (err) {
            return console.log("Error Occured from Query!", err);
        }
        console.log(rows);
        for (var i in rows) {
            CurrTable += '<tr class="item">';
            CurrTable += '<td>' + rows[i].CurriculumCode + '</td>';
            CurrTable += '<td>' + rows[i].courseCode + '</td>';
            CurrTable += '<td>' + rows[i].CrsDescription + '</td>';
            CurrTable += '<td>' + rows[i].StartDate + '</td>';
            CurrTable += '<td>' + rows[i].EndDate + '</td>';
            CurrTable += '</tr>';
            document.getElementById('curtable').innerHTML = CurrTable;
        } 

    });

    connection.end(() => {
        console.log("Connection Successfully Closed");
    });


}, false);
