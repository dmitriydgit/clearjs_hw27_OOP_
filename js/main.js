"use strict";
 
const domsForLoginform = {
    email : document.querySelector("#inputEmail"),
    password : document.querySelector("#inputPassword"),
    checkBoxRemememberMe : document.querySelector("#inputRemember"),
    submitBtn : document.querySelector("#submitBtn"),
    showUserDataBtn : document.querySelector("#showUserDataBtn"),
    showGalleryBtn : document.querySelector("#showGalleryBtn"),
    personPage : document.querySelector("#person"),
    form : document.querySelector("#myForm"),
    backBtn : document.querySelector("#reload"),
    togglePasswordBtn : document.querySelector("#eye"),
    personNameField : document.querySelector("#person-email"),
    personPasswordField : document.querySelector("#person-password"),
    gallery : document.querySelector("#gallery"),
    personNavbar : document.querySelector("#personNavbar"),
    resultBlock : document.querySelector('#result')
};

const domsForValidator = {
    alertMsg : document.querySelector("#alert-massage1"), 
    notFilledEmailMsg : document.querySelector("#notFilledEmailMsg"),
    notFilledPassMsg : document.querySelector("#notFilledPassMsg"),
    wrongEmailMsg : document.querySelector("#wrongEmailMsg"),
    wrongPassMsg : document.querySelector("#wrongPassMsg")
};

const domsForGallery = {
    resultBlock : document.querySelector('#result'),
    sortBlock : document.querySelector("#type-selector"),
    counter : document.querySelector('#counter'),
    backCounter : document.querySelector('#back-counter'),
    modal : document.querySelector("#myModal")
};

let Inher = function(parent , child){
    this.parent = parent;
    this.child = child;
};
Inher.prototype = {
    inherit : function () {
            let tempChild = this.child.prototype;
            this.child.prototype = Object.create(this.parent.prototype);
            this.child.prototype.constructor = this.child;
        
            for (let key in tempChild) {
                if (tempChild.hasOwnProperty(key)) {
                    this.child.prototype[key] = tempChild[key];
                }
            }
    }
}

let validatorModule = new Validator(domsForValidator);

//let galleryModule = new BaseGallery();

let inheritance = new Inher(BaseGallery , ExtendedGallery);
inheritance.inherit();

//inheritance(BaseGallery, ExtendedGallery);
let galleryModule = new ExtendedGallery();
    
let loginForm = new LoginForm(validatorModule , galleryModule , domsForLoginform);
loginForm.initComponent();









// 3. реализовать с помощбю localStorage   и  isUserLogedIn запоминание, на какой странице юзер был перд выходом 
/*   видео на  5*00мин
если удалось успешно зайти, то после перезагрузки страницы пользователь не может увидеть
 форму ввода пароля, а сразу видит галерею. (Такое же поведение, как и везде. Если вы 
    вошли в почту, то после обновления страницы вы видите не форму входа, а список писем).
 */

// 1.попробовать преписать на es6 - (в задании надо ес 5)  ++++
// 2.реализовать расширенное задание( унаследовать из клаасса basegallery - ExtendedGallery) ++
//hазобратся с взаимодействием модулей   +

//loginForm.validate();
//console.log(validatorModule);
//console.log(galleryModule);





//  function inheritance(parent, child) {
//     let tempChild = child.prototype;
//     child.prototype = Object.create(parent.prototype);
//     child.prototype.constructor = child;

//     for (let key in tempChild) {
//         if (tempChild.hasOwnProperty(key)) {
//             child.prototype[key] = tempChild[key];
//         }
//     }
// }



