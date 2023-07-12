import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Input,
  OnDestroy,
  ViewChild,
} from '@angular/core';
import { ITerminalOptions, Terminal } from 'xterm';
import { FitAddon } from 'xterm-addon-fit';
import { SearchAddon } from 'xterm-addon-search';
import { WebLinksAddon } from 'xterm-addon-web-links';
import {debounce} from 'lodash'

@Component({
  selector: 'alo-logs-xterm',
  template: '<div class="logs-xterm" #terminal></div>',
  styleUrls: ['./index.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LogsXtermComponent implements AfterViewInit, OnDestroy {
  _logs: string[] | string;
  lineNumber = 0;
  // TODO: need to fix exist problem
  @Input()
  lineNumVisible = false;

  @Input()
  enableFitLines = false;

  feedLines = 1;
  onecable = true;

  @Input()
  set logs(logs: string[] | string) {
    if (!logs) {
      this._logs = '';
    } else if (
      !Array.isArray(logs) ||
      (Array.isArray(logs) && !Array.isArray(this._logs)) ||
      !this.isChildLogsArr(this.logs as string[], logs)
    ) {
      this._logs = logs.slice();
      this.terminal.clear();
      this.write(logs, () => {
        this.terminal.scrollToBottom();
      });
    } else if (this.isChildLogsArr(this._logs as string[], logs)) {
      this.write(logs.slice(this._logs.length));
      this._logs = logs.slice();
    }
  }

  get logs() {
    return this._logs;
  }

  @ViewChild('terminal', { static: true })
  termianlWrapper: ElementRef;

  terminal: Terminal;
  searchAddon = new SearchAddon();
  fitAddon = new FitAddon();
  webLinksAddon = new WebLinksAddon();


  baseTerminalOptions: ITerminalOptions = {
    fontSize: 12,
    lineHeight: 1.2,
    letterSpacing: 0,
    fontWeight: '400',
    fontFamily: 'Consolas, "Courier New", monospace',
    bellStyle: 'sound',
    cursorBlink: false,
    theme: { background: '#263238' },
    rendererType: 'canvas',
    scrollback: Number.MAX_SAFE_INTEGER,
  };

  constructor() {
    this.terminal = new Terminal(this.baseTerminalOptions);
    this.terminal.loadAddon(this.fitAddon);
    this.terminal.loadAddon(this.searchAddon);
    this.terminal.loadAddon(this.webLinksAddon);
  }

  ngAfterViewInit(): void {
    // Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
    // Add 'implements AfterViewInit' to the class.

    this.terminal.open(this.termianlWrapper.nativeElement);
    window.addEventListener('resize', this.resizeFit);
    if (this.enableFitLines) {
      const defaultRows = this.terminal.rows;
      const defaultCols = this.terminal.rows;
      this.terminal.resize(defaultCols, Math.min(defaultRows, this.feedLines));
      this.terminal.onLineFeed(() => {
        this.feedLines++;
        this.terminal.resize(
          defaultCols,
          Math.min(defaultRows, this.feedLines),
        );
      });
    }

    new MutationObserver(() => {
      this.fitAddon.fit();
    }).observe(this.termianlWrapper.nativeElement, {
      childList: false,
      attributes: true,
      subtree: true,
    });
  }

  private readonly resizeFit = debounce(() => {
    this.fitAddon.fit();
  }, 500);

  private isChildLogsArr(preLogs: string[], newLogs: string[]): boolean {
    if (
      !Array.isArray(preLogs) ||
      !Array.isArray(newLogs) ||
      preLogs.length > newLogs.length
    ) {
      return false;
    }
    return !preLogs.some((log, i) => log !== newLogs[i]);
  }

  ngOnDestroy() {
    window.removeEventListener('resize', this.resizeFit);
    if (this.terminal) {
      this.terminal.dispose();
    }
  }

  write(logs: string | string[], callback?: () => void) {
    if (this.terminal && this.terminal.write) {
      Array.isArray(logs)
        ? logs.forEach(v => this.terminal.write(v, callback))
        : this.terminal.write(logs || '', callback);
    }
  }
}
