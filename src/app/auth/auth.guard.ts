import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from "@angular/router";
import { select, Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { tap } from "rxjs/internal/operators/tap";
import { AppState } from "../reducers";
import { isLoggedIn } from "./auth.selectors";


@Injectable()
export class AuthGuard  implements CanActivate {

    constructor(private store: Store<AppState>,
        private route: Router) {

    }

    canActivate(route: ActivatedRouteSnapshot, state:  RouterStateSnapshot) : Observable<boolean> {
        return  this.store.pipe(
            select(isLoggedIn),
            tap(loggedIn => {
                if(!loggedIn) {
                    this.route.navigateByUrl('/login');
                }
            })
        )
    }

}