function checkWeather() {
    const body = document.querySelector("body");
    const temp = document.querySelector("#myTemp");

    console.log(temp);
    const t = temp.value;
    console.log(t);
    if(t>40) {
        console.log("It's super hot");
        body.style.backgroundColor = "red";
    } else if(t<=40 && t>30) {
        console.log("It's sunny and warm");
        body.style.backgroundColor = "yellow";
    } else if (t<= 30 && t>18)  {
        console.log("It's quite pleasant");
        body.style.backgroundColor = "green";
    } else if (t<= 18 && t>8)  {
        console.log("It's is quite cold");
        body.style.backgroundColor = "blue";
    } else if (t <=8) {
        console.log("It is freezing");
        body.style.backgroundColor = "lightblue";
    }
}
