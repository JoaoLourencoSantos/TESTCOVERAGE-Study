import {
  BadRequestException,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import Goal from '../../src/app/models/goal';
import { DeleteResult, Repository } from 'typeorm';

import { GoalDTO } from './../../src/app/dto/goal.dto';
import { GoalService } from './../../src/app/services/goal.service';

describe('Goal Service Test', () => {
  const goalRepository = new Repository<Goal>();
  const goalService = new GoalService(goalRepository);
  const mockGoalDTO = new GoalDTO();
  const mockListGoal = [new Goal()];
  const mockGoal = new Goal();

  it('Deve chamar a função find do repository passando o type ao chamar a funçao findAll', async () => {
    const findSpy = jest
      .spyOn(goalRepository, 'find')
      .mockResolvedValue(mockListGoal);

    await goalService.findAll();

    expect(findSpy).toHaveBeenCalledWith();
  });

  it('Deve chamar a função find do repository sem o type ao chamar a funçao findAll', async () => {
    const findSpy = jest
      .spyOn(goalRepository, 'find')
      .mockResolvedValue(mockListGoal);

    await goalService.findAll();

    expect(findSpy).toHaveBeenCalledWith();
  });

  it('Deve tratar o erro ao chamar a funçao findAll', async () => {
    goalRepository.find = jest.fn().mockRejectedValue(() => {
      throw new Error('Error');
    });

    try {
      await goalService.findAll();
    } catch (error) {
      expect(error).toBeInstanceOf(InternalServerErrorException);
    }
  });

  it('Deve chamar a função findOne do repository passando o id ao chamar a funçao findOne', async () => {
    const findOneSpy = jest
      .spyOn(goalRepository, 'findOne')
      .mockResolvedValue(mockGoal);
    const id = 1;

    await goalService.find({ id });

    expect(findOneSpy).toHaveBeenCalledWith(id);
  });

  it('Deve retornar um erro caso não passe um id ao chamar a funçao findOne', async () => {
    const id = null;

    try {
      await goalService.find({ id });
    } catch (error) {
      expect(error).toBeInstanceOf(BadRequestException);
    }
  });

  it('Deve retornar um erro caso não a funçao findOne não retorne o objetivo', async () => {
    goalRepository.findOne = jest.fn().mockResolvedValue(null);
    const id = 1;

    try {
      await goalService.find({ id });
    } catch (error) {
      expect(error).toBeInstanceOf(NotFoundException);
    }
  });

  it('Deve retornar um erro caso a funçao findOne falhe', async () => {
    goalRepository.findOne = jest.fn().mockRejectedValue(() => {
      throw new Error('Error');
    });
    const id = 1;

    try {
      await goalService.find({ id });
    } catch (error) {
      expect(error).toBeInstanceOf(InternalServerErrorException);
    }
  });

  it('Deve chamar a função save do repository passando o objetivo ao chamar a funçao create', async () => {
    const saveSpy = jest
      .spyOn(goalRepository, 'save')
      .mockResolvedValue(mockGoal);

    const goalDTO = {
      description: undefined,
      finishDate: undefined,
      value: NaN,
    };

    await goalService.create(goalDTO as any);

    expect(saveSpy).toHaveBeenCalledWith(goalDTO as Goal);
  });

  it('Deve retornar um erro caso a funçao create falhe', async () => {
    goalRepository.save = jest.fn().mockRejectedValue(() => {
      throw new Error('Error');
    });

    try {
      await goalService.create(mockGoalDTO);
    } catch (error) {
      expect(error).toBeInstanceOf(InternalServerErrorException);
    }
  });

  it('Deve chamar a função update do repository passando o objetivo ao chamar a funçao update', async () => {
    const updateSpy = jest
      .spyOn(goalRepository, 'save')
      .mockResolvedValue(mockGoal);

    const goalDTO = {
      description: undefined,
      finishDate: undefined,
      value: NaN,
      id: undefined,
    };

    await goalService.update(goalDTO as any);

    expect(updateSpy).toHaveBeenCalledWith(goalDTO as Goal);
  });

  it('Deve retornar um erro caso a funçao update falhe', async () => {
    goalRepository.save = jest.fn().mockRejectedValue(() => {
      throw new Error('Error');
    });

    try {
      await goalService.update(mockGoalDTO);
    } catch (error) {
      expect(error).toBeInstanceOf(InternalServerErrorException);
    }
  });

  it('Deve chamar a função delete do repository passando o id ao chamar a funçao delete', async () => {
    const deleteSpy = jest
      .spyOn(goalRepository, 'delete')
      .mockResolvedValue(new DeleteResult());
    const id = 1;

    await goalService.delete({ id });

    expect(deleteSpy).toHaveBeenCalledWith(id);
  });

  it('Deve retornar um erro caso não passe um id ao chamar a funçao delete', async () => {
    const id = null;

    try {
      await goalService.delete({ id });
    } catch (error) {
      expect(error).toBeInstanceOf(BadRequestException);
    }
  });

  it('Deve retornar um erro caso a funçao delete falhe', async () => {
    goalRepository.delete = jest.fn().mockRejectedValue(() => {
      throw new Error('Error');
    });
    const id = 1;

    try {
      await goalService.delete({ id });
    } catch (error) {
      expect(error).toBeInstanceOf(InternalServerErrorException);
    }
  });
});
