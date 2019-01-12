export interface BalanceTransaction {
  createdAt: number;
  from: string;
  to: string;
  // parent?: string;
  amount: number;
  comment: string;
  promo?: string;
  promoCarbonCopy?: any;
}
