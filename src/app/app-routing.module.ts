import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductsComponent }      from './products/products.component';

import { DashboardComponent }   from './dashboard/dashboard.component';

import { ProductDetailComponent } from './product-detail/product-detail.component';

import { RestaurantsComponent } from './restaurants/restaurants.component';

import { RestaurantDetailComponent } from './restaurant-detail/restaurant-detail.component';

const routes: Routes = [
  { path: '', redirectTo: 'products', pathMatch: 'full' },
  { path: 'products', component: ProductsComponent },
  { path: 'product_detail/:id', component: ProductDetailComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'restaurants', component: RestaurantsComponent },
  { path: 'restaurant_detail/:id', component: RestaurantDetailComponent }
];


@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}