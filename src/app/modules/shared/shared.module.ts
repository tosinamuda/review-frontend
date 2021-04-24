import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptorService } from '../core/interceptors/token-interceptor.service';
import { FilterPipe } from './filter/filter.pipe';

@NgModule({
    declarations: [
        HeaderComponent,
        FilterPipe
    ],
    imports: [
      CommonModule,
      RouterModule
    ],
    exports: [
        HeaderComponent,
        FilterPipe
    ],
    providers: [
      {
        provide: HTTP_INTERCEPTORS,
        useClass: TokenInterceptorService,
        multi: true
      }
    ]
  })
export class SharedModule {}
