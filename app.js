//function to get the content of a csv file, returns an object of two arrays: headers, rows 
//headers -> array of strings: ["Nombre", "Edad", "Sexo"]
//rows -> array of arrays of strings: [["Juan", "28", "M"], ["Laura", "19", "F"]]
const getCSVData = async (fileName) => {
	try{
		const response = await fetch(fileName);
		if (!response.ok) throw new Error(`Error al obtener el archivo: ${response.status} ${response.statusText}`);
		const data = await response.text();
		const csvData = data.trim().split("\n");
		const headers = csvData[0].split(","); //returns an array with all headers		
		const rows =  csvData.slice(1).map(row => row.split(",") );// returns an array with all rows
		return { headers, rows}; //returns an object containing headers and rows
		
	} catch(e){
		console.error(e);
	}
}


//Loader
const loader = document.getElementById("loading-spinner");


//items elements
const itemsGroup = document.getElementById("items-group");
const itemsList1 = document.getElementById("items-list-1");
const itemsList2 = document.getElementById("items-list-2")


const data = getCSVData("sample-data.csv");

data.then(data => {
	//creates list of items
	data.rows.forEach((row, index) => {
		const li = document.createElement("li");
		li.classList.add("list-group-item", "grid");
		li.textContent = row[0]; //row[0] contains full name

		//checks if item goes in itemsLIst1 or itemsList2 
		index % 2 === 0 ? itemsList1.appendChild(li) : itemsList2.appendChild(li);
	})
	
	//hidding loader and showing elements
	loader.style.display = "none";
	itemsGroup.style.display = "flex";

});