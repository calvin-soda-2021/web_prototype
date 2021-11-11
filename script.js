// script based on examples from http://www.steves-internet-guide.com/using-javascript-mqtt-client-websockets/
var mqtt;
var reconnectTimeout = 2000;
var host="mqtt.eclipseprojects.io/mqtt";
var port=8081;
var topic="net/calvin/2021/soda-pop/machine"

export function writeOutput(output, element="BrokerOutput") {
    const out_area=document.getElementById(element)
    const newElement = document.createElement("p");
    const content = document.createTextNode(output)
    newElement.appendChild(content)
    out_area.appendChild(newElement)
    console.log(output)
}

function onConnect(){
    writeOutput("~ connected to " + host + ":" + port);
    mqtt.subscribe(topic);
    writeOutput("~ subscribed to topic " + topic);
    writeOutput("~ output will appear below");
    writeOutput("-----------------------------");
}

async function MQTTconnect() {
    writeOutput("~ connecting to " + host + ":" + port)
    mqtt = new Paho.MQTT.Client(host, port, "clientjs") 
    var options = {
        useSSL: true,
        timeout: 3,
        onSuccess: onConnect,
    };
    mqtt.onMessageArrived = message => writeOutput(message.payloadString);
    await mqtt.connect(options);
}

MQTTconnect();
