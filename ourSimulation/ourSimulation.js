function buildWorld() {// Welt wird erstellt
	
	world = new World({
		hUnits: 200,
		unit: "units",
		minUnits: {x: 0, y:0},
		img: "img/Strasse.png",
		fontColor: "#ffffff"
	});

	Barrier1 = new Actor({img: "img/Barrier.png", x: 40, y: 130, wUnits: 30}); //Hinderniss wird eingefügt
	auto1 = new Actor({img: "img/GrünesAuto.png", x: 120, y: 100, wUnits: 25}); //Auto wird eingefügt
}


function setup() { 
	t = 0;			// Zeit
	dt = 0.016;		// Zeitschritt in Sekunden
	auto1.vx = 0;	//x Geschwindigkeit Auto
	auto1.vy = 0;	//y Geschwindigkeit Auto
	auto1.ax = 0;	//x Beschleunigung Auto
	auto1.ay = 0;	//y Beschleunigung Auto
	xPunkte = 0;	//Punkte
	check = false;	//check für Hinderniss Generator
	
}


w = false	//Steuerung
a = false
s = false
d = false

window.addEventListener("keydown", down);	//Listener für keydown Event
window.addEventListener("keyup", up);		//Listener für keyup Event

function down(event) {	//Gedrückte Tasten werden erkannt
	console.log("Eine Taste wurde gedrückt:", event.key) 
	if (event.key == "w") {   
		w = true
		console.log(auto1.vy);
	}
	if (event.key == "s") { 
		s = true			  
		console.log(auto1.vy);
	}
	if (event.key == "a") { 
		a = true
		console.log(auto1.vx);
	}
	if (event.key == "d") {
		d = true
		console.log(auto1.vx);
	}
	
}

function up(event) {	//Ungedrückte Tasten werden erkannt
	if (event.key == "w") {   
		w = false
		console.log(auto1.vy);
	}
	if (event.key == "s") { 
		s = false			 
		console.log(auto1.vy);
	}
	if (event.key == "a") { 
		a = false
		console.log(auto1.vx);
	}
	if (event.key == "d") {
		d = false
		console.log(auto1.vx);
	}
	
}

function generateRandomInteger(max) { //Generiert eine Zufallszahl
    return Math.floor(Math.random() * max) + 1;
}
		


function loop() {	

	random = generateRandomInteger(4)	//Zufallszahl wird generiert und die Position für das Hinderniss definiert
	if (random == 1 && check == true){
		Barrier1.x = 40
		check = false
		crash = true
	}
	if (random == 2 && check == true){
		Barrier1.x = 80
		check = false
		crash = true
	}
	if (random == 3 && check == true){
		Barrier1.x = 120
		check = false
		crash = true
		}
	if (random == 4 && check == true){
		Barrier1.x = 160
		check = false
		crash = true
	}

	if (auto1.x - Barrier1.x <= 25 && auto1.x - Barrier1.x >= -25 && crash == true){ //Hier wird erkannt ob das Auto mit der Barriere kollidiert ist
		if (auto1.y - Barrier1.y <=28 && auto1.y - Barrier1.y >= -28){
			console.log("crash")
			while(t < 1){	//Hier wird kurz gewartet
				t += 0.00000001
			}
			setup()				//Alle Variablen werden zurückgesetzt
			auto1.x = 120		//Variabeln werden manuell zurückgesetzt
			auto1.y = 100		
			Barrier1.x = 40
			Barrier1.y = 130
			xPunkte = 0			// Die Punkte werden zurückgesetzt und aktualisiert
			document.getElementById("counter").innerHTML = "Punkte: " + xPunkte; 
		}
	}


	if ((auto1.y < 230)){ //Das Auto wird am verlassen des Spielfelds gehindert
		
		if(auto1.x < 30){
			auto1.x = 30
			auto1.vx = 0
		}
		if(auto1.x > 170){
			auto1.x = 170
			auto1.vx = 0
		}
		if(auto1.y < -20){
			auto1.y = -20
			auto1.vy = 0
			auto1.vx = 0
		}
	
		if(w == true){ //Hier werden die Tasten mit den jeweiligen Beschleunigungswerten festgelegt
			auto1.ay = 8
		}
		if(s == true){
			auto1.ay = -8
		}
		if(w == false && s == false){
			auto1.ay = 0
		}
		if(a == true){
			auto1.ax = -6
		}
		if(d == true){
			auto1.ax = 6
		}
		if(a == false && d == false){
			auto1.ax = 0
		}

		auto1.vy = auto1.vy + auto1.ay * dt	//y Geschwindigkeit wird berechnet
		auto1.vx = auto1.vx + auto1.ax * dt //x Geschwindigkeit wird berechnet

		if(auto1.vy < 40){						//Geschwindigkeits Limits werden gesetzt
			auto1.y = auto1.y + dt * auto1.vy
		}
		else{
			auto1.vy = 40
			auto1.y = auto1.y + dt * auto1.vy
		}

		if(auto1.vy > -20){
			auto1.y = auto1.y + dt * auto1.vy
		}
		else{
			auto1.vy = -20
			auto1.y = auto1.y + dt * auto1.vy
		}

		if(auto1.vx < 15){
			auto1.x = auto1.x + dt * auto1.vx
		}
		else{
			auto1.vx = 15
			auto1.x = auto1.x + dt * auto1.vx
		}

		if(auto1.vx > -15){
			auto1.x = auto1.x + dt * auto1.vx
		}
		else{
			auto1.vx = -15
			auto1.x = auto1.x + dt * auto1.vx
		}

	
}
else{ //Wenn ein Punkt erzielt wird
	auto1.y = -20			//Die y Position des Autos wird zurückgestzt
	xPunkte += 1 			//Die Punkte werden erhöht
	check = true			//check wird auf true gesetzt damit ein neuer Ort für das Hinderniss bestimmt werden kann
	document.getElementById("counter").innerHTML = "Punkte: " + xPunkte; //Die Punkte werden aktualisiert
}

world.update(); //Die Welt wird aktualisiert

}

