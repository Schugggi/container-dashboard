const { ipcRenderer } = require('electron');

const headers = ['ID', 'Name', 'Image', 'Status', 'State', 'Ports'];

async function loadContainers() {
    try {
        const containers = await ipcRenderer.invoke('get-containers');
        renderContainers(containers);
    } catch (err) {
        document.getElementById('containers').innerHTML = `<p style="color: red;">Error: ${err.message}</p>`;
    }
}

function renderContainers(containers) {
    if (!containers.length) {
        console.log('No containers found.');
        return;
    }

    const table = document.createElement('table');
    const headerRow = table.insertRow();
    headers.forEach(text => {
        const cell = document.createElement('th');
        cell.innerText = text;
        cell.style.fontWeight = 'bold';
        headerRow.appendChild(cell);
    });
    table.appendChild(headerRow);
    containers.map(container => {
        const row = table.insertRow();
        row.insertCell(0).innerText = container.id;
        row.insertCell(1).innerText = container.name;
        row.insertCell(2).innerText = container.image;
        row.insertCell(3).innerText = container.status;
        row.insertCell(4).innerText = container.state;
        row.insertCell(5).innerText = container.ports.map(port => `${port.PrivatePort}->${port.PublicPort}/${port.Type}`).join(', ');
    })
    document.getElementById('containers').appendChild(table);
}

loadContainers();