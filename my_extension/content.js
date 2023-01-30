let myObject = [];
document.addEventListener("click", function(event) {
    // console.log("Mahesh log",event.target)
    let EventObject = {};
	EventObject.type = event;
	EventObject.tagName = (event.target).tagName
	EventObject.textContent = (event.target).textContent;
	EventObject.value = (event.target).value;
	EventObject.id = (event.target).id;
	EventObject.alt = (event.target).alt;
	EventObject.name = (event.target).name;
	EventObject.title = (event.target).title;
	EventObject.className = (event.target).className;
	EventObject.timingsObject = performance.getEntriesByType('navigation')[0];
	EventObject.tabUrl = document.URL;
	EventObject.tabTitle = document.title;
    // console.log("Mahesh log1",EventObject);
    appendStorageArrayWithNewVal("Intial", EventObject);
    
    GetFromStorage("Intial").then(function(val) {
        if(val !== undefined){
        // console.log(val.length);
        // console.log(val);
        myObject.push(val[val.length - 1]);
        }
        });
    console.log("Data stored in object:",myObject);

 
    
});




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

function saveToStorage(key, val) {
	chrome.storage.local.set({ [key] : val }, function () {
		if(Array.isArray(val)){
			//console.log('Storage debug :: Save array :: ' + key + ' :: save size: ' + val.length);
		}
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

function clearStorageArrays(){
	var empty = [];
	saveToStorage("actions", empty);
	saveToStorage("identifiers", empty);
	saveToStorage("urls", empty);
	saveToStorage("titles", empty);
	saveToStorage("screenshot", empty);
	saveToStorage("elementObject", empty);
}