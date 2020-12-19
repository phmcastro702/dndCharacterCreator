let characterBuilderForm = document.getElementById('optsForm');
let finalSubmitBtn = document.getElementById('inputSubmit');
let allOptGroups = document.querySelectorAll('optgroup');
let characterCategory = document.querySelector('.data-category');
let displayedCategories = [];
let characterNameInput = document.getElementById('characterNameInput');
let characterNameTitle = document.getElementById('characterName');
//let dndClassSelect = document.getElementById('dndClass');

let getDndInfoUrl = 'https://www.dnd5eapi.co/api/';




finalSubmitBtn.addEventListener('submit', (e) => SubmitCharacterInfoForm(e));

// so user can get rpg class info also by hitting enter
characterBuilderForm.addEventListener('submit', (e) => SubmitCharacterInfoForm(e));


function SubmitCharacterInfoForm(event) {
    event.preventDefault();
    for (let category of allOptGroups) {
        getRPGInfo(`${category.parentNode.name + '/' + category.parentNode.value}`);
    }
    characterNameTitle.textContent = characterNameInput.value !== '' ? characterNameInput.value : characterNameTitle.textContent;
}

function PopulateOptGroups() {

    let categories = [];

    for (let optGroup of [...allOptGroups]) {
        fetch(`${getDndInfoUrl + optGroup.parentNode.name}/`)
            .then((response) => {
                return response.json();
            })
            .then((data) => {

                console.log(data);
                categories = data['results'];
                AddOptsToOptGroups(categories, optGroup);
            })
            .catch(() => {
                console.log('An error successfully ocurred!');
            });
    }


}

function AddOptsToOptGroups(categoriesNames, optGroup) {

    for (let category of categoriesNames) {

        let opt = document.createElement('option');
        opt.value = category['index'];
        opt.textContent = category['name'];

        optGroup.appendChild(opt);

    }

}


function getRPGInfo(customEndpoint) {
    if (customEndpoint === '') {
        displayError('please fill in all the options');
    }

    let requestURL = getDndInfoUrl + `${customEndpoint}/`;

    fetch(requestURL)
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            console.log(data);
            displayNewCategory(customEndpoint.split('/')[0], JSON.stringify(data, null, 4));
        })
        .catch(() => {
            console.log('An error successfully ocurred!');
        });
}

function displayNewCategory(category, info) {

    if (displayedCategories.length <= 0) {
        let newCategory = characterCategory.cloneNode(true);

        newCategory.id = category;

        newCategory.firstElementChild.textContent = category;
        newCategory.lastElementChild.textContent = info;

        characterCategory.parentNode.appendChild(newCategory);
        displayedCategories.push(newCategory);
    }


    let displayedCategoriesNames = displayedCategories.map((c) => c.id);


    if (displayedCategoriesNames.includes(category)) {
        displayedCategories.find(c => c.id === category).lastElementChild.textContent = info;
        return;
    }
    else {
        let newCategory = characterCategory.cloneNode(true);

        newCategory.id = category;

        newCategory.firstElementChild.textContent = category;
        newCategory.lastElementChild.textContent = info;

        characterCategory.parentNode.appendChild(newCategory);
        displayedCategories.push(newCategory);
    }


}

function displayError(message) {
    errorTxt = document.getElementById('error-text');
    errorTxt.textContent = message;
}

PopulateOptGroups();