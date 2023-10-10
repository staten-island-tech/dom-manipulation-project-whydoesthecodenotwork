const DOMSelectors = {
	body: document.querySelector("body"),
	form: document.querySelector("body > form"),
	/* shoutout to inspect element -> right click element -> copy -> copy JS path */
};

input = DOMSelectors["form"].children[0];

function go() {
	append(input.value);
}

function append(obj) {
	const newText = document.createTextNode(obj);
	const newParagraph = document.createElement("h3");
	newParagraph.append(obj);
	DOMSelectors["body"].append(newParagraph);
	clearInput();
}

function clearInput() {
	input.value = "";
}
