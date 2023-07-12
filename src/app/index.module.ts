import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import {LogsXtermComponent} from './index.component'

@NgModule({
  imports: [CommonModule],
  declarations: [LogsXtermComponent],
  exports: [LogsXtermComponent],
})
export class LogsXtermModule {}
