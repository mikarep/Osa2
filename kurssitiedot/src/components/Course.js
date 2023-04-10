const Header = (props) => {
    console.log(props)
    return (
        <div>
            <h1>{props.header.name}</h1>
        </div>
    )
}

const Content = (props) => {
    console.log(props)
    return (
        <div>
            <ul>
                {props.courseParts.parts.map(part =>
                    <Part key={part.id} name={part.name} exercises={part.exercises} />
                )}
            </ul>
        </div>
    )
}

const Total = (props) => {
    console.log(props)
    return (
        <div>
            <h2>total of {props.exercisesTotal.parts.reduce((prev, next) => console.log('what is happening', prev, next) || prev + next.exercises, 0)} exercises</h2>
        </div>
    )
}

const Part = (props) => {
    console.log(props)
    return (
        <li>
            {props.name} {props.exercises}
        </li>
    )
}

const Course = (props) => {
    console.log(props)
    return (
        <div>
            <Header header={props.course} />
            <Content courseParts={props.course} />
            <Total exercisesTotal={props.course} />
        </div>
    )
}

export default Course