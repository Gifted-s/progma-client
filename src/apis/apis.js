const base = 'https://projectmanaga2384.herokuapp.com/pm/api/v1'
//   const base = 'http://localhost:4000/pm/api/v1'
async function getProjects() {
    const response = await fetch(base + '/projects', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    })
    return response.json()
}

async function getProjectNames() {

    const response = await fetch(base + '/project-names', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    })
    return response.json()
}

async function getInvitees(uri, token) {

    const response = await fetch(uri+'/invitees', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer '+ token,
        }
    })
    return response.json()
}


async function updateReview(id, reviewed) {

    const response = await fetch(base + `/update-project/${id}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            reviewed: !reviewed
        })
    })
    return response.json()
}

async function updateProjectName(id, name) {

    const response = await fetch(base + `/update-project-name/${id}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            project_name: name
        })
    })
    return response.json()
}

async function deleteProjectName(id) {

    const response = await fetch(base + `/delete-project-name/${id}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        }
    })
    return response.json()
}

async function insertProjectName(name) {

    const response = await fetch(base + `/insert-project-name`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            project_name: name
        })

    })
    return response.json()
}
async function getEvents(token, org, url) {

    const response = await fetch(!url?`https://api.calendly.com/scheduled_events?organization=https://api.calendly.com/organizations/${org}&sort=start_time:desc&count=6`:url, {
    
    method: 'GET',
        headers: {
            'Authorization': 'Bearer '+ token,
        }
    })
    return response.json()
}



let apis = {
    getProjects,
    getProjectNames,
    updateReview,
    updateProjectName,
    deleteProjectName,
    insertProjectName,
    getEvents, getInvitees
}
export default apis