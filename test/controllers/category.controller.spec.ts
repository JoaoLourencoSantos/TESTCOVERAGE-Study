import { CategoryController } from '../../src/app/controllers/category.controller';
import { CategoryService } from '../../src/app/services/category.service';
import Category from '../../src/app/models/category';
import { ResponseDTO } from '../../src/app/dto/response.dto';
import { Repository } from 'typeorm';

describe('Category Controller Test', () => {
  const categoryRepository = new Repository<Category>();
  const categoryService = new CategoryService(categoryRepository);
  const categoryController = new CategoryController(categoryService);
  const mockResponseDTO: ResponseDTO = {
    statusCode: 200,
    message: '',
    error: '',
    body: null,
    sucess: true,
  };

  it('Deve chamar a função findAll do service ao chamar a funçao findAll', async () => {
    const findAllSpy = jest
      .spyOn(categoryService, 'findAll')
      .mockResolvedValue(mockResponseDTO);
    const params = {
      test: 'test',
    };

    await categoryController.findAll(params);

    expect(findAllSpy).toHaveBeenCalledWith(params);
  });

  it('Deve chamar a função find do service ao chamar a funçao findOne', async () => {
    const findSpy = jest
      .spyOn(categoryService, 'find')
      .mockResolvedValue(mockResponseDTO);
    const params = {
      test: 'test',
    };

    await categoryController.findOne(params);

    expect(findSpy).toHaveBeenCalledWith(params);
  });

  it('Deve chamar a função create do service ao chamar a funçao create', async () => {
    const createSpy = jest
      .spyOn(categoryService, 'create')
      .mockResolvedValue(mockResponseDTO);
    const category = new Category();

    await categoryController.create(category);

    expect(createSpy).toHaveBeenCalledWith(category);
  });

  it('Deve chamar a função update do service ao chamar a funçao update', async () => {
    const updateSpy = jest
      .spyOn(categoryService, 'update')
      .mockResolvedValue(mockResponseDTO);
    const category = new Category();

    await categoryController.update(category);

    expect(updateSpy).toHaveBeenCalledWith(category);
  });

  it('Deve chamar a função delete do service ao chamar a funçao delete', async () => {
    const deleteSpy = jest
      .spyOn(categoryService, 'delete')
      .mockResolvedValue(mockResponseDTO);
    const params = {
      test: 'test',
    };

    await categoryController.delete(params);

    expect(deleteSpy).toHaveBeenCalledWith(params);
  });
});
