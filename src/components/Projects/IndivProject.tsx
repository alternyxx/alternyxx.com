interface IndivProject {
    projectName: string
    description: string
}

export default function IndivProject(props: IndivProject) {
    return (
        <div className="IndivProject">
            <p className="ProjectName">
                {props.projectName}
            </p>
            <p className="ProjectDescription">
                {props.description}
            </p>
        </div>
    )
}