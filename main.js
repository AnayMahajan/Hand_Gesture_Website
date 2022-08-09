prediction= "";

Webcam.set({
    width: 350,
    height: 300,
    img_format: "png",
    png_quality: 90
});

camera= document.getElementById("camera");

Webcam.attach("#camera");

function takeSnapshot(){
    Webcam.snap(function(data_uri){
        document.getElementById("result").innerHTML= '<img id="capture_img" src="'+data_uri+'">';
    });
}

console.log("ml5version",ml5.version );
classifier= ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/ObNwcWyMn/model.json", modelLoaded);

function modelLoaded(){
    console.log("model loaded");
}

function speak(){
    synth= window.speechSynthesis;
    speak_data= "The prediction is "+prediction;
    utterThis= new SpeechSynthesisUtterance(speak_data);
    synth.speak(utterThis);
}

function check(){
    img= document.getElementById("capture_img");
    classifier.classify(img, gotResult);
}

function gotResult(error, results)
{
    if(error)
    {
        console.error(error);
    }
    else
    {
        console.log(results);
        document.getElementById("result_emotion_name")
        prediction= results[0].label;
        speak();
        if(results[0].label== "Amazing")
        {
            document.getElementById("update_emoji").innerHTML = "&#128076;";
        }
        if(results[0].label== "Victory")
        {
            document.getElementById("update_emoji").innerHTML = "&#9996;";
        }
        if(results[0].label== "Best")
        {
            document.getElementById("update_emoji").innerHTML = "&#128077;";
        }
        if(results[0].label== "Bad")
        {
            document.getElementById("update_emoji").innerHTML = "&#128078;";
        }
    }
}