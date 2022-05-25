import Category from '../../src/app/models/category';
import { CategoryService } from '../../src/app/services/category.service';
import { DeleteResult, Repository } from 'typeorm';
import {
  BadRequestException,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common/exceptions';

describe('Category Service Test', () => {
  const categoryRepository = new Repository<Category>();
  const categoryService = new CategoryService(categoryRepository);
  const mockCategory = new Category();

  it('Deve chamar a função find do repository passando o type ao chamar a funçao findAll', async () => {
    const findSpy = jest
      .spyOn(categoryRepository, 'find')
      .mockResolvedValue([mockCategory]);
    const type = 'test';

    await categoryService.findAll({ type });

    expect(findSpy).toHaveBeenCalledWith({ type });
  });

  it('Deve chamar a função find do repository sem o type ao chamar a funçao findAll', async () => {
    const findSpy = jest
      .spyOn(categoryRepository, 'find')
      .mockResolvedValue([mockCategory]);
    const type = null;

    await categoryService.findAll({ type });

    expect(findSpy).toHaveBeenCalledWith();
  });

  it('Deve tratar o erro ao chamar a funçao findAll', async () => {
    categoryRepository.find = jest.fn().mockRejectedValue(() => {
      throw new Error('Error');
    });
    const type = null;

    try {
      await categoryService.findAll({ type });
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
      .spyOn(categoryRepository, 'save')
      .mockResolvedValue(mockCategory);
    const categoryDTO = new Category();

    await categoryService.create(categoryDTO);

    expect(saveSpy).toHaveBeenCalledWith(categoryDTO);
  });

  it('Deve retornar um erro caso a funçao create falhe', async () => {
    categoryRepository.save = jest.fn().mockRejectedValue(() => {
      throw new Error('Error');
    });
    const categoryDTO = new Category();

    try {
      await categoryService.create(categoryDTO);
    } catch (error) {
      expect(error).toBeInstanceOf(InternalServerErrorException);
    }
  });

  it('Deve chamar a função update do repository passando a categoria ao chamar a funçao update', async () => {
    const updateSpy = jest
      .spyOn(categoryRepository, 'save')
      .mockResolvedValue(mockCategory);
    const categoryDTO = new Category();

    await categoryService.update(categoryDTO);

    expect(updateSpy).toHaveBeenCalledWith(categoryDTO);
  });

  it('Deve retornar um erro caso a funçao update falhe', async () => {
    categoryRepository.save = jest.fn().mockRejectedValue(() => {
      throw new Error('Error');
    });
    const categoryDTO = new Category();

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
