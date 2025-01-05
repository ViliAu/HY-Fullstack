import Part from './Part';

const Content = ({parts}) => {
    const exEles = parts.map(parts => <Part part={parts.name} exs={parts.exercises}></Part>);

    return (
        <>
            {...exEles}
        </>
    );
}

export default Content;