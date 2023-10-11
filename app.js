let DOMSelectors = {
	body: document.querySelector("body"),
	form: document.querySelector("body > form"),
	spam: document.querySelector("body > #spam"),
	/* > means it only selects direct children instead of all the children */
	counter: document.getElementById("counter"),
	/* inspect element -> right click element -> copy -> copy JS path 
	also spam uses a # id selector; class selectors are .*/
	/* querySelectorAll is a node list, querySelector is the first element that matches selection 
    getElementsByClassName is an HTMLCollection and does not support forEach. how rude*/
	input: document.querySelectorAll(
		"body > form label > input:not([type=submit])"
	),
};

function go() {
	const inputs = [];
	DOMSelectors["input"].forEach(
		(input) => (inputs[input.name] = input.value)
	);
	append(inputs);
}

function append(obj) {
	const newCard = document.createElement("div");
	const newName = document.createElement("h3");
	const name = document.createTextNode(
		obj["firstName"] + " " + obj["lastName"]
	);
	newCard.className = "card";
	newName.className = "name";
	newName.appendChild(name);
	newCard.appendChild(newName);
	/* new name is container for the name text node. appending the text node directly doesn't add it as a separate child */
	DOMSelectors["spam"].appendChild(newCard);
	/* DOMSelectors['body'].children["spam"] would also work */
	clearInput();
}

function clearInput() {
	DOMSelectors["input"].value = "";
}

var counter = 0;

function remove() {
	targets = document.querySelectorAll("body > #spam .user");
	/* this can't actually go into the DOMSelectors object because then the list won't update as the user adds more h3s */
	targets.forEach((element) => element.remove());
	counter += 1;
	DOMSelectors["counter"].innerHTML = "times cleared: " + counter;
}
