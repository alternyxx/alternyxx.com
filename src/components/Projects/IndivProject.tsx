interface IndivProject {
    ProjectName: string
}

export default function IndivProject(props: IndivProject) {
    return (
        <div className="IndivProject">
            <p className="ProjectName">
                {props.ProjectName}
            </p>
        </div>
    )
}