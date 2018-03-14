"use strict";

/*
nessesary to set as obj such allert masseges :
    alertMsg:document.querySelector("#alert-massage1"),
    notFilledEmailMsg : document.querySelector("#notFilledEmailMsg"),
    notFilledPassMsg : document.querySelector("#notFilledPassMsg"),
    wrongEmailMsg : document.querySelector("#notFilledEmailMsg"),
    wrongPassMsg : document.querySelector("#notFilledEmailMsg")

*/


let Validator  = function (obj) {
    this.DOMEls = obj;
};

Validator.prototype = {
   
    checkEmail :  function (email) {                                                 
        let reg = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return reg.test(email);
    },
    checkPassword(password){
        if(password.length >= 8){
            return true;
        }
    },
    checkFields (email, pass){
        if ( !email) {
            this.showHide(this.DOMEls.notFilledEmailMsg , "show")
            return false;
        }
        if ( !pass) {
            this.showHide(this.DOMEls.notFilledPassMsg , "show")
            return false;
        }
        if ( !this.checkEmail(email)) {
            this.showHide(this.DOMEls.wrongEmailMsg , "show")
            return false;
        }
        if ( !this.checkPassword(pass)) {
            this.showHide(this.DOMEls.wrongPassMsg , "show")
            return false;
        }
        return true;
    },
    checkUser(email, password) {                                         
        if(email === localStorage.email && password === localStorage.password) {
            this.print("itsok");
            return true;
        } else {
            this.print("incorrect");
            this.showHide(this.DOMEls.alertMsg , "show");
            return false;
        }
    },
    hideAlertMsgs(){
        this.showHide(this.DOMEls.alertMsg , "hide");
        this.showHide(this.DOMEls.notFilledEmailMsg , "hide")
        this.showHide(this.DOMEls.notFilledPassMsg , "hide")
        this.showHide(this.DOMEls.wrongEmailMsg , "hide")
        this.showHide(this.DOMEls.wrongPassMsg , "hide")
    },
    showHide(elem, action){    
        if(elem.classList.contains("show")){
            elem.classList.remove("show");
        }
        if(elem.classList.contains("hide")){
            elem.classList.remove("hide");
        }
        elem.classList.add(action);
    },
    showHidePass(elem, type){                                          
        elem.setAttribute('type', type);
    },
    print(data) {                                                    
        console.log(data);
    },
   
}






