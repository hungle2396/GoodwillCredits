interface clientRoutesProp {
    user: string
}

interface protectedRoutesProps {
    children?: ReactNode,
    user: string
}

interface eventListProp {
    title: string,
    data: eventProp[]
}

interface eventProp {
    id: string,
    name: string,
    description: string,
    start_date: string,
    end_date: string,
    host_id: string
}

interface userProp {
    id?: string,
    firstName?: string,
    lastName?: string,
    email?: string,
    role?: string,
    password?: string,
    birthday?: string,
    address?: string,
    city?: string,
    state?: string,
    zipCode?: string,
    isOnline?: boolean,
    phone?: string,
}

interface peopleFormProp {
    mode: string,
    personData: userProp,
    onClose: () => void;
    onCloseSetting?: () => void;
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