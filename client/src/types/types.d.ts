
interface protectedRouteProps {
    element: React.ReactNode
}

interface eventProp {
    id: string,
    name: string,
    description: string,
    start_date: string,
    end_date: string,
    host_id: string
}

declare module "*.jpg" {
    const path: string;
    export default path;
}

declare module "*.png" {
    const path: string;
    export default path;
}

declare module "*.jpeg" {
    const path: string;
    export default path;
}