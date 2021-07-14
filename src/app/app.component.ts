import { HttpClient, HttpParams } from '@angular/common/http';
import { Component, OnInit, VERSION } from '@angular/core';
import { Repos } from './model/repos.model';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  name = 'Angular ' + VERSION.major;
  userName: string = 'tektutorialshub';
  baseURL: string = 'https://api.github.com/';
  repos: Repos[];
  sort: string = 'description';
  page: number = 2;
  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.getRepos();
    this.getRepoParams();
  }

  public getRepos() {
    //https://api.github.com/users/tekTutorialsHub/repos?sort=description&page=2
    return this.http
      .get<Repos[]>(
        this.baseURL +
          'users/' +
          this.userName +
          '/repos?sort=' +
          this.sort +
          '&page=' +
          this.page
      )
      .subscribe(response => {
        this.repos = response;
        console.log('1', this.repos);
      });
  }

  public getRepoParams() {
    let newParams = new HttpParams()
      .set('sort', this.sort)
      .set('page', this.page);
    return this.http
      .get<Repos[]>(this.baseURL + 'users/' + this.userName + '/repos', {
        params: newParams
      })
      .subscribe(response => {
        this.repos = response;
        console.log('2', this.repos);
      });
  }

  public postExample() {
    const headers = {
      Authorization: 'Bearer my-token',
      'My-Custom-Header': 'foobar'
    };
    const body = { title: 'Angular POST Request Example' };
    this.http
      .post<any>('https://reqres.in/api/posts', body, { headers: headers })
      .subscribe(data => {
        console.log('post3', data.id);
      });
  }
}
