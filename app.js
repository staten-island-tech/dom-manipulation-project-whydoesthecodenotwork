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

DOMSelectors["form"].addEventListener("submit", go, false);

function go(event) {
	event.preventDefault();
	const inputs = [];
	DOMSelectors["input"].forEach(
		(input) => (inputs[input.name] = input.value)
	);
	/* turn the list of inputs into just the names and values */
	append(inputs);
	DOMSelectors["spam"].lastElementChild.addEventListener(
		"click",
		remove,
		false
	);
	clearInput();
}

function append(obj) {
	// console.log(obj);

	DOMSelectors["spam"].insertAdjacentHTML(
		"beforeend",
		`<div class="card">
            <h2 class="institution">${obj.institution}</h2>
            <div class="cardcontent">
                <img class="avatar" src="profile.png" alt="${
					obj.name
				}" style="background-color:${obj.color}"/>
                <div class="text" style="text-shadow:1px 1px 2px ${
					obj["color"]
				}">
                    <h3 class="name">name: ${obj.name}</h3>
                    <h3 class="issuedate">issue date: ${new Date(
						obj["issuedate"] + "T00:00:00"
					).toLocaleDateString()}</h3>
                </div>
            </div>
            <svg class="barcode"></svg>
        </div>`
	);

	newCard = DOMSelectors["spam"].lastElementChild; // get the card we just added
	const properties = {
		name: newCard.querySelector(".name"),
		issuedate: newCard.querySelector(".issuedate"),
		institution: newCard.querySelector(".institution"),
		id: newCard.querySelector(".barcode"),
	}; // then get its elements

	Object.keys(obj).forEach((key) => {
		if (obj[key] == "") {
			properties[key].remove(); // if the user left the input field for that element blank, remove it.
		}
	});

	if (obj["id"]) {
		JsBarcode(properties.id, obj["id"], {
			displayValue: false,
			format: "code39",
			width: 3,
			height: 70,
		});
	}
	// DOMSelectors['body'].children["spam"] would get the spam object
}

function clearInput() {
	DOMSelectors["input"].forEach(
		(input) => (input.value = input.defaultValue)
	);
	// input.value = "" will set the color picker to black instead of its default value of white
}

var counter = 0;

function remove(event) {
	event.preventDefault();
	// console.log(this);
	if (
		window.confirm(
			"are you sure you want to delete " +
				this.querySelector(".name").innerText.substring(6)
			// hard coded substring to remove the "name: "
		)
	) {
		counter += 1;
		DOMSelectors["counter"].innerHTML = "cards deleted: " + counter;
		this.remove();
	}
}
