import {IRecurringBudgetSequence} from "./iRecurringBudgetSequence";
import {ICategory} from "./iCategory";
import {IAccount} from "../../account/_interfaces/iAccount";

export interface IBudgetToCreate{
  amount: number;
  date: string;
  isArchived: boolean;
  note?: string;
  color?: string;
  icon?: string;
  transactionType: string;
  accountId: number;
  categoryId: number;
  recurringBudgetSequence?: IRecurringBudgetSequence | null;

}
