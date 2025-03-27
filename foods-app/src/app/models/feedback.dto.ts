export interface FeedbackCreateDTO {
    message: string;
  }
  
  export interface FeedbackResponseDTO {
    message: string;
    createdAt: Date;
  }