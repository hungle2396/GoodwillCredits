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
    id?: string,
    name: string,
    description: string,
    startDate: string,
    endDate: string,
    active: boolean,
    tag: string
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

interface eventFormProp {
    mode: string,
    eventData: eventProp,
    onClose: () => void;
    onCloseSetting: () => void;
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

interface taskStatusColorsProp {
    Pending: string,
    Rejected: string,
    Approved: string
}

interface taskProp {
    id: string,
    eventId: string, 
    participantId: string, 
    transactionType: string,
    approvalStatus: string,
    credits: number 
}

interface taskApprovalProp {
    id: string,
    eventId: string,
    userId: string,
    description: string,
    credits: number,
    createdAt: string,
    transactionType: string,
    status: string,
    user: {
        firstName: string,
        lastName: string
    }
}

interface responseMessageProp {
    error?: {
        data?: {
            error: string
        },
        status?: number
    }
    data?: {
        message?: string
    },
    status?: number,
}

interface errorMessageProp {
    data?: {
        message?: string,
        error?: string
    },
    status?: number
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