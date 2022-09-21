document.getElementById("searchbar").addEventListener("keyup", function(event) {
    event.preventDefault();
    if (event.key === 'Enter') {
        search();
    }
});

async function search(){
    document.getElementById("searchstatus").innerHTML = "";
    document.getElementById("results").innerHTML = "";
    console.log(document.getElementById("searchbar").value.toLowerCase());
    const url = "releases.json"
    document.getElementById("searchstatus").innerHTML = "Searching...";
    const response = await fetch(url);
    const results = await response.json();    
    results.forEach(element => {  
        // if results has display set to none then set it to block
        if (document.getElementById("results").style.display === "none") {
            document.getElementById("results").style.display = "block";
        }
        var name = element.name.replace(" - jc141", "").replace(" [johncena141]", "");
        // search for the item ignoring case
        if (name.toLowerCase().includes(document.getElementById("searchbar").value.toLowerCase())) {
            console.log(name);
            if (document.getElementById("results").innerHTML == ""){
                document.getElementById("results").innerHTML = `<li class="list-header">
        <span class="list-item-header list-header">Name</span>
        <span class="list-item-header list-header">URL</span>
        <span class="list-item-header list-header">DATE</span>
        <span class="list-item-header list-header">SIZE</span>
        <span class="list-item-header list-header">SEEDS</span>
        <span class="list-item-header list-header">LEECHES</span>
    </li>`;}
            document.getElementById("results").innerHTML += '<li class="list-entry">';
            document.getElementById("results").innerHTML += '<span class="list-item">'+name+'</span>';
            document.getElementById("results").innerHTML += '<span class="list-item">'+element.url+'</span>';
            document.getElementById("results").innerHTML += '<span class="list-item">'+element.date+'</span>';
            document.getElementById("results").innerHTML += '<span class="list-item">'+element.size+'</span>';
            document.getElementById("results").innerHTML += '<span class="list-item">'+element.seeds+'</span>';
            document.getElementById("results").innerHTML += '<span class="list-item">'+element.leeches+'</span>';
            document.getElementById("results").innerHTML += '</li>';
            document.getElementById("searchstatus").innerHTML = "";
        } 
    });
    // if the element is not found then set the display to none
    if (document.getElementById("results").innerHTML == "") {
        document.getElementById("results").style.display = "none";
        document.getElementById("searchstatus").innerHTML = "No results found";
    } 
}

function clearsearch(){
    document.getElementById("searchbar").value = "";
}