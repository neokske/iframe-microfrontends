import {AfterViewInit, Component, ElementRef, ViewChild} from '@angular/core';

interface ReactData {
  message: string;
  data?: any;
  appName: string;
}

const isReactData = (data?: object): data is ReactData => data && data.hasOwnProperty('appName') && data.hasOwnProperty('message');

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit {
  dataToSend: string;
  reactData: string;

  @ViewChild('freem') myIframe: ElementRef;

  sendToReact() {
    this.myIframe.nativeElement.contentWindow.postMessage(this.dataToSend, '*');
  }

  ngAfterViewInit(): void {
    window.onmessage = e => {
      const data = e.data;
      if (isReactData(data)) {
        console.log('data', data);
        this.reactData = data.message;
      }
    };
  }
}
