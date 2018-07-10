import {ToastOptions} from 'ng2-toastr';

export class CustomOption extends ToastOptions {
    toastLife = 7000;
    animate = 'flyRight';
    showCloseButton = true;
    positionClass = 'toast-bottom-center';
}