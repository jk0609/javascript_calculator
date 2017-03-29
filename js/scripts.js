$(document).ready(function(){
  var firstOp = true;//switch to determine if an operation chain is currently in progress, used to determine * and / behavior on first operation. Reset on AC/=.
  var equalOn = false;//switch turned on after equal button is hit, turned off by next operation. Determines behavior of next button press and prevents multiple equal presses from spamming text.
  var opOn = false;//similar to equalOn, determines number button behavior and prevents sequential operator presses from doing anything.
  var operator = "";//holds operator (+-*/)
  var num1 = "";//holds accumulating number value
  var num2 = "";//holds current number value
  var tempNum = {};
  var operations = {//object made so operation symbols can be stored in a variable
    "+":function(a,b){return a+b},
    "-":function(a,b){return a-b},
    "*":function(a,b){
      if(a===0&&firstOp===true){
        return b;
      }else{
        return a*b;
      }
    },
    "/":function(a,b){
      if(a===0&&firstOp===true){
        return b;
      }else{
        return a/b;
      }
    },
  }//operations end

  function lengthText(){//run at the end of operator/number inputs, ensures display doesn't spill over "screen"
    if(document.getElementById('results').innerHTML.length>=9){
      $("#ceBut").trigger('click');
      document.getElementById('results').innerHTML = 'Digit Limit';
    }
  }

  function decCheck(num){//checks for decimal places, rounds off 0, 1 or 2 decimals.
    var arr = String(num).split("");
    if(arr.indexOf(".")!==-1&&arr.length===arr.indexOf(".")+2){
      return num.toFixed(1);
    }else if(arr.indexOf(".")!==-1){
      return num.toFixed(2);
    }else{
      return num;
    }
  }

  $(".numBut").click(function() {//Number buttons, if its the first operator assigns the input number to variable num1, otherwise num1 is the running total and inputs are stored to num2.
    if(firstOp===true){
      num1 += this.value;
      document.getElementById('results').innerHTML = num1;
    }else if(equalOn===true){
      firstOp = true;
      num1 = this.value;
      num2 = "";
      document.getElementById('results').innerHTML = this.value;
      $('#calcs').empty();
      equalOn = false;
    }else{
      num2 += this.value;
      document.getElementById('results').innerHTML = num2;
      document.getElementById('calcs').innerHTML += this.value;
    }
    opOn = false;
    lengthText();
  });//numBut

  $(".opBut").click(function() {//Operator buttons, runs calculation between the 2 stored numbers based on stored value in the 'operator' variable. Assigns output to num1 and resets num2.
    lengthText()
    if(opOn===false){
      document.getElementById('results').innerHTML = this.value;
      if(firstOp===true){
        document.getElementById('calcs').innerHTML += num1+" "+this.value+" ";
        firstOp = false;
      }else if(equalOn===true){
        document.getElementById('calcs').innerHTML = decCheck(operations[operator](parseFloat(num1),parseFloat(num2)))+" "+this.value+" ";
        num1 = operations[operator](parseFloat(num1),parseFloat(num2));
        num2 = "";
        equalOn = false;
      }else{
        tempNum.first = num1;
        tempNum.second = num2;
        document.getElementById('calcs').innerHTML += " "+this.value+" ";
        num1 = operations[operator](parseFloat(num1),parseFloat(num2));
        num2 = "";
      }
      operator = this.value;
      opOn = true;
      lengthText();
    }
  });//opBut

  $("#equalBut").click(function(){//= button, shows results that are already calculated by operator buttons.
    if(equalOn===false){
      equalOn = true;
    document.getElementById('results').innerHTML = decCheck(operations[operator](parseFloat(num1),parseFloat(num2)));
    document.getElementById('calcs').innerHTML += ' = '+ decCheck(operations[operator](parseFloat(num1),parseFloat(num2)));
    opOn = false;
    }
  })//equalBut

  $("#ceBut").click(function(){//CE button
    if(firstOp===true){
      equalOn = false;
      opOn = false;
      num1 = "";
      num2 = "";
      $('#results').empty();
      $('#calcs').empty();
    }else if(equalOn===false){
      var strung = document.getElementById('calcs').innerHTML.toString();
      if(opOn===true){
        document.getElementById('calcs').innerHTML = strung.substring(0,strung.length-2);
        $('#results').empty();
        num1 = tempNum.first;
        num2 = tempNum.second;
        opOn = false;
      }else{
        document.getElementById('calcs').innerHTML = strung.substring(0,strung.indexOf(num2));
        $('#results').empty();
        num2 = "";
      }
    }
  })//ceBut

  $("#acBut").click(function(){//AC button
    firstOp = true;
    equalOn = false;
    opOn = false;
    num1 = "";
    num2 = "";
    $('#results').empty();
    $('#calcs').empty();
  })//acBut

});//doc ready end
