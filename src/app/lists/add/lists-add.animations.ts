import { animate, state, style, transition, trigger } from '@angular/animations';

export const listsAddAnimations = [
  trigger('flyInOut', [
    state('inactive', style({
      transform: 'translateX(100%)'
    })),
    state('active', style({
      transform: 'translateX(0)'
    })),
    transition('inactive => active', animate('300ms ease-in-out')),
    transition('active => inactive', animate('300ms ease-in-out'))
  ])
];
