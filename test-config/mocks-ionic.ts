import {Platform} from "@ionic/angular";
import {NgZone, SecurityContext} from '@angular/core';
import {File} from '@ionic-native/file/ngx'
import {
  DomSanitizer,
  SafeHtml,
  SafeResourceUrl,
  SafeScript,
  SafeStyle,
  SafeUrl,
  SafeValue
} from '@angular/platform-browser';

export class PlatformMock extends Platform {
  currentPlatform : string = 'ios';

  constructor() {
    super(window.document, new NgZone({}));
  }

  public ready(): Promise<string> {
    return new Promise((resolve) => {
      resolve('READY');
    });
  }

  public getQueryParam(key: string) : string | null {
    return null;
  }

  public registerBackButtonAction(fn: Function, priority?: number): Function {
    return (() => true);
  }

  public hasFocus(ele: HTMLElement): boolean {
    return true;
  }

  public is(platform): boolean {
    return this.currentPlatform == platform;
  }

  public getElementComputedStyle(container: any): any {
    return {
      paddingLeft: '10',
      paddingTop: '10',
      paddingRight: '10',
      paddingBottom: '10',
    };
  }

  public onResize(callback: any) {
    return callback;
  }

  public registerListener(ele: any, eventName: string, callback: any): Function {
    return (() => true);
  }

  public raf(callback: any): number {
    return 1;
  }

  public timeout(callback: any, timer: number): any {
    return setTimeout(callback, timer);
  }

  public cancelTimeout(id: any) {
    // do nothing
  }

  public getActiveElement(): any {
    return document['activeElement'];
  }
}

export class FileMock extends File{
  cacheDirectory = '';
}

export class DeepLinkerMock {

}

export class DomSanitizerMock extends DomSanitizer {
  bypassSecurityTrustHtml(value: string): SafeHtml {
    return value;
  }

  bypassSecurityTrustResourceUrl(value: string): SafeResourceUrl {
    return value;
  }

  bypassSecurityTrustScript(value: string): SafeScript {
    return value;
  }

  bypassSecurityTrustStyle(value: string): SafeStyle {
    return value;
  }

  bypassSecurityTrustUrl(value: string): SafeUrl {
    return value;
  }

  sanitize(context: SecurityContext, value: SafeValue | string | null): string | null;
  sanitize(context: SecurityContext, value: {} | string | null): string | null;
  sanitize(context: SecurityContext, value: SafeValue | string | null | {}): string | null {
    return null;
  }
}
