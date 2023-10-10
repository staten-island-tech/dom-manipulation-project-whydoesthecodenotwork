const DOMSelectors = {
    body: document.querySelector("body"),
    form: document.querySelector("body > form"),
    spam: document.querySelector("body > #spam"),
    counter: document.getElementById("counter"),
    /* inspect element -> right click element -> copy -> copy JS path 
	also spam uses a # id selector; class selectors are .*/
};

input = DOMSelectors["form"].children[0];

function go() {
    if (input.value !== "") {
        append(input.value);
    }
}

function append(obj) {
    const newText = document.createTextNode(obj);
    const newParagraph = document.createElement("h3");
    newParagraph.className = "user";
    newParagraph.append(newText);
    DOMSelectors["spam"].append(newParagraph);
    /* DOMSelectors['body'].children["spam"] would also work */
    clearInput();
}

function clearInput() {
    input.value = "";
}

var counter = 0;

function remove() {
    const targets = spam.querySelectorAll(".user");
    /* querySelectorAll is a node list, querySelector is the first element that matches selection 
	getElementsByClassName is an HTMLCollection and does not support forEach. how rude*/
    targets.forEach((element) => element.remove());
    counter += 1;
    DOMSelectors["counter"].innerHTML = "times cleared: " + counter;
}
