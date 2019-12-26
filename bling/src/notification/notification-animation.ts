import { animate, state, style, transition, trigger, AnimationTriggerMetadata } from '@angular/animations';

const animationBody = [
    state('in', style({ transform: 'translateX(0)', opacity: 1 })),
    transition('void => *', [style({ transform: 'translateX(100%)', opacity: 0 }), animate(200)]),
    transition('* => void', [animate(300, style({ transform: 'translateX(100%)', opacity: 0 }))])
];

export const notificationAnimations  = [trigger('flyInOut', animationBody)];
