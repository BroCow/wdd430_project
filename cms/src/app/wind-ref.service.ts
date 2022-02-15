import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class WindRefService {

  constructor() { }

  // add the getNativeWindow() method shown below to the WindRefService class. This method returns a single reference to the DOM window object. The window object contains useful functions to interact with the browser window. We will use it in the next step to open a new window.
  getNativeWindow(){
    return window;
  }
}
