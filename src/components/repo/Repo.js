import React, { Fragment } from "react";
import './Repo.css';

const Repo = (props) => {
    const repoData = props.repoData;
    let repoElement = repoData ? (
        repoData.map(obj => {
            return (
                <div className="repo-item p-3" key={obj.id}>
                    <div className="row repo-general">
                        <div className="col-4 repo-name"><b>Name:</b> {obj.name}</div>
                        <div className="col-6 repo-url"><b>URL:</b> <a href={obj.html_url} target="_blank" rel="noreferrer">{obj.html_url}</a></div>
                        <div className="col-2 repo-rank">
                            <div className="repo-star"><i className="fa fa-star-o" aria-hidden="true"></i> {obj.stargazers_count}</div>
                            <div className="repo-watch"><i className="fa fa-eye" aria-hidden="true"></i> {obj.watchers_count}</div>
                        </div>
                    </div>
                    {
                        obj.description ? (
                            <div className="repo-desc">
                                <p><b>Description:</b></p>
                                {obj.description}
                            </div>
                        ) : null
                    }                        
                </div>
            );
        })
    ) : null;

    return (
        <Fragment>
            {repoElement}
        </Fragment>
    );
}

export default Repo;