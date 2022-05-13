import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { PostsService } from 'src/app/services/posts.service';


@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.scss']
})
export class WallCreatePostComponent implements OnInit {

  contenu! : string
  visibilite:boolean = false
  utilisateurId: number = 88

  createPostForm = this.fb.group({
    contenu : ['',Validators.required],
    visibilite : ['',Validators.required],
  })

  constructor(private postsService:PostsService, private fb: FormBuilder) { }

  ngOnInit(): void {
  }

  addPost(){
    let datePublication:string = new Date().toDateString()
    this.postsService.createPost(this.contenu,datePublication,this.visibilite,this.utilisateurId).subscribe(/*rafraichir posts ici*/)
  }

}
