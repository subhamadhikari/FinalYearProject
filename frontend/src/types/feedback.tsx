export type Feedback = {
    doctorID: number
    patientID: number
    feedbackContent: string
    feedbackTumorSeverity: string
    segmentationMRI: string
}

export type FeedbackResponse = {
    feedbackContent: string
    feedbackTumorSeverity: string
    feedbackDate: string
    doctorName: string
}

export type FeedbackView = {
    feedbackContent: string
    feedbackTumorSeverity: string
    patientName: string
    feedbackID?: number
    segmentationID?: number
}

export type FeedbackUpdate = {
    feedbackContent: string
    feedbackTumorSeverity: string    
}