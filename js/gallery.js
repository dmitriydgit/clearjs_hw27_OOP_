"use strict";
let BaseGallery = function () {	
    this.DOMElements = {
            resultBlock:document.querySelector('#result'),
            sortBlock:document.querySelector("#type-selector"),
            counter:document.querySelector('#counter'),
            backCounter:document.querySelector('#back-counter'),
            modal:document.querySelector("#myModal")
    }
    this.cardsLimit = 10;
    this.imageCounter = 0;
    this.readyDataForGallery = []; //массив подготовленных эл-в
    this.visibleData = []; //массив эл-в, которые есть на экране
    this.deletedData = []; //массив удаленных эл-в
}

BaseGallery.prototype = {
    init: function(){                                                 
        this.initListeners();
        this.prepareData();
    },     
    initListeners : function(){
        this.DOMElements.sortBlock.addEventListener("change", this.sortGallery.bind(this));
    },
    prepareData : function() {
        this.DOMElements.sortBlock.value = localStorage.sortMethod ? localStorage.sortMethod : "0";
        this.readyDataForGallery = data.map((item, index) => {                 
					return {
                    url: item.url,
                    name: item.name,
                    description: item.description,
                    date: item.date,
                    id: "card_" + index
                    }
        });
    },
    sortGallery : function (){
        switch (this.DOMElements.sortBlock.value) {
            case "0":
                this.visibleData.sort((a , b) => (a.name > b.name));
                localStorage.setItem('sortMethod', '0');
                break;
            case "1":
                this.visibleData.sort((a , b) => (a.name > b.name));
                localStorage.setItem('sortMethod', '1');
                break;
            case "2":
                this.visibleData.sort((a , b) => (a.name < b.name));
                localStorage.setItem('sortMethod', '2');
                break;
            case "3":
                this.visibleData.sort((a , b) => (a.date < b.date));
                localStorage.setItem('sortMethod', '3');
                break;
            case "4":
                this.visibleData.sort((a , b) => (a.date > b.date));
                localStorage.setItem('sortMethod', '4');
                break;
        }
        this.reBuildGallery(this.visibleData);
    },
    reBuildGallery : function(array){
        this.DOMElements.resultBlock.innerHTML = "";
        for (let i = 0; i < array.length; i++) {    
            this.DOMElements.resultBlock.innerHTML += this.galleryItem(array[i], i+1); //i +1 для номера изображения кот динамически						
        }
        this.imageCounter = array.length;
        this.DOMElements.counter.innerHTML = this.imageCounter;
        this.DOMElements.backCounter.innerHTML = this.readyDataForGallery.length - this.imageCounter;
        this.checkLimit(); 
    },
    galleryItem : function(item, index) {
        return `<div class="col-md-4">
                    <div class="card mb-4 box-shadow gallery-item" id = "${item.id}">
                        <img src="${this.urlFomat(item.url)}" alt="${this.nameFormat(item.name)}" class="card-img-top" data-src="holder.js/100px225?theme=thumb&amp;bg=55595c&amp;fg=eceeef&amp;text=Thumbnail" data-holder-rendered="true" style="height: 225px; width: 100%; display: block;">
                        <div class="card-body">
                            <div class="card-text">${index}: ${this.nameFormat(item.name)}</div>
                            <div class="text-muted top-padding">${this.descriptionFormat(item.description)}</div>
                            <div class="text-muted">${this.dateFormat(item.date)}</div>
                            <div  name = "delete-img" class = "btn btn-danger" title = "Удалить данное изображение"> Удалить </div>
                        </div>
                        
                    </div>
                </div>`;
    },
    nameFormat : function(name){
        return  name ? name[0].toUpperCase() + name.substring(1).toLowerCase() : "Lohn Doh";
    },
    urlFomat : function (url){
        return  url.indexOf("http://") === -1 ? `http://${url}` :  url; 
    },
    descriptionFormat : function (descr) {
        return (descr.length > 15 ) ? descr.substring(0 , 15) + "..." : descr;
    },
    dateFormat : function (date){
        let format = "YYYY/MM/DD HH:mm";
        return  (!date.isNaN) ? moment(date).format(format) : console.log("Error, data is incorrect") ;
    },
    print : function (data){
        console.log(data);
    },
    
    checkLimit : function (){
        if (this.imageCounter < this.cardsLimit) {
            this.DOMElements.addImgBtn.removeAttribute( "disabled");
            this.DOMElements.addImgBtn.style.backgroundColor = "#337ab7";
            this.DOMElements.addImgBtn.removeAttribute("data-toggle");
        }
        if (this.imageCounter === this.cardsLimit) {
            this.DOMElements.addImgBtn.setAttribute( "disabled", "true");
            this.DOMElements.addImgBtn.style.backgroundColor = "grey";
            this.DOMElements.addImgBtn.setAttribute("data-toggle", "modal");
         }
    },
    clearGallery: function(){
        this.visibleData = [];
        this.deletedData = [];
        this.imageCounter  = 0;
        this.reBuildGallery(this.visibleData);
    },
};

//  let baseGallery = new BaseGallery();
//  baseGallery.init();   

let ExtendedGallery = function() {
    BaseGallery.apply(this);
	this.DOMElements.addImgBtn = document.querySelector("#add-img");
}
ExtendedGallery.prototype = {
    initListeners : function (){
        if(localStorage.isGalleryInited == "1"){
            return false;
        }
        BaseGallery.prototype.initListeners.apply(this);
        this.DOMElements.addImgBtn.addEventListener("click", this.addImage.bind(this)); 
        this.DOMElements.resultBlock.addEventListener("click", this.deleteImage.bind(this));   
    },
    addImage : function(){
        this.prepearDataToAdd();
        this.sortGallery();
        
    },
    prepearDataToAdd : function(){
        if (this.deletedData.length == 0) {
            for (let item of this.readyDataForGallery) {
                if(this.visibleData.indexOf(item) === -1 ) {
                    this.visibleData.push(item);
                    break;
                }
            }
        }
        if (this.deletedData.length !== 0) {
            let temp;
            temp = this.deletedData.pop();
            this.visibleData.push(temp);
        }
    },
    findIndexWithId : function (id, array){
        let temp;
        array.forEach( elem => {
            if(elem.id === id) {
                temp = array.indexOf(elem);
            }
        })
        return temp;
    },
    deleteImage : function (event){
        let tempId,
          deletedItem,
          target = event.target;
        
          if (target.classList.contains("btn-danger")){
            tempId = target.closest(".gallery-item").id;
            deletedItem = this.visibleData[this.findIndexWithId(tempId, this.visibleData)];
            this.deletedData.push(deletedItem);
            this.visibleData.splice(this.visibleData.indexOf(deletedItem), 1);
            this.DOMElements.addImgBtn.disabled = false;
            this.reBuildGallery(this.visibleData);
            this.checkLimit();
        }
    },
}
