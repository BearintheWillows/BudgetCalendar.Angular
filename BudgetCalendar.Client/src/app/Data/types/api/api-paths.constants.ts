import {environment} from "../../../../environments/environment.development";

const baseUrl = environment.baseUrl;
export const AuthPaths = {
  Login: `${baseUrl}/auth/login`,
  Register: `${baseUrl}/auth/register`
}

export const CalendarPaths  = {
  DayBudgetsByRange: `${baseUrl}/budget?`,
}

export const CategoryPaths = {
  GetAllCategories: `${baseUrl}/category`,
  GetCategoryById: `${baseUrl}/category/`,
}

export const AccountPaths = {
  GetAllAccounts: `${baseUrl}/account`,
}

export const BudgetPaths = {
  PostBudget: `${baseUrl}/budget`,
  GetBudgetsByRange: `${baseUrl}/budget?`,
}
