import { EventEmitter, inject, Injectable } from '@angular/core';
import { IPost, IPostRes } from '../../models/p';
import { Observable, of } from 'rxjs';
import { Subject } from 'rxjs';
import { Uuid } from './uuid';



@Injectable({
  providedIn: 'root',
})
export class Post {
  private _uuidService = inject(Uuid);
  editPostSub$: Subject<IPost | null> = new Subject<IPost | null>();
  // updateCompletedSub$ = new Subject<void>();
  posts: Array<IPost> = [
    {
      id: 1,
      title: 'Introduction to Angular',
      body: 'Angular is a powerful TypeScript-based framework developed by Google for building modern web applications. It provides features such as components, data binding, directives, services, dependency injection, routing, and forms. Angular helps developers create scalable and maintainable applications by following a structured architecture.',
      status: 'active'
    },

    {
      id: 2,
      title: 'Why Learn TypeScript?',
      body: 'TypeScript is a strongly typed programming language built on top of JavaScript. It helps developers catch errors during development and makes large applications easier to maintain. Features such as interfaces, types, generics, classes, and access modifiers make TypeScript especially useful when working with frameworks like Angular.',
      status: 'active'
    },

    {
      id: 3,
      title: 'Understanding RxJS',
      body: 'RxJS is a library for reactive programming using Observables. Angular uses RxJS extensively for handling asynchronous operations, HTTP requests, events, and streams of data. Operators such as map, filter, subscribe, debounceTime, switchMap, and catchError help developers transform and manage asynchronous data efficiently.',
      status: 'draft'
    },

    {
      id: 4,
      title: 'What Are Angular Components?',
      body: 'Components are the basic building blocks of an Angular application. A component contains a TypeScript class that handles application logic, an HTML template that defines the user interface, and CSS that controls the appearance. Applications can be divided into multiple reusable components to make the code easier to understand and maintain.',
      status: 'active'
    },

    {
      id: 5,
      title: 'Angular Services and Dependency Injection',
      body: 'Angular services are used to store reusable business logic and shared data. Instead of writing the same logic in multiple components, we can create a service and inject it wherever required. Dependency injection makes Angular applications more organized, reusable, testable, and easier to maintain as the application grows.',
      status: 'draft'
    }

  ];
  private postsSubject = new Subject<IPost[]>();
  posts$ = this.postsSubject.asObservable();

  fetchPosts(): Observable<IPost[]> {
    return of(this.posts)
  }

  createPost(newPost: IPost): Observable<IPostRes> {
    newPost.id = this._uuidService.Uuid()
    this.posts.unshift(newPost)
    return of({
      msg: `The new post with id ${newPost.id} is added successfully!!!`,
      post: newPost
    })
  }

  editPost(post: IPost) {
    this.editPostSub$.next(post);
  }

  UpdatePost(UpdatePost: IPost): Observable<IPostRes> {
    let getIndex = this.posts.findIndex(p => p.id === UpdatePost.id);
    if (getIndex !== -1) {
      this.posts[getIndex] = UpdatePost;
    }
    return of({
      msg: `The Post with I'D ${UpdatePost.id} Update Successfully!!!`,
      post: UpdatePost
    })

  }
  removePost(removeId: number): Observable<IPostRes> {
    const getIndex = this.posts.findIndex(r => r.id === removeId);
    if (getIndex === -1) {
      return of({
        msg: `Post with Id ${removeId} not found`,
        post: null
      })
    }
    this.postsSubject.next(this.posts);
    const removedPost = this.posts.splice(getIndex, 1);
    return of({
      msg: `The Post with If ${removeId} is removed successfully!!!`,
      post: removedPost[0]
    })
  }

  onCancel() {
    this.editPostSub$.next(null);
  }
}


