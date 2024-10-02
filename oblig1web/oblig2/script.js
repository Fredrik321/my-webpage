const dynaContainer = document.getElementById("dynaContainer");


loadDoc();
loadDoc();
loadDoc();

//makes it so different posts are acquired each time
let i =0;

function loadDoc() {
    const url = 'https://jsonplaceholder.typicode.com/posts';
    fetch(url)
    .then(response => {
    
    if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.text();
    }).then(data => {
        const dataobj = JSON.parse(data); 
        for(let x = 0;x<3;x++){
            let postdiv = document.createElement('div');
            let posttext = document.createElement(`p`)
            posttext.innerHTML = `Userid: ${dataobj[i].userId} <br>PostId: ${dataobj[i].id}<br>
            title:<b> ${dataobj[i].title}</b><br><br> ${dataobj[i].body}`;
            postdiv.classList.add('dynabox');
            postdiv.appendChild(posttext);
            dynaContainer.appendChild(postdiv)
            i++;
        }
    }).catch(error => {
        console.log(error.message)
    });
   }
    // The data seem to be wrong, maybe i am doing the latitude/lontidue a bit wrong, but this is suppose to show weather data for the various places
    let Tokyo = "https://api.open-meteo.com/v1/forecast?latitude=35.6895&longitude=139.6917&current_weather=true"
    let London = "https://api.open-meteo.com/v1/forecast?latitude=51.5072&longitude=0.1276&current_weather=true";
    let Oslo = "https://api.open-meteo.com/v1/forecast?latitude=59.9139&longitude=10.75226&current_weather=true";
    let NY = "https://api.open-meteo.com/v1/forecast?latitude=40.7128&longitude=74.0060&current_weather=true";
    let Cairo = "https://api.open-meteo.com/v1/forecast?latitude=30.0444&longitude=31.2357&current_weather=true";

   //strong containing the html code the table head
   let tableString = `<tr>
   <th>Country</th>
   <th>Temperature</th>
   <th>Wind</th>
   <th>Wind direction</th>
 </tr>
 `;
    // every two minutes the weather data is updated. 
    setInterval(loadAll, 30000);
   
    

    loadAll();
    //this function creates the tables head and calls on the loadWEather function for all the places 
    function loadAll(){

        document.getElementById("weatherTable").innerHTML ="";
        document.getElementById("weatherTable").innerHTML =tableString;
        loadWeather("Tokyo",Tokyo);
        loadWeather("London",London);
        loadWeather("Oslo",Oslo);
        loadWeather("NY",NY);
        loadWeather("Cairo",Cairo);

    }
    function loadWeather(cnt,url){
    fetch(url)
    .then(response => {
    
    if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.text();
    }).then(data => {
        const dataobj = JSON.parse(data); 
       
        let row = document.createElement('tr');
        let country = document.createElement('td');
        let temp = document.createElement('td');
        let wind = document.createElement('td');
        let windD = document.createElement('td');
        
        country.innerHTML = `${cnt}   `;
        temp.innerHTML = ` ${dataobj.current_weather.temperature}°`;
        wind.innerHTML = `${dataobj.current_weather.windspeed} m/s`;
        windD.innerHTML = `${dataobj.current_weather.winddirection}`;
        windD.innerHTML = `&#8593`;
        windD.style.transform= `rotate(${dataobj.current_weather.winddirection}deg)`;
        
        row.appendChild(country);
        row.appendChild(temp);
        row.appendChild(wind);
        row.appendChild(windD);
        document.getElementById("weatherTable").appendChild(row);
       
    }).catch(error => {
    console.log(error.message)
    });
   }