
var on = false, laatstgedrukt = "", huidigefunctie ="", geheugen;

function testoverflow() {
    var overflowflag;
    if (geheugen >= 1000000000000) {
        zet("error");
        overflowflag = true;
    }
    else
        overflowflag = false;
    return overflowflag;
}

function zoekmaxlengte(plaats) {
    var maxlengte = 12;
    if (plaats.indexOf("-", 0) != -1) maxlengte++;
    if (plaats.indexOf(".", 0) != -1) maxlengte++;
    return maxlengte;
}

function toonuitkomst(lg, hf) {
    geheugen = geheugen.toString();
    geheugen = parseFloat(geheugen.substring(0,zoekmaxlengte(geheugen)));
    document.rekenmachien.display.value = geheugen;
    laatstgedrukt = lg;
    huidigefunctie = hf;
}

function zet(onoff) {
    if (onoff == "ce") {
        if (on) {
            document.rekenmachien.display.value="0";
        }
    }
    else {
        switch (onoff) {
            case "onc":
                document.rekenmachien.display.value="0";
                on = true;
                break;
            case "error":
                document.rekenmachien.display.value = "ERROR";
                break;
            case "off":
                document.rekenmachien.display.value="";
                on = false;
                break;
        } 
        huidigefunctie = "";
        geheugen = null;
    }
    laatstgedrukt = "";
}

function number(input) {
    if (on) {
        if ((document.rekenmachien.display.value.length < zoekmaxlengte(document.rekenmachien.display.value)) || (laatstgedrukt != "number")) {
            if (!((document.rekenmachien.display.value == "0") && ((input == "00") || (input == "0")))) {
                if ((laatstgedrukt == "number")&&(document.rekenmachien.display.value != "0")) {
                    document.rekenmachien.display.value += input;
                    laatstgedrukt = "number";
                }
                else if (input != "00") {
                    document.rekenmachien.display.value = input;
                    laatstgedrukt = "number";
                }
            }
        }
    }
}

function functie(symbool) {
    if ((on) && (document.rekenmachien.display.value != "ERROR")) {
        if (geheugen == null) {
            geheugen = parseFloat(document.rekenmachien.display.value);
            laatstgedrukt = "functie";
            huidigefunctie = symbool;
        }
        else if ((document.rekenmachien.display.value == "0") && (huidigefunctie == "/")) {
            zet("error");
        }
        else {
            eval("geheugen = " + geheugen + huidigefunctie + "(" + document.rekenmachien.display.value +");");
            if (! testoverflow()) toonuitkomst("functie", symbool);
        }
    }
}

function uitkomst(naam) {
    var waarde;
    if ((on) && (document.rekenmachien.display.value != "ERROR")) {
        if (geheugen != null) {
            waarde = document.rekenmachien.display.value;
            if (naam == "procent") waarde = geheugen * parseFloat(document.rekenmachien.display.value)/ 100; 
            eval("geheugen = " + geheugen + huidigefunctie + "(" + waarde +");");
            if (! testoverflow()) {
                toonuitkomst("naam", "");
                geheugen = null;
            }		
        }
    }
}

function punt() {
    var maxlengte = 12;
    if ((on) && (document.rekenmachien.display.value != "ERROR")) {
        if (document.rekenmachien.display.value.indexOf("-", 0) != -1) maxlengte++;
        if (((laatstgedrukt == "number") || (document.rekenmachien.display.value="0")) && !(document.rekenmachien.display.value.length >= maxlengte) && (document.rekenmachien.display.value.indexOf(".", 0) == -1)) {
            document.rekenmachien.display.value += ".";
            laatstgedrukt = "number";
        }
    }
}

function negatief() {
    if ((on) && (laatstgedrukt == "number") && (document.rekenmachien.display.value != "ERROR")) {
        if (document.rekenmachien.display.value.indexOf("-", 0) == -1) document.rekenmachien.display.value = "-" + document.rekenmachien.display.value;
        else document.rekenmachien.display.value = document.rekenmachien.display.value.substring(1,14);
    }
}