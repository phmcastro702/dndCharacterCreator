let userRpgInfoForm = document.getElementById('rpgInfoForm');
let finalSubmitBtn = document.getElementById('inputSubmit');
let dndClassOptGroup = document.querySelector('.dndClassOptGroup');
//let dndClassSelect = document.getElementById('dndClass');

let getDndInfoUrl = 'https://www.dnd5eapi.co/api/';




finalSubmitBtn.addEventListener('submit', (e) => SubmitCharacterInfoForm(e, `classes/${dndClassOptGroup.parentNode.value}`));

// so user can get rpg class info also by hitting enter
userRpgInfoForm.addEventListener('submit', (e) => SubmitCharacterInfoForm(e, `classes/${dndClassOptGroup.parentNode.value}`));


function SubmitCharacterInfoForm(event, endpoint) {
    event.preventDefault();
    getRPGInfo(endpoint);
}

function PopulateClassOptGroup() {
    let classArr = [];

    fetch(`${getDndInfoUrl}classes/`)
        .then((response) => {
            return response.json();
        })
        .then((data) => {

            console.log(data);
            classArr = data['results'];
            AddClassOptions(classArr);
        })
        .catch(() => {
            console.log('An error successfully ocurred!');
        });


}

function AddClassOptions(classNames) {

    for (let dndClass of classNames) {

        let opt = document.createElement('option');
        opt.value = dndClass['index'];
        opt.textContent = dndClass['name'];

        dndClassOptGroup.appendChild(opt);

    }

}


function getRPGInfo(customEndpoint) {
    if (customEndpoint === '') {
        displayInfo('please input some class from the D&D universe');
        return;
    }

    let requestURL = getDndInfoUrl + `${customEndpoint}/`;

    fetch(requestURL)
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            console.log(data);
            displayInfo(JSON.stringify(data, null, 4));
        })
        .catch(() => {
            console.log('An error successfully ocurred!');
        });
}

function displayInfo(infoData) {
    let infoTxt = document.querySelector('.rpg-info');

    infoTxt.textContent = infoData;
}

PopulateClassOptGroup();