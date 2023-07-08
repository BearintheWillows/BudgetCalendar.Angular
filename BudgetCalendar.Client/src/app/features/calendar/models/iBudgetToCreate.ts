import {IRecurringBudgetSequence} from "./iRecurringBudgetSequence";
import {ICategory} from "./iCategory";

export interface IBudgetToCreate{
  amount: number;
  date: Date;
  isArchived: boolean;
  note?: string;
  color?: string;
  icon?: string;
  transactionType: string;
  accountId: number;
  category: ICategory;
  recurringBudgetSequence?: IRecurringBudgetSequence;

}
