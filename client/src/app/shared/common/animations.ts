import { animate, style, transition, trigger } from '@angular/animations';

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