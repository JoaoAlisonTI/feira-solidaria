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

            </main>
        
        </>
    )
}

export default Home