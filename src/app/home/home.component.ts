import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { DataService } from '../data.service';
import { User } from '../user-data';
import { UserData } from '../user-data.service';
import { UserFetch } from '../user-fetch';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {
  userFormGroup!: FormGroup;
  users!: User[];
  user!: UserFetch;
  displayData!: boolean;

  constructor(private dataservice: DataService){}
  getUsers(){
    this.dataservice.getUsers().subscribe(data => {
      this.users = data;
    });
  }
  fetchId = 0;
  ngOnInit() {
    this.userFormGroup = new FormGroup(
      {
        id: new FormControl(''),
        name : new FormControl(''),
        age : new FormControl(''),
        gender:new FormControl('')
      },
    );
    this.getUsers();
    this.getUser();
}


addUser() {
  this.dataservice.addUser(this.userFormGroup.value,this.users.length).subscribe(data => {
    this.user = data;
    console.log(this.user);
  });
  this.getUsers();
}

getUser() {
  this.dataservice.getUser(this.fetchId).subscribe(data => {
    this.user = data;
   this.displayData=true;
  });
}

idtoUpdate = 0;
nametoUpdate = '';
agetoUpdate = 0;
gendertoUpdate = '';
updateUser() {
  this.dataservice.getUser(this.idtoUpdate).subscribe(data => {
    this.user = data;
    this.user.name = this.nametoUpdate;
    this.user.age = this.agetoUpdate;
    this.user.gender=this.gendertoUpdate;
    this.dataservice.updateUser(this.user).subscribe(data1 => {
      this.getUsers();
    });
  });
}


idtodelete=0;
deleteUser(id:number  ) {
  this.idtodelete=id;
  this.dataservice.deleteUser(this.idtodelete).subscribe(data => {
    this.getUsers();
  });
}
}
