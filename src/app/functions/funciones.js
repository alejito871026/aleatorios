const f = {};

f.calcularInteresMensual = (montoDinero, interes)=>{
    return  montoDinero*interes/100;
};
f.equals = () => {
    if ((app.current).indexOf("^") > -1) {
      var base = (app.current).slice(0, (app.current).indexOf("^"));
      var exponent = (app.current).slice((app.current).indexOf("^") + 1);
      app.current = ("Math.pow(" + base + "," + exponent + ")");
      
    } else {
     console.log( String.raw`${app.current}`);
  }
}; 
  // our 'C' button
    f.clear = () => {
    app.current = "";
  };
  
  // our '<=' button
    f.backspace = () => {
    app.current = app.current.substring(0, app.current.length - 1);
  };
  
  // our '*' button
    f.multiply = () => {
      backspace
    app.current += "*";
  };
  
  // our '/' button
    f.divide = () => {
    app.current +=  "/";
  };
  
  // our '+' button
    f.plus = () => {
    app.current +=  "+";
  };
  
  // our '-' button
    f.minus = () => {
    app.current +=  "-";
  };
  
  // our '±' button
    f.plusMinus = () => {
    if (app.current.charAt(0) === "-") {
      app.current = app.current.slice(1);
    } else {
      app.current = "-" + app.current;
    }
  };
  
  // our 'x!' button
    f.factorial = () => {
    var number = 1;
    if (app.current === 0) {
      app.current = "1";
    } else if (app.current < 0) {
      app.current = NaN;
    } else {
      var number = 1;
      for (var i = app.current; i > 0; i--) {
        number *=  i;
      }
      app.current = number;
    }
  };
  
  // our 'π' button
    f.pi = () => {
    app.current = (app.current * Math.PI);
  };
  
  // our 'x ²' button
    f.square = () => {
    app.current = (app.current * app.current);
  };
  
  // our '√' button
    f.squareRoot = () => {
    app.current = Math.sqrt(app.current);
  };
  
  // our '%' button
    f.percent = () => {
    app.current = app.current / 100;
  };
  
  // our 'sin' button
    f.sin = () => {
    app.current = Math.sin(app.current);
  };
  
  // our 'cos' button
    f.cos = () => {
    app.current = Math.cos(app.current);
  };
  
  // our 'tan' button
    f.tan = () => {
    app.current = Math.tan(app.current);
  };
  
  // our 'log' button
    f.log = () => {
    app.current = Math.log10(app.current);
  };
  
  // our 'ln' button
    f.ln = () => {
    app.current = Math.log(app.current);
  };
  
  // our 'X^' button
    f.exponent= () => {
    app.current += "^";
  };
  
  // our 'exp' button
    f.exp = () => {
    app.current = Math.exp(app.current);
  };
  
  // our 'rad' button
    f.radians = () => {
    app.current = app.current * (Math.PI / 180);
  };
  
  // our '∘' button
    f.degrees = () => {
    app.current = app.current * (180 / Math.PI);
  };
  
module.exports = f;