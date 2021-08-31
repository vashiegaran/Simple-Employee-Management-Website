import { path } from '@angular-devkit/core';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class FireBaseService {

  constructor(private firestore: AngularFirestore) {
   }

   getEmployee(){
     return this.firestore.collection('employee').snapshotChanges();

   }

   addEmployee(payload:IEmployee){
    return this.firestore.collection('employee').add(payload);
   }

   updateEmployee(employeeID:string,payload:IEmployee){
     return this.firestore.doc('employee/'+employeeID).update(payload);
   }

   deleteEmployee(employeeID:string){
    return this.firestore.doc('employee/'+employeeID).delete();
  }

}

export interface IEmployee{

id?: string;
name : string;
email:string;

}