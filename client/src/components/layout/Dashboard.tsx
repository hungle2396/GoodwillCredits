import { useFetchUserQuery } from "../../redux/store";


const Dashboard = () => {
    console.log("In the dashboard component");
    
    const { data } = useFetchUserQuery();

    console.log(data);
    return (
        <main className="flex-grow">
            <button className=''>Create Event</button>
        </main>
    )
};

export default Dashboard;