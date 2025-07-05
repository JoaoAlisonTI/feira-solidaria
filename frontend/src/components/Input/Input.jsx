import "./input.css"
import iconLupa from "../../assets/icon-lupa.svg"

function Input() {
    return (
        <div className="div-input">
            <img className="icon-lupa" src={iconLupa} alt="Icon de lupa" />
            <input
                type="text"
                className="form-control input-search"
                placeholder="Pesquisar doações..."
            />
            <button className="btn-custom-green btn-search">Pesquisar</button>
        </div>
    )
}

export default Input