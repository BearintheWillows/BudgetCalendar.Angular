import {IRecurringBudgetSequence} from "./iRecurringBudgetSequence";

export interface IBudgetToCreate{
  amount: number;
  date: Date;
  isArchived: boolean;
  note?: string;
  color?: string;
  icon?: string;
  transactionType: string;
  accountId: number;
  categoryId: number;
  recurringBudgetSequence?: IRecurringBudgetSequence;

}
