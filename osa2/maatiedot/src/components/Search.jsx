const Search = ({search, setSearch}) => {

    const updateSearch = (event) => {
        setSearch(event.target.value);
    }

    return (
        <form>
            find countries <input value={search} onChange={updateSearch} />
        </form>
    )
}

export default Search;