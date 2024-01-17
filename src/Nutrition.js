export const Nutrition = ({ label, quantity, unit }) => {
    return (
        <div className="container">
            <p className="lqu"><b>{label}</b> - {quantity.toFixed()} {unit}</p>
        </div>
    )
}

export default Nutrition;