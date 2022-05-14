import { Component, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PostsService } from 'src/app/services/posts.service';
import { Post } from '../../model/post';
import { Comment } from '../../model/comment';
import { ReworkDate } from 'src/app/helpers/reworkDate';

@Component({
  selector: 'app-wall-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss']
})
export class WallPostsComponent implements OnInit {

  posts!:Post[]
  comments!:Comment[]
  showComments:boolean = false
  userDetails!:any

  constructor(private route:ActivatedRoute,private postsService:PostsService) { }

  ngOnInit(): void {
    this.getStorage()
    this.getPosts()
  }

  getStorage(){
    let storage = localStorage.getItem('userDetails');
    if(storage){
      this.userDetails = JSON.parse(storage)
    }
  }

  displayComments(){
    this.showComments = true;
  }

  private getPosts(){
    this.postsService.getPosts(+this.userDetails.id,this.userDetails.token).subscribe(posts=>{
      posts.map(post => {
        let timestamp = +post.datePublication

        return ReworkDate.toString(timestamp,post,"datePublication")
      })

      this.posts = posts
    })
  }

}
