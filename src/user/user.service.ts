import { CACHE_MANAGER, Inject, Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import { CreateUserDto } from "./dto/create-user.dto";
import { UserEntity } from "./entity/user.entity";
import { Cache } from "cache-manager";

import * as bcrypt from "bcrypt";
import { InjectRepository } from "@nestjs/typeorm";
import { CacheService } from "src/cache/cache.service";
import { ConfigService } from "src/config/config.service";

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
    private readonly cacheService: CacheService,
    private readonly configService: ConfigService,
  ) {}

  DEFAULT_TTL = this.configService.config.cache.DEFAULT_TTL;

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
