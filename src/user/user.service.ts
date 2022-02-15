import { Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import { CreateUserDto } from "./dto/create-user.dto";
import { UserEntity } from "./entity/user.entity";

import * as bcrypt from "bcrypt";
import { InjectRepository } from "@nestjs/typeorm";

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}

  findAll() {
    return this.userRepository.find();
  }

  findUserById(id: number) {
    return this.userRepository.findOne(id);
  }

  findUserByName(name: string) {
    return this.userRepository.findOne({ name });
  }

  async createUser(createUserDto: CreateUserDto) {
    const newUser = this.userRepository.create(createUserDto);
    newUser.password = await bcrypt.hash(newUser.password, 10);
    return this.userRepository.save(newUser);
  }
}
