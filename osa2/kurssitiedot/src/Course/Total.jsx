const Total = ({parts}) => {
    const total = parts.map(p => p.exercises).reduce((acc, curr) => acc + curr);
    return (
        <p><b>Total of {total} exercises</b></p>
    );
}

export default Total;