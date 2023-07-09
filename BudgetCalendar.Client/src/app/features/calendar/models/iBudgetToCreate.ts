import {IRecurringBudgetSequence} from "./iRecurringBudgetSequence";
import {ICategory} from "./iCategory";
import {IAccount} from "../../account/_interfaces/iAccount";

export interface IBudgetToCreate{
  amount: number;
  date: Date;
  isArchived: boolean;
  note?: string;
  color?: string;
  icon?: string;
  transactionType: string;
  account: IAccount;
  category: ICategory;
  recurringBudgetSequence?: IRecurringBudgetSequence;

}
