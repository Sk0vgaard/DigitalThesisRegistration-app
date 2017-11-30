import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContractsComponent } from './contracts/contracts.component';
import {contractRoutes} from './contract.routing';
import {ContractService} from './shared/contract.service';
import { NewContractComponent } from './new-contract/new-contract.component';
import { StudentsListComponent } from './students-list/students-list.component';
import {NgbModal, NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {NgbModalStack} from '@ng-bootstrap/ng-bootstrap/modal/modal-stack';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {StudentService} from './shared/student.service';
import {HttpClientModule} from '@angular/common/http';
import { EditContractComponent } from './edit-contract/edit-contract.component';
import { GroupContactComponent } from './group-contact/group-contact.component';
import {GroupService} from './shared/group.service';
import { CompanyComponent } from './company/company.component';
import {CompanyService} from './shared/company.service';
import { ProjectNameComponent } from './project/project-name/project-name.component';
import { ProjectPeriodComponent } from './project/project-period/project-period.component';
import { ProjectDescriptionComponent } from './project/project-description/project-description.component';
import { ProjectSupervisorComponent } from './project/project-supervisor/project-supervisor.component';
import {SupervisorService} from './shared/supervisor.service';
import {ProjectService} from './shared/project.service';

@NgModule({
  imports: [
    CommonModule,
    contractRoutes,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    NgbModule.forRoot()
  ],
  declarations: [ContractsComponent, NewContractComponent, StudentsListComponent, EditContractComponent, GroupContactComponent, CompanyComponent, ProjectNameComponent, ProjectPeriodComponent, ProjectDescriptionComponent, ProjectSupervisorComponent],
  providers: [ContractService, StudentService, NgbModal, NgbModalStack, GroupService, CompanyService, SupervisorService, ProjectService]
})
export class ContractModule { }
