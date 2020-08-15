class Member {
    constructor(name, assignment) {
        this.name = name;
        this.assignment = assignment;
    }
}

class Hall {
    constructor(id, name) {
        this.id = id;
        this.name = name;
        this.members = [];
    }

    addMember(member) {
        this.members.push(member);
    }

    deleteMember(member) {
        let index = this.members.indexOf(member);
        this.members.splice(index, 1);
    }
}

let halls = [];
let hallId = 0;

onClick('new-hall', () => {
    halls.push(new Hall (hallId++, getValue('new-hall-name')));
    drawDOM();
})

function onClick(id, action) {
    let element = document.getElementById(id);
    element.addEventListener('click', action);
    return element;
}

function getValue(id) {
    return document.getElementById(id).value;
}

function drawDOM() {
    let hallDiv = document.getElementById('halls');
    clearElement(hallDiv);
    for (hall of halls) {
        let table = createHallTable(hall);
        let title = document.createElement('h2')
        title.innerHTML = hall.name;
        title.appendChild(createDeleteHallDeleteButton(hall));
        hallDiv.appendChild(title);
        hallDiv.appendChild(table);
        for (member of hall.members) {
            createMemberRow(hall, table, member);
        }
    }
}

function createMemberRow(hall, table, member) {
    let row = table.insertRow(2);
    row.insertCell(0).innerHTML = member.name;
    row.insertCell(1).innerHTML = member.assignment;
    let actions = row.insertCell(2);
    actions.appendChild(createDeleteRowButton(hall, member));
}

function createDeleteRowButton(hall, member) {
    let btn = document.createElement('button');
    btn.className = 'btn btn-primary';
    btn.innerHTML = 'Delete'
    btn.onclick = () => {
        let index = hall.members.indexOf(member);
        hall.members.splice(index, 1);
        drawDOM();
    }
    return btn;
}

function createDeleteHallDeleteButton(hall) {
    let btn = document.createElement('button');
    btn.className = 'btn btn-primary';
    btn.innerHTML = 'Delete Hall';
    btn.onclick = () => {
        let index = halls.indexOf(hall);
        halls.splice(index, 1);
        drawDOM();
    };
    return btn;
}

function createNewMemberButton (hall) {
    let btn = document.createElement('button');
    btn.className = 'btn btn-primary';
    btn.innerHTML = 'Create';
    btn.onclick = () => {
        hall.members.push(new Member(getValue(`name-input-${hall.id}`), getValue(`assignment-input-${hall.id}`)));
        drawDOM();
    }
    return btn;
}

function createHallTable(hall) {
    let table = document.createElement('table')
    table.setAttribute('class', 'table table-dark table-striped');
    let row = table.insertRow(0);
    let nameColumn = document.createElement('th');
    let assignmentColumn = document.createElement('th');
    nameColumn.innerHTML = 'Name';
    assignmentColumn.innerHTML = 'Assignment';
    row.appendChild(nameColumn);
    row.appendChild(assignmentColumn);
    let formRow = table.insertRow(1);
    let nameTh = document.createElement('th');
    let assignmentTh = document.createElement('th');
    let createTh = document.createElement('th');
    let nameInput = document.createElement('input');
    nameInput.setAttribute('id', `name-input-${hall.id}`);
    nameInput.setAttribute('type', 'text');
    nameInput.setAttribute('class', 'form-control');
    let assignmentInput = document.createElement('input')
    assignmentInput.setAttribute('id', `assignment-input-${hall.id}`);
    assignmentInput.setAttribute('type', 'text');
    assignmentInput.setAttribute('class', 'form-control');
    let newMemberButton = createNewMemberButton(hall);
    nameTh.appendChild(nameInput);
    assignmentTh.appendChild(assignmentInput);
    createTh.appendChild(newMemberButton);
    formRow.appendChild(nameTh);
    formRow.appendChild(assignmentTh);
    formRow.appendChild(createTh);
    return table;
}

function clearElement(element) {
    while(element.firstChild) {
        element.removeChild(element.firstChild);
    }
}