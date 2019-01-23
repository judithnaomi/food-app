import { InMemoryDbService } from 'angular-in-memory-web-api';

export class InMemoryDataService implements InMemoryDbService {
  createDb() {
      const products = [
      { id: 11, name: 'Pizza Margherita', price: 3},
      { id: 12, name: 'Stamppot', price: 3 },
      { id: 13, name: 'Nasi Goreng', price: 3 },
      { id: 14, name: 'Tomato soup' , price: 3},
      { id: 15, name: 'Tiramisu', price: 3 },
      { id: 16, name: 'Mosamma' , price: 3},
      { id: 17, name: 'Paella Valenciana' , price: 3},
      { id: 18, name: 'Appel crumble', price: 3 },
      { id: 19, name: 'Penne Arrabiata', price: 3 },
      { id: 20, name: 'Penne pesto e pollo', price: 3 }
    ];

     const restaurants = [
      { id: 11, name: 'Papa Johns'},
      { id: 12, name: 'Bazar Amsterdam'},
      { id: 13, name: 'Pannenkoekenhuis'},
      { id: 14, name: 'Il Cafe'},
      { id: 15, name: 'Delphi'}
    ];

    return { products, restaurants };
  }
}



