import Footer from '../common/Footer';
let AnimatedPiggyBank = require("../../UI/img/PiggyBank.gif");


const Landing = () => {
    
    return (
        <>
            <main className="
                flex flex-grow
                items-center justify-center
                bg_landing
                
            ">

                <div className="landing_container flex flex-col items-center justify-center gap-5">
                    <img 
                        className="
                            w-[20rem] sm:w-[30%] md:w-4/5 lg:w-[70%] 2xl:w-[100%]
                        " 
                        src={AnimatedPiggyBank}
                        alt="Piggy Bank"
                    />           
                    <blockquote className="
                        flex flex-col 
                        items-center justify-center gap-3 
                        text-lg md:text-xl lg:text-2xl 2xl:text-3xl
                        font-normal
                    ">
                        <h1>Score Your Actions, Elevate Your Life</h1>

                        <h1>Welcome To Goodwill Credit!</h1>
                    </blockquote>

                    <button className="btn-primary text-xl lg:text-2xl 2xl:text-3xl"><a href="/login">See my scores</a></button>
                </div>
            </main>
            <Footer />
        </>
    )
};

export default Landing;