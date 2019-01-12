/**
 * Promos=Promotions are rewards for doing something we appreciate.
 *
 * Note: The threshold fields are intentionally required so that db
 * queries, like usageCount<=usageCountMax, work. To set to infinity,
 * set value to 1B-1=999999999
 */
export interface Promo {
  createdAt: number;
  updatedAt: number;
  createdBy: string;
  title: string;
  code: string; // set to ID if not specified.
  mode: 0 | 1; // manual/auto applied
  disabled: boolean;
  status: 0 | 1; // inactive/active; is computed
  usageCountMax?: number;
  usageCount: number;
  usageCountPerUserMax?: number;
  usageAmountMax?: number;
  usageAmount: number;
  startAt?: number;
  endAt?: number;
  amount: number;
  referrerRequired: boolean;
  referrerAmount?: number;
}

export interface PromoUpdate {
  updatedAt: number;
  title?: string;
  code?: string; // set to ID if not specified.
  mode?: 0 | 1; // manual/auto applied
  disabled?: boolean;
  status?: 0 | 1; // inactive/active; is computed
  usageCountMax?: number;
  usageCount?: number;
  usageCountPerUserMax?: number;
  usageAmountMax?: number;
  usageAmount?: number;
  startAt?: number;
  endAt?: number;
  amount?: number;
  referrerRequired?: boolean;
  referrerAmount?: number;
}
