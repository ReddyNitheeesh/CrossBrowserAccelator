// const c = require("background.js") ;
// import { saveToStorage } from './background.js';
let myObject =[];

setUpHooks();

var observer = new MutationObserver(function (mutations) {
	setUpHooks();
});

// configuration of the observer:
var config = { 
    attributes: true,
    characterData: true,
    childList: true,
    subtree: true
};
observer.observe(document.body, config);

function newProcessEvent(event) {
	//everything we want to store from 	the event
	
	let EventObject = {};
	EventObject.type = event.type;
	EventObject.tagName = event.currentTarget.tagName
	EventObject.textContent = event.currentTarget.textContent;
	EventObject.value = event.currentTarget.value;
	EventObject.id = event.currentTarget.id;
	EventObject.alt = event.currentTarget.alt;
	EventObject.name = event.currentTarget.name;
	EventObject.title = event.currentTarget.title;
	EventObject.className = event.currentTarget.className;
	EventObject.timingsObject = performance.getEntriesByType('navigation')[0];
	EventObject.tabUrl = document.URL;
	EventObject.tabTitle = document.title;
	EventObject.style = event.currentTarget.style;
	

	//go deeper into a nested image.
	nestedImage = event.currentTarget.getElementsByTagName("img")[0];
	if (nestedImage != undefined) {
		EventObject.NestedImage_title = nestedImage.title;
		EventObject.NestedImage_alt = nestedImage.alt;
	}
	else {
		EventObject.NestedImage_title = "";
		EventObject.NestedImage_alt = "";
    }

    appendStorageArrayWithNewVal("Intial", EventObject);
    injectCode();
   
    // console.log("Data stored in object:",myObject);
}

function setUpHooks() {
	
    //configured for most web pages
    //clickable items
    configureListener('click', 'a');
    configureListener('click', 'button');
    configureListener('click', 'input');

    //change items
    configureListener('change', 'input');
    configureListener('change', 'select');
	
}
function configureListener(listenerType, tag) {
	for (i = 0; i < document.getElementsByTagName(tag).length; i++) {
		//remove first to prevent duplicate
		document.getElementsByTagName(tag)[i].removeEventListener(listenerType, newProcessEvent);
		document.getElementsByTagName(tag)[i].addEventListener(listenerType, newProcessEvent);
	}
}


function GetFromStorage(key)
{
    return new Promise(function (resolve, reject) {
		chrome.storage.local.get([key], function (data) {
			if(Array.isArray(data[key])){
				//console.log('Storage debug :: Read array :: ' + key + ' :: size: ' + data[key].length);
			}
			resolve(data[key]);
		});
	});
}



//helper to append to a storage value
function appendStorageArray(key, val) {
	GetFromStorage(key).then(function (existingVal) {
		if(Array.isArray(existingVal)){
			//append with concat and save
			newarr = existingVal.concat(val);
			saveToStorage(key, newarr);
		}
		else {
			//just save the array neat
			saveToStorage(key, val);
		}
	});
}

//helper to move a string to array and store it
function appendStorageArrayWithNewVal(key,val)
{
	var arr = [];
	arr.push(val);
	appendStorageArray(key, arr);
}

function saveToStorage(key, val) {
	chrome.storage.local.set({ [key] : val }, function () {
		// if(Array.isArray(val)){
		// 	//console.log('Storage debug :: Save array :: ' + key + ' :: save size: ' + val.length);
		// }
	});
}
function clearStorageArrays(){
	var empty = [];
	saveToStorage("actions", empty);
	saveToStorage("identifiers", empty);
	saveToStorage("urls", empty);
	saveToStorage("titles", empty);
	saveToStorage("screenshot", empty);
	saveToStorage("elementObject", empty);
}

const nullthrows = (v) => {
    if (v == null) throw new Error("it's a null");
    return v;
}

function injectCode() {

	GetFromStorage("Intial").then(function(val) {
        if(val !== undefined){
			
			// const script1 = document.createElement('Mahesh');
			const script = document.createElement('CrossBrowserTesting');
			// This is why it works!
			// script.innerHTML = val;
			let c = Object.values(val);
			// let myKeysArr = ;
			script.innerHTML = JSON.stringify(Object.values(c));			
			
			// This script runs before the <head> element is created,
			// so we add the script to <html> instead.
			var element = document.querySelector("CrossBrowserTesting");
			if (typeof(element) != 'undefined' && element != null)
			{
				element.remove();
			}
			
					
			nullthrows(document.head || document.documentElement).appendChild(script);
			// ullthrows(document.head || document.documentElement).appendChild(script1);
		
		
			// console.log("Data stored in object:",val);
		
		}
	});
    
}

injectCode();



