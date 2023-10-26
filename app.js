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

DOMSelectors["form"].addEventListener("submit", function (event) {
    event.preventDefault();
    const inputs = [];
    DOMSelectors["input"].forEach(
        (input) => (inputs[input.name] = input.value)
    );
    const card = makeCard(inputs); // create a card using the user inputs
    append(card, inputs);
    clearInput();
    addRemoveButton(DOMSelectors["spam"].lastElementChild); // add a remove "button" to the card we just added
});

function makeCard(inputs) {
    /* turn the list of inputs into just the names and values */
    return `<div class="card">
				<h2 class="institution">${inputs.institution}</h2>
				<div class="cardcontent">
					<img class="avatar" src="profile.png" alt="${
                        inputs.name
                    }" style="background-color:${inputs.color}"/>
					<div class="text" style="text-shadow:1px 1px 2px ${inputs["color"]}">
						<h3 class="name">name: ${inputs.name}</h3>
						<h3 class="issuedate">issue date: ${new Date(
                            inputs["issuedate"] + "T00:00:00"
                        ).toLocaleDateString()}</h3>
					</div>
				</div>
				<svg class="barcode"></svg>
			</div>`;
}

function append(card, inputs) {
    DOMSelectors.spam.insertAdjacentHTML("beforeend", card); // insert the element then edit it, because trying to edit the string (from makeCard) as an element would be painful
    newCard = DOMSelectors["spam"].lastElementChild; // get the card we just added
    const properties = {
        name: newCard.querySelector(".name"),
        issuedate: newCard.querySelector(".issuedate"),
        institution: newCard.querySelector(".institution"),
        id: newCard.querySelector(".barcode"),
    }; // then get its elements

    // we need inputs here and in makeCard. this needs it to check which inputs are empty and remove it from the freshly inserted element, while makeCard needs it to fill the template literal.
    Object.keys(inputs).forEach((key) => {
        if (inputs[key] == "") {
            properties[key].remove(); // if the user left the input field for that element blank, remove it
        }
    });

    if (inputs["id"]) {
        JsBarcode(properties.id, inputs["id"], {
            displayValue: false,
            format: "code39",
            width: 3,
            height: 70,
        });
    }
}

function addRemoveButton(card) {
    card.addEventListener("click", remove, false);
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
