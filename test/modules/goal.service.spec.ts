import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';

import { GoalService } from '../../src/app/services/goal.service';
import * as ormOptions from '../../src/config/orm';
import  GoalModule from '../../src/app/modules/goal.module';

describe('GoalService', () => {
    let app: TestingModule;
    let service: GoalService;

    beforeAll(async () => {
        app = await Test.createTestingModule({
            imports: [TypeOrmModule.forRoot(ormOptions), GoalModule],
            providers: [GoalService],
        }).compile();

        service = app.get<GoalService>(GoalService);
    });

    describe('Find All', () => {
        it('Success Case', async () => {
            const result: any = await service.findAll();
            expect(result).toBeDefined();
        });
    
        // TODO 
        it('Fail Case', async () => {
            const result: any = await service.findAll();
            expect(result).toBeDefined();
        });

    });

});
