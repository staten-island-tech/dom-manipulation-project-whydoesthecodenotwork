const DOMSelectors = {
    body: document.querySelector("body"),
    form: document.querySelector("body > form"),
    spam: document.querySelector("body > #spam"),
    /* > means it only selects direct children instead of all the children. */
    counter: document.getElementById("counter"),
    /* inspect element -> right click element -> copy -> copy JS path */
    input: document.querySelectorAll(
        "body > form label > input:not([type=submit])"
    ),
    /* querySelectorAll is a node list, querySelector is the first element that matches selection 
	getElementsByClassName is an HTMLCollection and does not support forEach. how rude*/
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

    /* 	const newCard =
		DOMSelectors["template"].content.children[0].cloneNode(true);
	// .content gets the document fragment of template
	// children[0] is to get the card (index 0) from the document fragment
	console.log(newCard);

	const properties = {
		name: newCard.querySelector(".name"),
		issuedate: newCard.querySelector(".issuedate"),
		avatar: newCard.querySelector(".avatar"),
		institution: newCard.querySelector(".institution"),
		text: newCard.querySelector(".text"),
		barcode: newCard.querySelector("#barcode"),
	};
	// DOMSelectors object is full of document.blabla but we need newCard.blabla, so don't use DOMSelectors here
	console.log(properties);

	properties["name"].innerText = "name: " + obj["name"];

	obj["issuedate"]
		? (properties["issuedate"].innerText =
				"issue date: " +
				new Date(obj["issuedate"] + "T00:00:00").toLocaleDateString())
		: properties["issuedate"].remove();

	// if no issue date was provided, get rid of the issue date element

	properties["avatar"].style.background = obj["color"];
	properties["avatar"].alt = obj["name"];

	obj["institution"]
		? (properties["institution"].innerText = obj["institution"])
		: properties["institution"].remove();

	properties["text"].style["text-shadow"] = "1px 1px 2px " + obj["color"];
	// mixing the [] and . feels criminal

	obj["id"]
		? JsBarcode(properties["barcode"], obj["id"], {
				displayValue: false,
				format: "code39",
				width: 3,
				height: 80,
		  })
		: properties["barcode"].remove(); */

    DOMSelectors["spam"].insertAdjacentHTML(
        "beforeend",
        `
	<div class="card" onclick="remove(this);">
		<h2 class="institution">${obj.institution}</h2>
		<div class="cardcontent">
			<img class="avatar" src="profile.png" alt="${obj.name}" />
			<div class="text">
				<h3 class="name">${obj.name}</h3>
				<h3 class="issuedate">${new Date(
                    obj["issuedate"] + "T00:00:00"
                ).toLocaleDateString()}</h3>
			</div>
		</div>
		<svg class="barcode"></svg>
	</div>
	`
    );
    newCard = DOMSelectors["spam"].lastElementChild;
    const properties = {
        name: newCard.querySelector(".name"),
        issuedate: newCard.querySelector(".issuedate"),
        avatar: newCard.querySelector(".avatar"),
        institution: newCard.querySelector(".institution"),
        text: newCard.querySelector(".text"),
        barcode: newCard.querySelector(".barcode"),
    };
    console.log(Object.keys(obj));
    Object.keys(obj).forEach((key) => {
        console.log(key);
        if (obj[key] == "") {
            console.log("GOODBYE");
            properties[key].remove();
        }
    });
    // DOMSelectors['body'].children["spam"] would get the spam object
}

function clearInput() {
    DOMSelectors["input"].forEach(
        (input) => (input.value = input.defaultValue)
    );
    // input.value = "" will set the color picker to black instead of its default value of white
}

var counter = 0;

function remove(obj) {
    console.log(obj);
    if (
        window.confirm(
            "are you sure you want to delete " +
                obj.querySelector(".name").innerText.substring(6)
            // hard coded substring to remove the "name: "
        )
    ) {
        counter += 1;
        DOMSelectors["counter"].innerHTML = "cards deleted: " + counter;
        obj.remove();
    }
}
