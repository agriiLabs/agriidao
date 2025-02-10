import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useAuth } from "../../hooks/Context";
import ProfileClick from "../profile/component/ProfileClick"
import { Project } from "../../../../declarations/projects/projects.did";

const StartProject = () => {
    const { projectsActor } = useAuth();
    const { id } = useParams();
    const [startProject, setStartProject] = useState<Project | null>(null);

    useEffect(() => {
        if (projectsActor) {
            getProject();
        }
    }, [projectsActor]);

    const getProject = async () => {
        if (!id || !projectsActor) {
            console.error("ID or projectsActor is null");
            return;
        }
        let res = await projectsActor?.getProjectById(id);
        if (res) {
            setStartProject(res);
        }
    };
    console.log("start project", startProject);
  return (
    <>
      <div className="header header-fixed header-logo-center">
        <a href="#" className="header-title">
          Start Project
        </a>
        <button
          onClick={() => window.history.back()}
          data-back-button
          className="header-icon header-icon-1"
        >
          <i className="fas fa-arrow-left"></i>
        </button>
        <ProfileClick />
      </div>

      <div className="page-content header-clear-medium">
        <div className="card card-style">
          <div className="content mb-0">
              {/* {hasSubmitted ? (
                      <div className="d-flex mb-3">
                        <div className="align-self-center ">
                        <p className="font-16">{commodity?.name}</p>
                      </div>
                      <i className="fa fa-check-circle ms-auto text-success text-end mt-2" />
                      </div>
                    ) : (
                      <Link 
                      to={`/add-commodity-price/${commoditySub?.id}`}
                      className="d-flex mb-3"
                    >
                      <div className="align-self-center ">
                        <p className="font-16">{commodity?.name}</p>
                      </div>
                      <i className="fa fa-angle-right ms-auto text-end text-dark mt-2" />
                    </Link>
                    )} */}
          </div>
        </div>
      </div>
    </>
  )
}

export default StartProject