var myarray = []
myarray[0] = "\"Thai is the sexiest man alive\" Cheyenne M.";
myarray[1] = "\"A good student.\"Jesus C."; 
myarray[2] = "\"I will gladly do business with him again.\" Elaine B.";
myarray[3] = "\"Yall need more Thai your in life. Thai is life. Thai is love.\" Adam D.";
myarray[4] = "\"Thank you for being a close friend.\" Wesley S.";
myarray[5] = "\"I had a wonderful time at the honor ball with you.\" Jenna S.";


function myFunction() {
    var x = Math.floor(Math.random() * (myarray.length));
    document.getElementById("quotes").innerHTML = myarray[x];
}
myFunction();