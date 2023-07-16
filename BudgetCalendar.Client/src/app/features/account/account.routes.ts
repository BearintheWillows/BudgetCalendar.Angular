import {Route} from "@angular/router";
import {AccountComponent} from "./account.component";
import {AddAccountComponent} from "./components/add-account/add-account.component";

export const ACCOUNT_ROUTES: Route[] = [
  {
    path: '', component: AccountComponent,
  },
  {
    path: 'add-account', component: AddAccountComponent,
  }
];
