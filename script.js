

const button=document.querySelector("#search-btn");
        const searchInput=document.querySelector("#input");
        const temperatureArea=document.querySelector(".temperature");
        const locationArea=document.querySelector(".location");
        const timeArea=document.querySelector(".time");
        const dateArea=document.querySelector(".date");
        const imgArea=document.querySelector(".image");
        const textArea=document.querySelector(".condition");
        async function fetchData(){
            const location=searchInput.value;
            if(location!="")
            {
                const data=await fetchWeather(location);
                searchInput.value="";
                if(data==null)
                {
                    
                }else
                {
                    updateDom(data);
                }
            }
        }

        function updateDom(data){
            console.log("I will update the Dom");
            const temp=data.current.temp_c;
            const location=data.location.name;
            const timeData=data.location.localtime;
            const [date, time]=timeData.split(" ");
            const datePlace=date;
            const timePlace=time;
            const img=data.current.condition.icon;
            const condition=data.current.condition.text;

            temperatureArea.textContent=temp;
            locationArea.textContent=location;
            timeArea.textContent=timePlace;
            dateArea.textContent=datePlace;
            imgArea.src=img;
            textArea.textContent=condition;
        }

        button.addEventListener("click",fetchData)

        async function fetchWeather(location){
            const url=`http://api.weatherapi.com/v1/current.json?key=ba9f8452c3ff45eeb62120206242107&q=${location}&aqi=no`;
            const response=await fetch(url);
            if(response.status==200)
            {
                const json=await response.json();
                console.log(json);
                return json;
            }
            else if(response.statuse==400)
            {
                alert("Location is invalid");
                return null;
            }
        }