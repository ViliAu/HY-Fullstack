const Button = ({clickAction, text}) => {
    return (
        <>
            <button onClick={clickAction}>{text}</button>
        </>
    )
}

export default Button;