import React from 'react'
import './Projects.css'
import { projectsList } from './projectsList'

const Projects = () => {
  return (
    <section className="projects">
        <h1>Projects</h1>

        {projectsList.map((project) => (

          <div key={project.id} className="projects-main">
            <div className="projects-main_title">
              {project.name}
            </div>
            <div className="projects-main_img">
              <img src={`./sceens/${project.image}`} alt={project.image}/>
            </div>
            <div className="projects-main_description">
            {project.description}
            </div>
            <div className="projects-main_link">
              <a href={project.link} target="_blank" rel="noreferrer" >Go to website {project.linkName}</a>
            </div>
          </div>
        ))}

      
    </section>
  )
}

export default Projects
