import heroImage from "../../assets/hero-section-image.svg"
import Input from "../../components/Input/Input"
import "./home.css"

function Home() {
    return (
        <>
            <main className="main container-md">
                <section
                    className="hero-section d-flex justify-content-center align-items-center text-center"
                    style={{
                        backgroundImage: `url(${heroImage})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                    }}
                    >
                    <div className="hero-content">
                        <h1 className="titulo-hero fw-bold text-white">
                        Conectando corações, partilhando alimentos.
                        </h1>
                        <Input />
                    </div>
                </section>
                <section className="list-itens-section">
                    <div className="select-div">
                        <select className="select" name="categoria">
                            <option value="">Categoria</option>
                            <option value="alimentos">Alimentos</option>
                            <option value="roupas">Roupas</option>
                            <option value="calçados">Calçados</option>
                            <option value="acessorios">Acessórios</option>
                            <option value="higiene-pessoal">Higiene pessoal</option>
                            <option value="moveis">Móveis</option>
                            <option value="eletrodomesticos">Eletrodomésticos</option>
                            <option value="utensilios-domesticos">Utensílios domésticos</option>
                            <option value="livros">Livros</option>
                            <option value="material-escolar">Material escolar</option>
                            <option value="brinquedos">Brinquedos</option>
                            <option value="itens-infantis">Itens infantis</option>
                            <option value="tecnologia">Tecnologia</option>
                            <option value="ferramentas">Ferramentas</option>
                            <option value="esporte-lazer">Esporte e lazer</option>
                            <option value="jardinagem">Jardinagem</option>
                            <option value="outros">Outros</option>
                        </select>

                        <select className="select" name="localizacao">
                            <option value="">Localização</option>
                            <option value="centro">Centro</option>
                            <option value="zona-norte">Zona Norte</option>
                            <option value="zona-sul">Zona Sul</option>
                            <option value="zona-leste">Zona Leste</option>
                            <option value="zona-oeste">Zona Oeste</option>
                            <option value="bairro-1">Bairro 1</option>
                            <option value="bairro-2">Bairro 2</option>
                            <option value="cidade-a">Cidade A</option>
                            <option value="cidade-b">Cidade B</option>
                            <option value="outras">Outras localidades</option>
                        </select>
                    </div>

                    <div className="itens-div">
                    {/*Itens mapeados aqui*/}
                    </div>    
                </section>    
            </main>
        
        </>
    )
}

export default Home