import React, {useState, useEffect} from 'react'
import apis from '../../apis/apis'
export const AppContextProvider = React.createContext()
const AppContext = function(props){
const previousUser= JSON.parse(localStorage.getItem('darey-user')) ||{}

const [projects, setProjects] = useState([])
const [formatedProjects, setFormatProjects] = useState([])
const [projectNames, setProjectNames] = useState([])
const [state, setStateChanged] = useState(false)

async function setupProjects(projects){
            setFormatProjects(projects.formatArray)
            setProjects(projects.projectArray)
            return {
                formatedProjects:projects.formatArray,
                projects:projects.projectArray
            }
}
async function loadProjects(){
    const projects = await apis.getProjects()
    return  setupProjects(projects)
     
}
async function loadProjectNames(){
    const projectNames = await apis.getProjectNames()
     setProjectNames(projectNames)
     return projectNames
}
return (
    <AppContextProvider.Provider value={{ loadProjects,loadProjectNames, formatedProjects, projects, projectNames}}>
        {props.children}
    </AppContextProvider.Provider>
)
}

export default AppContext

