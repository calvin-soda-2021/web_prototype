// script from http://www.steves-internet-guide.com/using-javascript-mqtt-client-websockets/

var mqtt;
var reconnectTimeout = 2000;
var host="test.mosquitto.org";
var port=8081;
var subscription="calvin-soda-pop"

function writeOutput(output) {
    const out_area=document.getElementById("BrokerOutput")
    const newElement = document.createElement("p");
    const content = document.createTextNode(output)
    newElement.appendChild(content)
    out_area.appendChild(newElement)
}


function onConnect(){
    console.log("connected");
    writeOutput("~ connected to " + host + ":" + port);
    mqtt.subscribe(subscription);
    writeOutput("~ subscribed to topic " + subscription);
    writeOutput("~ output will appear below");
}

function onMessageArrived(msg){
    out_area.appendChild(document.createTextNode("Message received " + msg.payloadString));
}

function MQTTconnect() {
    console.log("connecting to " + host);
    writeOutput("~ connecting to " + host + ":" + port)
    mqtt = new Paho.MQTT.Client(host, port, "clientjs") 
    var options = {
        useSSL: true,
        timeout: 3,
        onSuccess: onConnect,
    };
    mqtt.onMessageArrived = onMessageArrived;
    mqtt.connect(options);
}