import { Component } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { FormBuilder, FormGroup, FormsModule, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { CategoriesService } from '../../services/categories.service';
import { CommonModule } from '@angular/common';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { HttpClientModule} from '@angular/common/http';
import { Post } from '../../modules/post';
import { PostService } from '../../services/post.service';
// import { Router } from '@angular/router';
@Component({
  selector: 'app-new-post',
  standalone: true,
  imports: [ReactiveFormsModule,HttpClientModule,AngularEditorModule, CommonModule, RouterLink, FormsModule],
  templateUrl: './new-post.component.html',
  styleUrl: './new-post.component.css',
})
export class NewPostComponent {
// [x: string]: any;
  // event!:string;
  permalink!: string;
  SelectedImag: any;
  imgSrc: any = './assets/preview.png';
  categories: Array<any> | undefined;
  htmlContent: any;
  postForm:FormGroup;
  form_status:string ='Add new';
  I_D!:string;
  constructor(private categoriesService: CategoriesService,private fb: FormBuilder,private file_path:PostService,private router:ActivatedRoute) {
    // console.log(this.file_path.uploadImag(""));
      // console.log(this.router.queryParams);
      // this.router.queryParams.subscribe(val={

      // })

      this.router.queryParams.subscribe(val=>{
        // console.log(val);
        if(val['id']){
          this.I_D = val['id'];
          this.form_status = 'Edit';
          this.one_post(val['id']);
          // this.file_path.one_data(this.I_D);
        }
      })
      

    this.load_cate();
    this.postForm = this.fb.group({
      Title: ['', [Validators.required,Validators.minLength(10)]],
      perma_link: ['',Validators.required],
      excert: ['',[Validators.required,Validators.minLength(50)]],
      Category_: ['',Validators.required],
      post_Img: ['',Validators.required],
      content: ['',Validators.required]
    });

    this.postForm.get('Title')?.valueChanges.subscribe(title => {
      const permalink = title ? title.replaceAll(' ', '-'):'';
      this.postForm.get('perma_link')?.setValue(permalink);
    });
    // this.postForm.get('perma_link')?.disable();

 
  }

  
  

  async load_cate() {
    try {
      const data = await this.categoriesService.loadData();
      this.categories = data;
    } catch (e) {
      console.error('Error deleting document: ', e);
    }
  }

 

  Preview($event: any) {
    const target = $event.target as HTMLInputElement;
    if (target.files && target.files.length > 0) {
      const file = target.files[0];
      const reader = new FileReader();
      reader.onload = (e) => {
        this.imgSrc = e.target?.result;
      };
      reader.readAsDataURL(file);
      this.SelectedImag = $event.target.files[0];
    }
  }


  onSubmit(){
    // selected_img: File
  //   const permalink = this.postForm.value.title ? this.postForm.value.perma_link : '';
  // this.postForm.get('perma_link')?.setValue(permalink);
   
    // console.log(this.postForm.value);
    let spleted =this.postForm.value.Category_.split('-');
    const postData:Post = {
      title: this.postForm.value.Title,
      permlink:this.postForm.value.perma_link,
      catogory:{
        categoryId:spleted[0],
        category:spleted[1]
      },
      postImgPath:'',
      excert:this.postForm.value.excert,
      content:this.postForm.value.content,
      isFeatured:false,
      view:0,
      status:'new',
      created: new Date()
    };
    

    // console.log(postData);
    this.file_path.uploadImag(this.SelectedImag,postData,this.form_status,this.I_D);
    this.imgSrc ='./assets/preview.png';
    this.postForm.reset();
  }

  async one_post(id:string){
    const data = await this.file_path.one_data(id);
    console.log(data.data);
    if (data.data) {
        this.postForm.patchValue({
            Title: data.data['title'],
            perma_link: data.data['permlink'],
            excert: data.data['excert'],
            Category_: `${data.data['catogory'].categoryId}-${data.data['catogory'].category}`,
            
            content: data.data['content']
        });

        this.imgSrc = data.data['postImgPath'];
    }
    
  }
  
}
