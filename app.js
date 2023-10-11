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
    /* turn the list of inputs into just the names and values */
    append(inputs);
    clearInput();
}

function append(obj) {
    const newCard = document.createElement("div");
    const newName = document.createElement("h3");
    const name = document.createTextNode(
        "NAME: " + obj["firstName"] + " " + obj["lastName"]
    );
    newCard.className = "card";
    newName.className = "name";
    newName.appendChild(name);
    newCard.appendChild(newName);
    /* new name is container for the name text node. appending the text node directly doesn't add it as a separate child */

    const newAge = document.createElement("h3");
    const age = document.createTextNode("AGE: " + obj["age"]);
    newAge.append(age);
    newCard.append(newAge);

    const deleteButton = document.createElement("button");

    deleteButton.setAttribute("onclick", "remove(this);");
    deleteButton.innerText = "delete";

    newCard.append(deleteButton);

    DOMSelectors["spam"].appendChild(newCard);
    /* DOMSelectors['body'].children["spam"] would also work */
}

function clearInput() {
    DOMSelectors["input"].forEach((input) => (input.value = ""));
}

var counter = 0;

function remove(obj) {
    counter += 1;
    DOMSelectors["counter"].innerHTML = "times cleared: " + counter;
    obj.parentNode.remove();
}
