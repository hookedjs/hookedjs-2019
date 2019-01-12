export interface Ledger {
  createdAt: number;
  updatedAt: number;
  balance: number;
  comment: string;
  status: 0 | 1; // inactive/active
}
export interface LedgerUpdate {
  updatedAt: number;
  balance?: number;
  comment?: string;
  status?: 0 | 1; // inactive/active
}
