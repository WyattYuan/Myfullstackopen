

const Notification = ({ message, type }) => {
    if (message === null) {
        return null
    }

    const baseStyle = {
        fontSize: '20px',
        borderRadius: '5px',
        padding: '10px',
        marginBottom: '10px',
    }

    const typeStyle = type === 'success'
        ? { color: 'green', background: 'lightgreen', border: 'solid' }
        : { color: 'red', background: 'lightgrey', border: 'solid' }

    return (
        <div className={type} style={{ ...baseStyle, ...typeStyle }}>
            {message}
        </div>
    )
}

export default Notification