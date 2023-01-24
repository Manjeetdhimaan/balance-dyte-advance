import { animate, style, transition, trigger, state } from '@angular/animations';

export const fade =
trigger('fade', [
  transition('void => active', [
    style({ opacity: 0.7 }),
    animate(800, style({ opacity: 1 }))
  ]),
  transition('* => void', [
    animate(800, style({ opacity: 0 }))
  ])
])


export function moveIn() {
  return trigger('moveIn', [
    state('void', style({position: 'fixed', width: '100%'}) ),
    state('*', style({position: 'fixed', width: '100%'}) ),
    transition(':enter', [
      style({opacity:'0', transform: 'translateX(100px)'}),
      animate('.6s ease-in-out', style({opacity:'1', transform: 'translateX(0)'}))
    ]),
    transition(':leave', [
      style({opacity:'1', transform: 'translateX(0)'}),
      animate('.3s ease-in-out', style({opacity:'0', transform: 'translateX(-200px)'}))
    ])
  ]);
}

export function fallIn() {
  return trigger('fallIn', [
    transition(':enter', [
      style({opacity:'0'}),
      animate('.4s .2s ease-in-out', style({opacity:'1'}))
    ]),
    transition(':leave', [
      style({opacity:'1'}),
      animate('.3s ease-in-out', style({opacity:'0'}))
    ])
  ]);
}

export function moveInLeft() {
  return trigger('moveInLeft', [
    transition(':enter', [
      style({opacity:'0', transform: 'translateX(-100px)'}),
      animate('.6s .2s ease-in-out', style({opacity:'1', transform: 'translateX(0)'}))
    ])
  ]);
}