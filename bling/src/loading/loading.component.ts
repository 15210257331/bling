import { Component, OnInit, OnChanges, OnDestroy, Input, Attribute, SimpleChanges, SimpleChange } from '@angular/core';
import { defaultBlLoadingConfig, Size, BlLoadingRef, loadingAnimationTypes } from './loading.config';
import { Subject } from 'rxjs';
import { BlLoadingService } from './loading.service';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'bl-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.css']
})
export class LoadingComponent implements OnInit, OnChanges, OnDestroy {

  private name: string;

  @Input() bdColor = defaultBlLoadingConfig.bdColor;
  
  @Input() bdOpacity = defaultBlLoadingConfig.bdOpacity;

  @Input() size: Size = 'large';

  @Input() color = defaultBlLoadingConfig.color;

  @Input() type = defaultBlLoadingConfig.type;

  @Input() fullScreen = true;

  blLoadingRef: BlLoadingRef = new BlLoadingRef();

  divArray: Array<number> = [];

  divCount = 0;

  show = false;

  ngUnsubscribe: Subject<void> = new Subject();

  constructor(
    private blLoadingService: BlLoadingService,
    @Attribute('name') name: string
  ) {
    this.name = name || defaultBlLoadingConfig.name;
  }

  ngOnInit() {
    this.setDefaultOptions();
    this.blLoadingService.getSpinner(this.name)
      .pipe(
        takeUntil(this.ngUnsubscribe)
      )
      .subscribe((blLoadingRef: BlLoadingRef) => {
        this.setDefaultOptions();
        Object.assign(this.blLoadingRef, blLoadingRef);
        this.show = blLoadingRef.show;
        if (this.show) {
          this.fullScreen = blLoadingRef.fullScreen;
          this.blLoadingRef.class = this.getClassName(this.blLoadingRef.type, this.blLoadingRef.size);
        }
      });
  }

  private setDefaultOptions() {
    this.blLoadingRef = new BlLoadingRef({
      name: this.name,
      bdColor: this.bdColor,
      size: this.size,
      color: this.color,
      type: this.type,
      fullScreen: this.fullScreen
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    const typeChange: SimpleChange = changes.type;
    const sizeChange: SimpleChange = changes.size;

    if (typeChange) {
      if (typeof typeChange.currentValue !== 'undefined' && typeChange.currentValue !== typeChange.previousValue) {
        if (typeChange.currentValue !== '') {
          this.blLoadingRef.type = typeChange.currentValue;
        }
      }
    }

    if (sizeChange) {
      if (typeof sizeChange.currentValue !== 'undefined' && sizeChange.currentValue !== sizeChange.previousValue) {
        if (sizeChange.currentValue !== '') {
          this.blLoadingRef.size = sizeChange.currentValue;
        }
      }
    }
  }

  private getClassName(type: string, size: Size): string {
    this.blLoadingRef.divCount = loadingAnimationTypes[type];
    this.blLoadingRef.divArray = Array(this.blLoadingRef.divCount).fill(0).map((x, i) => i);
    let sizeClass = '';
    switch (size.toLowerCase()) {
      case 'small':
        sizeClass = 'la-sm';
        break;
      case 'medium':
        sizeClass = 'la-2x';
        break;
      case 'large':
        sizeClass = 'la-3x';
        break;
      default:
        break;
    }
    return 'la-' + type + ' ' + sizeClass;
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
