
import {ICategory} from "./iCategory";
import {IRecurringBudgetSequence} from "./iRecurringBudgetSequence";
import {IAccount} from "../../account/_interfaces/iAccount";

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

