import { Component, ElementRef, NgModule, NgZone, OnInit, ViewChild } from '@angular/core';
import { MouseEvent } from '@agm/core';
import { ApiService } from '../api.service';
import { DataSource } from '@angular/cdk/collections';
import { Observable } from 'rxjs';
import { FormControl, FormsModule, ReactiveFormsModule } from "@angular/forms";
import { AgmCoreModule, MapsAPILoader } from '@agm/core';


declare var google: any;

@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.css']
})

export class StoreComponent implements OnInit {
  lat:any;
  lng:any;
  @ViewChild("search")
  public searchElementRef: ElementRef;
  public searchControl: FormControl;
  constructor(private api: ApiService,private mapsAPILoader: MapsAPILoader,private ngZone: NgZone) { 
    // if (navigator)
    // {
    // navigator.geolocation.getCurrentPosition( pos => {
    //     this.lng = +pos.coords.longitude;
    //     this.lat = +pos.coords.latitude;
    //   });
    // }

  }
  zoom: number = 12;
  
  markers:any;
  ngOnInit() {
    this.setCurrentPosition();
    this.searchControl = new FormControl();
    
    this.api.getStores()
      .subscribe(res => {
        console.log(res);
        this.markers = res;
      }, err => {
        console.log(err);
      });
      
  }
  protected mapLoad(map) {
    console.log("Map Ready");
    this.mapsAPILoader.load().then(() => {
      let autocomplete = new window['google'].maps.places.Autocomplete(this.searchElementRef.nativeElement, {
        types: ["address"]
      });
      autocomplete.addListener("place_changed", () => {
        this.ngZone.run(() => {
          //get the place result
          let place: google.maps.places.PlaceResult = autocomplete.getPlace();
  
          //verify result
          if (place.geometry === undefined || place.geometry === null) {
            return;
          }
          
          //set latitude, longitude and zoom
          this.lat = place.geometry.location.lat();
          this.lng = place.geometry.location.lng();
          this.zoom = 12;
        });
      });
    });
    }
    protected setCurrentPosition() {
      if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition((position) => {
          this.lat = position.coords.latitude;
          this.lng = position.coords.longitude;
          this.zoom = 12;
        });
      }
    }
}
interface marker {
	lat: number;
	lng: number;
	label?: string;
	draggable: boolean;
}
