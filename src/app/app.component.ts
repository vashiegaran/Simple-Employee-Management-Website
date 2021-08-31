import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FireBaseService, IEmployee } from './services/fire-base.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  public form: FormGroup ;

  public employeeList : IEmployee[]=[];

  public employeeDetails:IEmployee;
  

  
  constructor(
    private fb:FormBuilder, 
    private modalservice:NgbModal,
    private fireBaseService:FireBaseService
    
    
    ){}
    

  ngOnInit(): void {
    this.getEmployees();
  }

  getEmployees():void{

    this.fireBaseService.getEmployee().subscribe((res)=>{
        this.employeeList = res.map((employee)=>{

          return{
            ...employee.payload.doc.data() as {},
            id:employee.payload.doc.id 
          }as IEmployee;

        });
    });

  } 

  openModal(content:TemplateRef<any>,employeeID:string) :void{
    this.employeeDetails = this.employeeList.find((employee:IEmployee)=>employee.id ===employeeID);

    this.formInit(this.employeeDetails);
    this.modalservice.open(content, {backdrop: 'static', centered:true});



  }

  formInit(data:IEmployee):void{
    this.form=this.fb.group({
      name: [data? data.name : '',Validators.required],
      email: [data? data.email : '', Validators.compose([
        Validators.required,
        Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)
      ])
    ]
    });
  }

  addEmployee(): void{
      this.fireBaseService.addEmployee(this.form.value).then();
  }

  updateEmployee(employeeID:string):void{
    this.fireBaseService.updateEmployee(employeeID,this.form.value).then();
  }

  deleteEmployee(employeeID:string):void{
    this.fireBaseService.deleteEmployee(employeeID).then();
  }


  title = 'CRUD';
}
