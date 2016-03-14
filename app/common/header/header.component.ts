import {Component, Input, Output, Inject, OnInit, EventEmitter} from 'angular2/core';
import {RouterLink} from 'angular2/router';
import {Observable} from "rxjs/Observable";

import {HeaderService} from './header.service';
import {MainMenuComponent} from '../menu/menu.component';
import {SearchComponent} from '../search/search.component';
import {PlaceMapComponent} from '../place-map/place-map.component';

let tpl = require('./header.component.html');
let style = require('./header.component.css');

@Component({
  selector: 'header',
  template: tpl,
  styles: [style],
  directives: [SearchComponent, MainMenuComponent, PlaceMapComponent, RouterLink]
})

export class HeaderComponent implements OnInit {
  @Input()
  private query:string;
  @Input('hoverPlace')
  private hoverPlace:Observable<any>;
  @Input('chosenPlaces')
  private chosenPlaces:Observable<any>;
  @Output()
  private filter:EventEmitter<any> = new EventEmitter();

  private activeThing:any;
  private defaultThing:any;
  private hoveredPlace:any;
  private headerService:HeaderService;

  constructor(@Inject(HeaderService) headerService) {
    this.headerService = headerService;
  }

  ngOnInit():void {
    this.headerService.getDefaultThing()
      .subscribe((res:any)=> {
        if (res.err) {
          return res.err;
        }
        this.defaultThing = res.data;
      });
    this.hoverPlace && this.hoverPlace.subscribe((place)=> {
      this.hoveredPlace = place;
    })
  }

  urlTransfer(url) {
    this.filter.emit(url);
  }

  activeThingTransfer(thing) {
    this.activeThing = thing;
  }
}
