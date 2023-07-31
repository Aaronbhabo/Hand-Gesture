var prediction1=""

var prediction2=""

Webcam.set({
    width:400,
    height:350,
    image_format:'png',
    png_quality:90,
});

camera=document.getElementById("Camera");
Webcam.attach('#camera');

function takesnapshot(){
    Webcam.snap(function(data_url){
        document.getElementById("result").innerHTML='<img id="capturedimage" src="'+data_url+'">';


    });

}

console.log('ml5 version',ml5.version);
classifire=ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/-5UIWrFEJ/model.json',modelloaded);
function modelloaded(){
    console.log("model is loaded");
}

function speak(){
    synth=window.speechSynthesis;
    speak1="the first prediction is"+prediction1;
    speak2="the second prediction is"+prediction2;
    utterthis=new SpeechSynthesisUtterance(speak1+speak2);
    synth.speak(utterthis);
}

function check(){
    var img=document.getElementById("capturedimage");
    classifire.classify(img,gotresult);
}

function gotresult(error,results){
    if(error){
        console.log(error);
    }
    else{
        console.log(results);
        document.getElementById("result_emotion_name").innerHTML=results[0].label;
        document.getElementById("result_emotion_name2").innerHTML=results[1].label;

        prediction1=results[0].label;
        prediction2L=results[1].label;
        speak();

        if(results[0].label=="Happy"){
            document.getElementById("emojiresult1").innerHTML="&#128512;";
        }

        if(results[0].label=="Sad"){
            document.getElementById("emojiresult1").innerHTML="&#128557;";
        }

        if(results[0].label=="Angry"){
            document.getElementById("emojiresult1").innerHTML="&#128520;";
        }


        if(results[1].label=="Happy"){
            document.getElementById("emojiresult2").innerHTML="&#128512;";
        }

        if(results[1].label=="Sad"){
            document.getElementById("emojiresult2").innerHTML="&#128557;";
        }

        if(results[1].label=="Angry"){
            document.getElementById("emojiresult2").innerHTML="&#128520;";
        }
        

    }
}



