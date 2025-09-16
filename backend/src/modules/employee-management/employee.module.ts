// src/employee/employee.module.ts
import { Module } from '@nestjs/common';
import { EmployeeService } from './employee.service';
import { EmployeeController } from './employee.controller';
import { EmployeeAuthController } from './auth/employeeAuth.controller';
import { EmployeeAuthService } from './auth/employeeAuth.service';

@Module({
  controllers: [EmployeeController, EmployeeAuthController],
  providers: [EmployeeService, EmployeeAuthService],
})
export class EmployeeModule {}
