const Total = ({parts}) => {
    let total = 0;
    parts.forEach(p => total += p.exercises);
    return (
        <p>Number of exercises {total}</p>
    );
}

export default Total;