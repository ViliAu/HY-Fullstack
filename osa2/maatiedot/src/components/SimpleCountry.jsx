
const SimpleCountry = ({name, setSearch}) => {

    const show = () => {
        setSearch(name);
    }

    return <div>{name} <button onClick={show}>show</button></div>
}

export default SimpleCountry;