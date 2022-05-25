import {
  BadRequestException,
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { Repository } from 'typeorm';

import User from '../models/user';
import { ResponseDTO } from './../dto/response.dto';
import { UserDTO } from './../dto/user.dto';
import { UserPutDTO } from './../dto/user.put.dto';

@Injectable()
class UserService {
  public constructor(
    @InjectRepository(User)
    public readonly userReporitory: Repository<User>,
  ) {}

  async findAll(): Promise<ResponseDTO> {
    try {
      return new ResponseDTO(
        'Found users',
        await this.userReporitory.find(),
        200,
        true,
      );
    } catch (exception) {
      throw new InternalServerErrorException(
        'Erro in find users: ' + exception.message,
      );
    }
  }

  async find({ id }): Promise<ResponseDTO> {
    if (!id) {
      throw new BadRequestException("Parameter 'id' is necessary!");
    }
    let result: User = null;

    try {
      result = await this.userReporitory.findOne(id);
    } catch (exception) {
      throw new InternalServerErrorException(
        'Erro in find users: ' + exception.message,
      );
    }

    if (!result) {
      throw new NotFoundException('user not found');
    }

    return new ResponseDTO('Found users', result, 200, true);
  }

  async create(userDTO: UserDTO): Promise<ResponseDTO> {
    const validEmail: User = await this.userReporitory.findOne({
      email: userDTO.email,
    });

    if (validEmail) {
      throw new ConflictException(
        'Erro in create user: this user already exists',
      );
    }

    try {
      const entity = new User();
      entity.email = userDTO.email;
      entity.name = userDTO.name;
      entity.dateBirth = userDTO.dateBirth;
      entity.password = await this.hashPassword(userDTO.password, 10);

      const user: User = await this.userReporitory.save(entity);

      return new ResponseDTO('Created', user, 201, true);
    } catch (exception) {
      throw new InternalServerErrorException(
        'Erro in create user: ' + exception.message,
      );
    }
  }

  async update(userPutDTO: UserPutDTO): Promise<ResponseDTO> {
    const validEmail: User = await this.userReporitory.findOne({
      email: userPutDTO.email,
    });

    if (validEmail) {
      throw new ConflictException(
        'Erro in update user: this user already exists',
      );
    }

    try {
      const entity = new User();
      entity.id = userPutDTO.id;
      entity.name = userPutDTO.name;
      entity.dateBirth = userPutDTO.dateBirth;
      entity.password = '123456789';

      if (userPutDTO.email) {
        entity.email = userPutDTO.email;
      }

      const user: User = await this.userReporitory.save(entity);

      return new ResponseDTO(
        'Updated',
        await this.userReporitory.findOne(user.id),
        201,
        true,
      );
    } catch (exception) {
      throw new InternalServerErrorException(
        'Erro in update user: ' + exception.message,
      );
    }
  }

  async auth(email: string, virtualPass: string): Promise<any> {
    const user = await this.userReporitory.findOne({ email });

    if (user && (await this.comparePassword(user.password, virtualPass))) {
      const { password, ...result } = user;

      return result;
    }

    return null;
  }

  async delete({ id }): Promise<ResponseDTO> {
    if (!id) {
      throw new BadRequestException("Parameter 'id' is necessary!");
    }

    try {
      return new ResponseDTO(
        'User deleted',
        await this.userReporitory.delete(id),
        200,
        true,
      );
    } catch (exception) {
      throw new InternalServerErrorException(
        'Erro in delete user: ' + exception.message,
      );
    }
  }

  private async comparePassword(
    password: string,
    virtualPass: string,
  ): Promise<boolean> {
    return await bcrypt.compare(virtualPass, password);
  }

  private async hashPassword(password: string, salt: number): Promise<string> {
    return bcrypt.hash(password, salt);
  }
}

export default UserService;
