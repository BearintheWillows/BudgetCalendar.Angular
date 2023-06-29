import {IAccount} from "./iAccount";
import {ICategory} from "./iCategory";
import {IRecurringBudgetSequence} from "./iRecurringBudgetSequence";

export interface IBudget {
  id: number;
  amount: number;
  date: Date;
  isArchived: boolean;
  note?: string;
  color?: string;
  icon?: string;
  transactionType: string;
  accountId: number;
  account: IAccount;
  category: ICategory;
  recurringBudgetSequence?: IRecurringBudgetSequence;
}

