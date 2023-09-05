import Footer from '../common/Footer';
let AnimatedPiggyBank = require("../../UI/img/PiggyBank.gif");


const Landing = () => {
    
    return (
        <>
            <main className="flex bg_landing flex-grow items-center justify-center">

                <div className="landing_container flex flex-col items-center justify-center gap-5">
                    <img className="" src={AnimatedPiggyBank} alt="Piggy Bank" />           
                    <blockquote className="
                        flex flex-col 
                        items-center justify-center gap-3 
                        text-lg
                        font-normal
                    ">
                        <h1>Score Your Acctions, Elevate Your Life</h1>

                        <h1>Welcome To Goodwill Credit!</h1>
                    </blockquote>

                    <button className="btn-primary text-xl"><a href="/login">See my scores</a></button>
                </div>
            </main>
            <Footer />
        </>
    )
};

export default Landing;