export type ReservationStatus = 
  | 'pending'
  | 'confirmed'
  | 'pickup_confirmed'
  | 'completed'
  | 'cancelled'
  | 'disputed';

export interface Reservation {
  id: string;
  mealId: string;
  reserverId: string;
  tokensEscrowed: number;
  status: ReservationStatus;
  pickupPhotoUrl: string | null;
  pickupConfirmedAt: Date | null;
  completedAt: Date | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface Dispute {
  id: string;
  reservationId: string;
  reporterId: string;
  reason: string;
  status: 'open' | 'resolved' | 'dismissed';
  resolution: string | null;
  createdAt: Date;
  updatedAt: Date;
}
