import { Component } from '@angular/core';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-parent',
  templateUrl: './parent.component.html',
  styleUrls: ['./parent.component.css'],
})
export class ParentComponent {
  constructor(private dataService: DataService) {}
  updateData() {
    this.dataService.updateData('updateData from parent');
  }
}
