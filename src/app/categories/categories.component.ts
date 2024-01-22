import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CategoriesService } from '../services/categories.service';
import { Category } from '../models/category';
import { RouterLink } from '@angular/router';
@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [RouterLink,FormsModule, CommonModule],
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css'],
})
export class CategoriesComponent {
  onDelete(id: string) {
    this.categoryService.deleteData(id);
    this.loadData();
  }

  input_field_val: string;
  Form_status: string = 'Add';
  category_id: string;
  onEdit(category: string, id: string) {
    this.input_field_val = category;
    this.Form_status = 'Edit';
    this.category_id = id;
  }
  // Data!: Array<{id: string, data: object}>;
  categoryArray: Array<any> | undefined;

  constructor(private categoryService: CategoriesService) {
    this.loadData();
    this.input_field_val = '';
    this.category_id = '';
  }

  async loadData() {
    const data = await this.categoryService.loadData();
    this.categoryArray = data;
    console.log(this.categoryArray);
  }

  onSubmit(formData: any) {
    let categoryData: Category = formData.value;
    if (this.Form_status == 'Add') {
      console.log(categoryData.category);
      this.categoryService.saveData(categoryData);
      this.loadData();
      // alert(`this ${categoryData.category} is saved succesfully`);
    } else if (this.Form_status == 'Edit') {
      this.categoryService.updateData(this.category_id, categoryData);
      this.Form_status = 'Add';
      this.loadData();
    }

    formData.reset();
  }
}
