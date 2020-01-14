let city = document.querySelector('.city');

let manoAjax = new XMLHttpRequest();
manoAjax.onreadystatechange = function () {
    if (manoAjax.readyState === 4) {
        if (manoAjax.status === 200) {

            let duomenys = JSON.parse(manoAjax.responseText);
            let orai = duomenys.forecastTimestamps;
            let timeCreated = document.querySelector('.timeCreated');
            if(duomenys.forecastCreationTimeUtc.substring(11,13)<24){
                timeCreated.textContent = "Last updated today at "+duomenys.forecastCreationTimeUtc.substring(11,16);
            } else{
                timeCreated.textContent = "Last updated yesterday at "+duomenys.forecastCreationTimeUtc.substring(11,16);
            }

            for(let k=0; k<2; k++){
                let div = document.createElement('div');
                if(k==0){
                    div.className='col-1';
                    city.appendChild(div);
                    let h4 = document.createElement('h4');
                    h4.textContent = duomenys.place.name;
                    div.appendChild(h4);
                } else{
                    div.className='col-11 juosta';
                    city.appendChild(div);
                    let icon = document.createElement('i');
                    icon.className = 'fas fa-plus';
                    div.appendChild(icon)
                    let p = document.createElement('span');
                    p.textContent = " Add to my locations";
                    div.appendChild(p)
                }
            }

            let ciklas = [];
            for(let o in orai){
                let or = orai[o];
                ciklas.push(or.forecastTimeUtc.substring(8,10));
            }

            for(let i = 0; i<=Math.max(...ciklas)-Math.min(...ciklas);i++){
                let maxmin = [];
                let day = parseInt(orai[0].forecastTimeUtc.substring(8, 10)) + i;
                for(let op in orai){
                    let or = orai[op]
                    if(day == or.forecastTimeUtc.substring(8,10)){
                        maxmin.push(or.airTemperature);
                    }
                }
                let days = document.querySelector('.days');
                let col = document.createElement('div');
                if(i == 0){
                    col.className = "col day-active dai";
                    col.setAttribute('id',i);
                    days.appendChild(col);
                } else{
                    col.className = "col day dai";
                    col.setAttribute('id',i);
                    days.appendChild(col);
                }
                for(let k=0; k<2; k++){
                    let row = document.createElement('div');
                    row.className= "row";
                    row.setAttribute('id',i);
                    col.appendChild(row);
                    if(k == 0){
                        let current = document.createElement('p');
                        if(i==0){
                            current.textContent = "Today"
                        } else{
                            let curDay = new Date().getUTCDay()+i;
                            switch (curDay){
                                case 0:
                                    current.textContent = "Sunday "+ getOrdinalNum(Math.min(...ciklas)+i);
                                    break;
                                case 1:
                                    current.textContent = "Monday "+ getOrdinalNum(Math.min(...ciklas)+i);
                                    break;
                                case 2:
                                    current.textContent = "Tuesday "+ getOrdinalNum(Math.min(...ciklas)+i);
                                    break;
                                case 3:
                                    current.textContent = "Wednesday "+ getOrdinalNum(Math.min(...ciklas)+i);
                                    break;
                                case 4:
                                    current.textContent = "Thursday "+ getOrdinalNum(Math.min(...ciklas)+i);
                                    break;
                                case 5:
                                    current.textContent = "Friday "+ getOrdinalNum(Math.min(...ciklas)+i);
                                    break;
                                case 6:
                                    current.textContent = "Saturday "+ getOrdinalNum(Math.min(...ciklas)+i);
                                    break;
                                case 7:
                                    current.textContent = "Sunday "+ getOrdinalNum(Math.min(...ciklas)+i);
                                    break;
                                case 8:
                                    current.textContent = "Monday "+ getOrdinalNum(Math.min(...ciklas)+i);
                                    break;
                                case 9:
                                    current.textContent = "Tuesday "+ getOrdinalNum(Math.min(...ciklas)+i);
                                    break;
                                case 10:
                                    current.textContent = "Wednesday"+ getOrdinalNum(Math.min(...ciklas)+i);
                                    break;
                                case 11:
                                    current.textContent = "Thursday"+ getOrdinalNum(Math.min(...ciklas)+i);
                                    break;
                                case 12:
                                    current.textContent = "Friday"+ getOrdinalNum(Math.min(...ciklas)+i);
                                    break;
                                default:
                                    current.textContent = "Error";
                            }
                        }
                        current.setAttribute('id',i);
                        row.appendChild(current);
                    } else if(k == 1){
                        for(let g=0; g<3; g++){
                            let col2 = document.createElement('div');
                            if(g==1){
                                let p = document.createElement('p');
                                p.setAttribute('id',i);
                                col2.appendChild(p);
                                p.innerHTML = `<b>${Math.round(Math.max(...maxmin))}° </b>${Math.round(Math.min(...maxmin))}°`;
                            }
                            if(i!==0 && g==2){
                                col2.className = 'col tekstas d-none';
                            } else if(g==0 || g==1){
                                col2.className = 'col';
                            } else{
                                col2.className = 'col-8 tekstas-active';
                            }
                            col2.setAttribute('id',i);
                            row.appendChild(col2);
                            if(g==0){
                                let icons = document.createElement('i');
                                switch(orai[i].conditionCode){
                                    case "clear":
                                        icons.className = 'wi wi-day-sunny';
                                        break;
                                    case "isolated-clouds":
                                        icons.className = 'wi wi-day-cloudy-high';
                                        break;
                                    case "scattered-clouds":
                                        icons.className = 'wi wi-day-cloudy';
                                        break;
                                    case "overcast":
                                        icons.className = "wi wi-day-sunny-overcast";
                                        break;
                                    case "light-rain":
                                        icons.className = "wi wi-day-rain";
                                        break;
                                    default:
                                        icons.className = "wi wi-day-haze";
                                }
                                icons.setAttribute('id',i);
                                col2.appendChild(icons);
                            }
                            if(g==2){
                                let p2 = document.createElement('p');
                                switch(orai[i].conditionCode){
                                    case "clear":
                                        p2.textContent = "Sunny intervals and a gentle breeze";
                                        break;
                                    case "isolated-clouds":
                                        p2.textContent = "Isolated clouds and a gentle breeze";
                                        break;
                                    case "scattered-clouds":
                                        p2.textContent = "Scaterred clouds and a gentle breeze";
                                        break;
                                    case "overcast":
                                        p2.textContent = "Overcast and a gentle breeze";
                                        break;
                                    case "light-rain":
                                        p2.textContent = "Light rain and a gentle breeze";
                                        break;
                                    default:
                                        p2.textContent = "Sunny intervals and a gentle breeze";
                                }
                                p2.setAttribute('id',i);
                                p2.className = 'splitter';
                                col2.appendChild(p2);
                            }
                        }
                    }
                }


            }

            function getOrdinalNum(n) {
                return n + (n > 0 ? ['th', 'st', 'nd', 'rd'][(n > 3 && n < 21) || n % 10 > 3 ? 0 : n % 10] : '');
            }
         
            for(let j=0; j<=Math.max(...ciklas)-Math.min(...ciklas);j++){
                let day = parseInt(orai[0].forecastTimeUtc.substring(8, 10)) + j;
                let laikai = document.querySelector('.laikai');
                let laikas = document.createElement('div');
                if(j==0){
                    laikas.className = 'row laikas-active';
                } else{
                    laikas.className = 'row laikas d-none';
                }
                laikas.setAttribute('id',"t"+j);
                laikai.appendChild(laikas);
                for (let o in orai) {
                    let or = orai[o];
                    if (day == or.forecastTimeUtc.substring(8,10)) {
                        let col = document.createElement('div');
                        col.className = "col hour";
                        laikas.appendChild(col);
                        for (let i = 0; i < 4; i++) {
                            let row = document.createElement('div');
                            let icons = document.createElement('i');
                            row.className = "row-12 text-center " + i;
                            col.appendChild(row);
                            let p = document.createElement('p');
                            if (row.className === "row-12 text-center 0") {
                                row.appendChild(p);
                                p.innerHTML = "<b>"+or.forecastTimeUtc.substring(11, 13)+"</b>"+or.forecastTimeUtc.substring(13,16);
                            } else if (row.className === "row-12 text-center 1") {
                                p.textContent = Math.round(or.airTemperature) + "°";
                                if(or.forecastTimeUtc)
                                    switch(or.conditionCode){
                                        case "clear":
                                            icons.className = 'wi wi-day-sunny';
                                            break;
                                        case "isolated-clouds":
                                            icons.className = 'wi wi-day-cloudy-high';
                                            break;
                                        case "scattered-clouds":
                                            icons.className = 'wi wi-day-cloudy';
                                            break;
                                        case "overcast":
                                            icons.className = "wi wi-day-sunny-overcast";
                                            break;
                                        case "light-rain":
                                            icons.className = "wi wi-day-rain";
                                            break;
                                        default:
                                            icons.className = "wi wi-day-haze";
                                    }
                                row.appendChild(icons);
                                row.appendChild(p);
                            } else if (row.className === "row-12 text-center 2") {
                                p.textContent = or.totalPrecipitation + "%";
                                icons.className = 'wi wi-raindrops';
                                row.appendChild(icons);
                                row.appendChild(p);
                            } else {
                                icons.className = 'wi wi-wind-beaufort-'+or.windSpeed;
                                row.appendChild(icons);
                                let wind = document.createElement('i');
                                wind.className = "wi wi-wind towards-"+or.windDirection+"-deg";
                                row.appendChild(wind);
                            }
                        }
                    }
                }
            }

            let btn = document.querySelectorAll('.dai');
            for(let bt=0;bt<btn.length;bt++){
                btn[bt].addEventListener('click', changeClass, false);
            }


            function changeClass(event){
                document.querySelector('.day-active').className = 'col day dai';
                document.querySelector('.tekstas-active').className = 'tekstas d-none';
                let targetId = event.target.id;
                let x = document.getElementById('t'+targetId);
                let h = document.getElementById(targetId);
                let z = document.querySelector('.laikas-active');
                let l = document.getElementById(targetId).getElementsByClassName("tekstas")[0];
                z.className = 'row laikas d-none';
                h.className = 'col day-active dai';
                x.className = 'row laikas-active';
                l.className = 'col-8 tekstas-active';
            }


        } else {
            alert(manoAjax.statusText);
        }
    }
}
manoAjax.open('GET', 'https://api.meteo.lt/v1/places/kaunas/forecasts/long-term?fbclid=IwAR3e6UvJChUM9m9lPsoCoBDBwBP-F_2g4IXqB2CosZyAJcQqeEx6c7FroqQ');
manoAjax.send();
