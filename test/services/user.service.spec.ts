import User from '../../src/app/models/user';
import UserService from '../../src/app/services/user.service';
import { DeleteResult, Repository } from 'typeorm';
import {
  BadRequestException,
  ConflictException,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';

describe('Category Service Test', () => {
  const categoryRepository = new Repository<User>();
  const categoryService = new UserService(categoryRepository);
  const mockCategory = new User();

  it('Deve chamar a função find do repository passando o type ao chamar a funçao findAll', async () => {
    const findSpy = jest
      .spyOn(categoryRepository, 'find')
      .mockResolvedValue([mockCategory]);

    await categoryService.findAll();

    expect(findSpy).toHaveBeenCalledWith();
  });

  it('Deve tratar o erro ao chamar a funçao findAll', async () => {
    categoryRepository.find = jest.fn().mockRejectedValue(() => {
      throw new Error('Error');
    });

    try {
      await categoryService.findAll();
    } catch (error) {
      expect(error).toBeInstanceOf(InternalServerErrorException);
    }
  });

  it('Deve chamar a função findOne do repository passando o id ao chamar a funçao findOne', async () => {
    const findOneSpy = jest
      .spyOn(categoryRepository, 'findOne')
      .mockResolvedValue(mockCategory);
    const id = 1;

    await categoryService.find({ id });

    expect(findOneSpy).toHaveBeenCalledWith(id);
  });

  it('Deve retornar um erro caso não passe um id ao chamar a funçao findOne', async () => {
    const id = null;

    try {
      await categoryService.find({ id });
    } catch (error) {
      expect(error).toBeInstanceOf(BadRequestException);
    }
  });

  it('Deve retornar um erro caso não a funçao findOne não retorne uma categoria', async () => {
    categoryRepository.findOne = jest.fn().mockResolvedValue(null);
    const id = 1;

    try {
      await categoryService.find({ id });
    } catch (error) {
      expect(error).toBeInstanceOf(NotFoundException);
    }
  });

  it('Deve retornar um erro caso a funçao findOne falhe', async () => {
    categoryRepository.findOne = jest.fn().mockRejectedValue(() => {
      throw new Error('Error');
    });
    const id = 1;

    try {
      await categoryService.find({ id });
    } catch (error) {
      expect(error).toBeInstanceOf(InternalServerErrorException);
    }
  });

  it('Deve chamar a função save do repository passando a categoria ao chamar a funçao create', async () => {
    const saveSpy = jest
      .spyOn(categoryRepository, 'findOne')
      .mockResolvedValue(mockCategory);
    const userDTO = new User();

    try {
        await categoryService.create(userDTO);
      } catch (error) {
        expect(error).toBeInstanceOf(ConflictException);
      }
  });

  it('Deve retornar um erro caso a funçao create falhe', async () => {
    categoryRepository.findOne = jest.fn().mockResolvedValue(null);
    categoryRepository.save = jest.fn().mockRejectedValue(() => {
      throw new Error('Error');
    });
    const categoryDTO = new User();

    try {
      await categoryService.create(categoryDTO);
    } catch (error) {
      expect(error).toBeInstanceOf(InternalServerErrorException);
    }
  });

  it('Deve retornar erro de conflito ao chamar a funcao de update', async () => {
    const saveSpy = jest
      .spyOn(categoryRepository, 'findOne')
      .mockResolvedValue(mockCategory);
    const userDTO = new User();

    try {
        await categoryService.update(userDTO);
      } catch (error) {
        expect(error).toBeInstanceOf(ConflictException);
      }
  });

  it('Deve retornar um erro caso a funçao create falhe', async () => {
    categoryRepository.findOne = jest.fn().mockResolvedValue(null);
    categoryRepository.save = jest.fn().mockRejectedValue(() => {
      throw new Error('Error');
    });
    const categoryDTO = new User();

    try {
      await categoryService.update(categoryDTO);
    } catch (error) {
      expect(error).toBeInstanceOf(InternalServerErrorException);
    }
  });

  it('Deve chamar a função delete do repository passando o id ao chamar a funçao delete', async () => {
    const deleteSpy = jest
      .spyOn(categoryRepository, 'delete')
      .mockResolvedValue(new DeleteResult());
    const id = 1;

    await categoryService.delete({ id });

    expect(deleteSpy).toHaveBeenCalledWith(id);
  });

  it('Deve retornar um erro caso não passe um id ao chamar a funçao delete', async () => {
    const id = null;

    try {
      await categoryService.delete({ id });
    } catch (error) {
      expect(error).toBeInstanceOf(BadRequestException);
    }
  });

  it('Deve retornar um erro caso a funçao delete falhe', async () => {
    categoryRepository.delete = jest.fn().mockRejectedValue(() => {
      throw new Error('Error');
    });
    const id = 1;

    try {
      await categoryService.delete({ id });
    } catch (error) {
      expect(error).toBeInstanceOf(InternalServerErrorException);
    }
  });
});
