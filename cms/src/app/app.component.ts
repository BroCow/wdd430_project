import { Component } from '@angular/core';

@Component({
  selector: 'cms-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  // The switchView() method in the app.component.ts file is also no longer needed. Delete the selectedFeature property and the switchView() method in the AppComponent class
  // selectedFeature: string = 'documents';
  // switchView(selectedFeature: string){
  //   this.selectedFeature = selectedFeature;
  // }
}
 