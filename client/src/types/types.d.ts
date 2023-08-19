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
    startDate: string,
    endDate: string,
    hostId: string
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

interface participantProp {
    id: string,
    isHost: boolean,
    totalCredits: number,
    user: {
        id: string,
        firstName: string,
        isOnline: boolean,
        lastName: string,
        updatedAt: date
    }
}

interface participantShowProp {
    participant: participantProp,
    user: userProp,
    isHost: boolean
}

interface participantListProps {
    isHost: boolean;
    eventId: string;
}

interface tagColorsProp {
    Other: string,
    Homework: string,
    Chores: string,
    Holiday: string
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