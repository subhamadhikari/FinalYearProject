export type HospitalDropdown = {
    hospitalID: string,
    hospitalName: string
}

export type HospitalDetails = HospitalDropdown & {
    hospitalContact: number,
    hospitalAddress: string
}

export type HospitalAssociation = {
    hospitalID: number,
    doctorID: number
}