import { CardService } from './card.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CardService {

  

  constructor() { }

  public cardData = [
    {
      Date: new Date(2023,5, 24),
      BudgetSections: [
        {
          name: "Income",
          amount: -100
        }, {
          name: "Expenses",
          amount: 23
        }, {
          name: "Savings",
          amount: 10
        },
      },
    {
      Date: new Date(2023, 5,5),
      BudgetSections: [
        {
          name: "Income",
          amount: -100
        }, {
          name: "Expenses",
          amount: 23
        }, {
          name: "Savings",
          amount: 10
        },
      ]
    },    
}
