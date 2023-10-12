const DOMSelectors = {
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
	template: document.querySelector("#templatecard"),
};

function go() {
	const inputs = [];
	DOMSelectors["input"].forEach(
		(input) => (inputs[input.name] = input.value)
	);
	/* turn the list of inputs into just the names and values */
	append(inputs);
	clearInput();
}

function append(obj) {
	console.log(obj);

	const newCard =
		DOMSelectors["template"].content.cloneNode(true).children[0];
	console.log(newCard);

	const properties = {
		name: newCard.querySelector(".name"),
		age: newCard.querySelector(".age"),
		avatar: newCard.querySelector(".avatar"),
		institution: newCard.querySelector(".institution"),
		text: newCard.querySelector(".text"),
	};
	console.log(properties);

	properties["name"].innerText = "name: " + obj["name"];

	properties["age"].innerText = "age: " + obj["age"];

	properties["avatar"].style.background = obj["color"];

	obj["institution"]
		? (properties["institution"].innerText = obj["institution"])
		: properties["institution"].remove();

	properties["text"].style["text-shadow"] = "1px 1px 2px " + obj["color"];
	// this feels criminal

	DOMSelectors["spam"].appendChild(newCard);
	// /* DOMSelectors['body'].children["spam"] would also work */
}

function clearInput() {
	DOMSelectors["input"].forEach(
		(input) => (input.value = input.defaultValue)
	);
}

var counter = 0;

function remove(obj) {
	counter += 1;
	DOMSelectors["counter"].innerHTML = "cards deleted: " + counter;
	obj.remove();
}
