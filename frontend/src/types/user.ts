export enum UserRole {
    "Doctor" = '1',
    "Patient" = '2',
    "Normal User" = '3'
}

export type newUser = {
    userFirstName: string
    userLastName: string
    password: string
    email: string
    phoneNumber:number
    userRole: UserRole
    address?:string
    userDOB?:string
    hospitalID?:number
}

export type loggedUser = {
    email: string
    password: string
}

export type AuthUser = {
    email: string,
    id: number,
    role: string,
    hospitalID:number
}

export type Patient = {
    userFirstName: string,
    userLastName: string,
    userID: string
}

export type RecentPatient = {
    email:string,
    fullName: string,
    userID: number,
    tumorSeverity: string,
    segmentationMRI: string,
    feedbackID: number,
    age: number,
    hospitalName: string
}