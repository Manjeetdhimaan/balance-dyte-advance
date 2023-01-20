import { state, trigger, style, transition, animate } from '@angular/animations';
import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { AccordionService } from '../accordion.service';

@Component({
  selector: 'app-accordion-item',
  templateUrl: './accordion-item.component.html',
  styleUrls: ['./accordion-item.component.css'],
  animations: [
    trigger('smoothCollapse', [
      state('initial', style({
        height: '0',
        overflow: 'hidden',
        opacity: '0',
        visibility: 'hidden'
      })),
      state('final', style({
        overflow: 'hidden'
      })),
      transition('initial<=>final', animate('150ms'))
    ]),
    trigger('rotate', [
      state('default', style({ transform: 'rotate(0)' })),
      state('rotated', style({ transform: 'rotate(180deg)' })),
      transition('default<=>rotated', animate('150ms'))
    ])
  ]
})
export class AccordionItemComponent implements OnInit, OnDestroy {

  @Input() title: string = '';
  @Input() mobileNav: boolean = false;
  @Input() list: boolean = false;
  @Output() closeEvent: EventEmitter<any> = new EventEmitter();
  @Input() showBody = false;
  subscription: Subscription;

  constructor(private accordionService: AccordionService) { 
  }

  ngOnInit(): void {
    this.subscription = this.accordionService.showAccordionBody.subscribe((booleanValue: boolean) => {
      this.showBody = booleanValue;
    })
  }

  toggle() {
    this.showBody = !this.showBody;
  }

  close() {
    this.showBody = false;
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}