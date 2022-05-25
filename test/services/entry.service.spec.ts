import Entry from '../../src/app/models/entry';
import Category from '../../src/app/models/category';
import { EntryService } from '../../src/app/services/entry.service';
import { EntryDTO } from '../../src/app/dto/entry.dto';
import { ResponseDTO } from '../../src/app/dto/response.dto';
import { DeleteResult, Repository } from 'typeorm';
import {
  BadRequestException,
  InternalServerErrorException,
} from '@nestjs/common/exceptions';

describe('Entry Service Test', () => {
  const entryRepository = new Repository<Entry>();
  const categoryRepository = new Repository<Category>();
  const entryService = new EntryService(entryRepository, categoryRepository);
  const mockEntry = new Entry();
  const mockCategory = new Category();
  const entryDTO = new EntryDTO();

  it('Deve retornar as entries do repository passando o type e o month ao chamar a funçao findAll', async () => {
    entryRepository.createQueryBuilder = jest.fn().mockReturnValue({
      select: jest.fn().mockReturnThis(),
      addSelect: jest.fn().mockReturnThis(),
      leftJoinAndSelect: jest.fn().mockReturnThis(),
      where: jest.fn().mockReturnThis(),
      andWhere: jest.fn().mockReturnThis(),
      getMany: jest.fn().mockResolvedValue([mockEntry]),
    });

    const res = new ResponseDTO('Found entrys', [mockEntry], 200, true);
    const type = 'test';
    const month = 1;

    const entries = await entryService.findAll({ type, month });

    expect(entries).toEqual(res);
  });

  it('Deve retornar as entries do repository sem o type e o month ao chamar a funçao findAll', async () => {
    entryRepository.createQueryBuilder = jest.fn().mockReturnValue({
      leftJoinAndSelect: jest.fn().mockReturnThis(),
      andWhere: jest.fn().mockReturnThis(),
      getMany: jest.fn().mockResolvedValue([mockEntry]),
    });

    const res = new ResponseDTO('Found entrys', [mockEntry], 200, true);
    const type = null;
    const month = null;

    const entries = await entryService.findAll({ type, month });

    expect(entries).toEqual(res);
  });

  it('Deve retornar as entries do repository sem o type e com o month ao chamar a funçao findAll', async () => {
    entryRepository.createQueryBuilder = jest.fn().mockReturnValue({
      leftJoinAndSelect: jest.fn().mockReturnThis(),
      andWhere: jest.fn().mockReturnThis(),
      getMany: jest.fn().mockResolvedValue([mockEntry]),
    });

    const res = new ResponseDTO('Found entrys', [mockEntry], 200, true);
    const type = null;
    const month = 1;

    const entries = await entryService.findAll({ type, month });

    expect(entries).toEqual(res);
  });

  it('Deve chamar a função find do repository passando o type e sem o month ao chamar a funçao findAll', async () => {
    entryRepository.createQueryBuilder = jest.fn().mockReturnValue({
      select: jest.fn().mockReturnThis(),
      addSelect: jest.fn().mockReturnThis(),
      leftJoinAndSelect: jest.fn().mockReturnThis(),
      where: jest.fn().mockReturnThis(),
      andWhere: jest.fn().mockReturnThis(),
      getMany: jest.fn().mockResolvedValue([mockEntry]),
    });

    const res = new ResponseDTO('Found entrys', [mockEntry], 200, true);
    const type = 'test';
    const month = null;

    const entries = await entryService.findAll({ type, month });

    expect(entries).toEqual(res);
  });

  it('Deve tratar o erro ao chamar a funçao findAll', async () => {
    entryRepository.createQueryBuilder = jest.fn().mockRejectedValue(() => {
      throw new Error('Error');
    });
    const type = 'test';
    const month = 1;

    try {
      await entryService.findAll({ type, month });
    } catch (error) {
      expect(error).toBeInstanceOf(InternalServerErrorException);
    }
  });

  it('Deve retornar as entries do repository passando o id ao chamar a funçao find', async () => {
    entryRepository.findOne = jest.fn().mockResolvedValue(mockEntry);

    const res = new ResponseDTO('Found entry', mockEntry, 200, true);
    const id = 1;

    const entry = await entryService.find({ id });

    expect(entry).toEqual(res);
  });

  it('Deve tratar o erro ao chamar a funçao find', async () => {
    entryRepository.findOne = jest.fn().mockRejectedValue(() => {
      throw new Error('Error');
    });
    const id = 1;

    try {
      await entryService.find({ id });
    } catch (error) {
      expect(error).toBeInstanceOf(InternalServerErrorException);
    }
  });

  it('Deve tratar o erro ao chamar a funçao find sem id', async () => {
    const id = null;

    try {
      await entryService.find({ id });
    } catch (error) {
      expect(error).toBeInstanceOf(BadRequestException);
    }
  });

  it('Deve retornar os indicators do repository passando o month ao chamar a funçao findIndicators', async () => {
    entryRepository.createQueryBuilder = jest.fn().mockReturnValue({
      select: jest.fn().mockReturnThis(),
      addSelect: jest.fn().mockReturnThis(),
      from: jest.fn().mockReturnThis(),
      where: jest.fn().mockReturnThis(),
      andWhere: jest.fn().mockReturnThis(),
      getRawOne: jest.fn().mockResolvedValue([mockEntry]),
    });

    const res = new ResponseDTO('Found indicators', [mockEntry], 200, true);
    const month = 1;

    const indicators = await entryService.findIndicators({ month });

    expect(indicators).toEqual(res);
  });

  it('Deve tratar o erro ao chamar a funçao findIndicators', async () => {
    entryRepository.createQueryBuilder = jest.fn().mockRejectedValue(() => {
      throw new Error('Error');
    });
    const month = 1;

    try {
      await entryService.findIndicators({ month });
    } catch (error) {
      expect(error).toBeInstanceOf(InternalServerErrorException);
    }
  });

  it('Deve retornar os indicators do repository sem o month ao chamar a funçao findIndicators', async () => {
    entryRepository.createQueryBuilder = jest.fn().mockReturnValue({
      select: jest.fn().mockReturnThis(),
      addSelect: jest.fn().mockReturnThis(),
      from: jest.fn().mockReturnThis(),
      where: jest.fn().mockReturnThis(),
      andWhere: jest.fn().mockReturnThis(),
      getRawOne: jest.fn().mockResolvedValue([mockEntry]),
    });

    const res = new ResponseDTO('Found indicators', [mockEntry], 200, true);
    const month = null;

    const indicators = await entryService.findIndicators({ month });

    expect(indicators).toEqual(res);
  });

  it('Deve chamar a função save do repository passando a entry ao chamar a funçao create', async () => {
    const saveSpy = jest
      .spyOn(entryRepository, 'save')
      .mockResolvedValue(mockEntry);
    jest.spyOn(categoryRepository, 'findOne').mockResolvedValue(mockCategory);

    await entryService.create(entryDTO);

    expect(saveSpy).toHaveBeenCalledWith({
      category: mockCategory,
      name: undefined,
      referenceAt: undefined,
      type: undefined,
      value: NaN,
    } as Entry);
  });

  it('Deve retornar um erro caso a funçao create falhe', async () => {
    entryRepository.save = jest.fn().mockRejectedValue(() => {
      throw new Error('Error');
    });

    try {
      await entryService.create(entryDTO);
    } catch (error) {
      expect(error).toBeInstanceOf(InternalServerErrorException);
    }
  });

  it('Deve chamar a função save do repository passando a entry ao chamar a funçao update', async () => {
    const saveSpy = jest
      .spyOn(entryRepository, 'save')
      .mockResolvedValue(mockEntry);
    jest.spyOn(categoryRepository, 'findOne').mockResolvedValue(mockCategory);

    await entryService.update(entryDTO);

    expect(saveSpy).toHaveBeenCalledWith({
      category: mockCategory,
      name: undefined,
      referenceAt: undefined,
      type: undefined,
      value: NaN,
    } as Entry);
  });

  it('Deve retornar um erro caso a funçao update falhe', async () => {
    entryRepository.save = jest.fn().mockRejectedValue(() => {
      throw new Error('Error');
    });

    try {
      await entryService.update(entryDTO);
    } catch (error) {
      expect(error).toBeInstanceOf(InternalServerErrorException);
    }
  });

  it('Deve chamar a função delete do repository passando o id da entry ao chamar a funçao delete', async () => {
    const deleteSpy = jest
      .spyOn(entryRepository, 'delete')
      .mockResolvedValue(new DeleteResult());
    const id = 1;

    await entryService.delete({ id });

    expect(deleteSpy).toHaveBeenCalledWith(id);
  });

  it('Deve retornar um erro caso não passe um id ao chamar a funçao delete', async () => {
    const id = null;

    try {
      await entryService.delete({ id });
    } catch (error) {
      expect(error).toBeInstanceOf(BadRequestException);
    }
  });

  it('Deve retornar um erro caso a funçao delete falhe', async () => {
    entryRepository.delete = jest.fn().mockRejectedValue(() => {
      throw new Error('Error');
    });
    const id = 1;

    try {
      await entryService.delete({ id });
    } catch (error) {
      expect(error).toBeInstanceOf(InternalServerErrorException);
    }
  });
});
