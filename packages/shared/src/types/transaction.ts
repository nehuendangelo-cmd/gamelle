export type TransactionType = 
  | 'initial_grant'
  | 'escrow_hold'
  | 'escrow_release'
  | 'escrow_refund'
  | 'meal_payment'
  | 'meal_earning';

export interface TokenTransaction {
  id: string;
  userId: string;
  amount: number;
  type: TransactionType;
  relatedReservationId: string | null;
  description: string | null;
  createdAt: Date;
}
