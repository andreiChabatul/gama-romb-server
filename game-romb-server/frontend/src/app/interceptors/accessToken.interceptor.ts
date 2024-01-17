import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { Observable, asapScheduler } from "rxjs";
import { AppStore } from "../types/state";
import { ClearModalInfo } from "src/store/actions/modalActions";

@Injectable()
export class AccessTokenInterceptor implements HttpInterceptor {
    constructor(private store: Store<AppStore>) { }
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        asapScheduler.schedule(() => this.store.dispatch(ClearModalInfo()));
        const accessToken = localStorage.getItem('accessToken');
        if (accessToken) {
            const tokenReq = req.clone({
                headers: req.headers.append('Authorization', accessToken),
            })
            return next.handle(tokenReq);
        };
        return next.handle(req);
    };
}