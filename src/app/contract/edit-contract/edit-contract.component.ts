import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ContractService} from '../shared/contract.service';
import {Contract} from '../shared/contract.model';
import {Student} from '../shared/student.model';
import {forEach} from '@angular/router/src/utils/collection';
import {StudentService} from '../shared/student.service';
import {Group} from '../shared/group.model';
import {GroupService} from '../shared/group.service';
import {CompanyService} from '../shared/company.service';
import {Company} from '../shared/company.model';
import {ProjectService} from '../shared/project.service';
import {Project} from '../shared/project.model';

@Component({
  selector: 'app-edit-contract',
  templateUrl: './edit-contract.component.html',
  styleUrls: ['./edit-contract.component.css']
})
export class EditContractComponent implements OnInit {

  isEditable: boolean;

  contract: Contract;
  group: Group;
  company: Company;
  project: Project;

  groupContactEmail = 'this is temperary'; // TODO RKL: Remove.

  constructor(private contractSerivce: ContractService, private route: ActivatedRoute, private studentService: StudentService,
              private groupService: GroupService, private companyService: CompanyService, private projectService: ProjectService) {
    this.isEditable = false;
    // Defining the properties of the group to avoid undefined property exception.
    this.group = {contactEmail: '', students: []};
    this.company = {name: '', contactName: '', contactPhone: '', contactEmail: ''};
    // Instantiating the project so we don't get undefined properties. Might be this is doable for company too?
    this.project = {};
    // Grabbing the url.
    route.params.subscribe(params => {
      // Getting the hashValue from the url. 'contractId' is defined in contract.routing.
      const contractId = params['contractId'];
      // Converting the hashValue to a Contract object.
      // atob is base 64 encoding, that we are using for the hashValue. atop is for decrypting.
      const contract: Contract = JSON.parse(atob(contractId));
      // Logging the hashValue.
      console.log(params);
      // Calling the contract.service.getById() and logging the response. (The response is the contract from the database).
      this.contract = contractSerivce.getById(contract.groupId, contract.projectId, contract.companyId);
      // this.populateStudents();
      this.populateGroup();
      this.populateCompany();
      this.populateProject();
    });
  }

  // TODO ALH: Refactor
  // populateStudents() {
  //   if (this.contract.studentIds != null) {
  //     for (const studentId of this.contract.studentIds) {
  //       this.studentService.get(studentId).subscribe(s => this.students.push(s));
  //     }
  //   }
  // }

  ngOnInit() {

  }

  private populateGroup() {
    if (this.contract.groupId != null) {
      this.groupService.get(this.contract.groupId).subscribe(g => this.group = g);
    }
  }


  private populateCompany() {
    if (this.contract.companyId != null) {
      this.companyService.get(this.contract.companyId).subscribe(c => this.company = c);
    }else {
      console.log('No company id');
    }
  }

  private populateProject() {
    if (this.contract.projectId != null) {
      this.projectService.get(this.contract.projectId).subscribe(p => {
        this.project = p;
        console.log('Project Id: ' + this.project.id + ' Project Title: ' + this.project.title);
      });

    }else {
      // TODO: Remove when implementation is done.
      console.log('No project id');
    }
  }
}
