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
            let array = [{"show" : [this.DOMEls.notFilledEmailMsg]}]
            this.showHide1(array);
            return false;
        }
        if ( !pass) {
            let array = [{"show" : [this.DOMEls.notFilledPassMsg]}]
            this.showHide1(array);
            return false;
        }
        if ( !this.checkEmail(email)) {
            let array = [{"show" : [this.DOMEls.wrongEmailMsg]}];
            this.showHide1(array);
            return false;
        }
        if ( !this.checkPassword(pass)) {
            let array = [{"show" : [this.DOMEls.wrongPassMsg]}];
            this.showHide1(array);
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
            let array = [{ "show" : [this.DOMEls.alertMsg]}]
            this.showHide1(array);
            return false;
        }
    },
    hideAlertMsgs(){
        let array = [{"hide" : [this.DOMEls.alertMsg,
                                this.DOMEls.notFilledEmailMsg, 
                                this.DOMEls.notFilledPassMsg,
                                this.DOMEls.wrongEmailMsg,
                                this.DOMEls.wrongPassMsg]}
        ];
        this.showHide1(array);
    },
    showHide1(array){    
        array.forEach(object => { 
        for(var key in object) { 
            var key = key;
            var value = object[key]; 
            value.forEach(DOMElem => {
                    DOMElem.classList.remove("show" , "hide");
                    DOMElem.classList.add(key);
                })
            }
        })
    },
     /*showHide(elem, action){    
        if(elem.classList.contains("show")){
            elem.classList.remove("show");
        }
        if(elem.classList.contains("hide")){
            elem.classList.remove("hide");
        }
        elem.classList.add(action);
    },*/
    showHidePass(elem, type){                                          
        elem.setAttribute('type', type);
    },
    print(data) {                                                    
        console.log(data);
    },
   
}






