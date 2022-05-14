import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { PostsService } from 'src/app/services/posts.service';


@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.scss']
})
export class WallCreatePostComponent implements OnInit {

  // contenu! : string
  // visibilite:boolean = false
  utilisateurId: number = 3

  userDetails!:any

  getStorage(){
    let storage = localStorage.getItem('userDetails');
    if(storage){
      this.userDetails = JSON.parse(storage)
    }
  }

  createPostForm = this.fb.group({
    contenu : ['',Validators.required],
    visibilite : ['',Validators.required],
  })

  get contenu(){
    return this.createPostForm.get("contenu");
  }
  get visibilite(){
    return this.createPostForm.get("visibilite");
  }

  constructor(private postsService:PostsService, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.getStorage()
  }

  addPost(){
    const controls = this.createPostForm.controls;
    console.log('contenu ' + controls.contenu.value);
    console.log('visibilite ' + controls.visibilite.value);

    this.postsService.createPost(this.contenu?.value,this.visibilite?.value,this.utilisateurId,this.userDetails.token).subscribe(/*rafraichir posts ici*/)
  }

}
