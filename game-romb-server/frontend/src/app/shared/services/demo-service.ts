import { Injectable, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { AppStore } from 'src/app/types/state';
import { OpenModal } from 'src/store/actions/modalActions';
import { selectInfoUser } from 'src/store/selectors';

@Injectable({
    providedIn: 'root'
})
export class DemoVersionServices {

    private store = inject(Store<AppStore>);
    private authService = inject(AuthService);
    idUser: string | undefined;
    subscription$: Subscription;
    openTimer: NodeJS.Timer;

    startDemoVersion(): void {
        this.subscription$ = this.store.select(selectInfoUser).subscribe((infoUser) => {
            this.idUser = infoUser?.id;
            this.openModal();
        });
        if (!this.idUser) this.authService.anonimRegister();
    }

    openModal() {
        if (this.idUser) {
            console.log('open modal')
            this.store.dispatch(OpenModal({ payload: { modalState: 'demoVersion' } }));
            this.subscription$.unsubscribe();
        };
    }

}
