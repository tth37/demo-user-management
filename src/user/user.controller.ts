import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Post,
  Query,
  UnauthorizedException,
} from "@nestjs/common";

import { CurrentUser } from "src/common/decorator/current-user.decorator";
import { CreateUserDto } from "./dto/create-user.dto";
import { FindUserParamDto } from "./dto/find-user-param.dto";
import { UserEntity } from "./entity/user.entity";
import { UserService } from "./user.service";

@Controller("user")
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  createUser(@Body() createUserDto: CreateUserDto) {
    return this.userService.createUser(createUserDto);
  }

  @Get()
  async findUser(
    @Query() queryParam: FindUserParamDto,
    @CurrentUser() currentUser: UserEntity,
  ) {
    if (currentUser) {
      return currentUser;
    } else {
      throw new UnauthorizedException();
    }

    //  console.log(currentUser);
    if (queryParam.id) {
      const user = await this.userService.findUserById(queryParam.id);
      if (!user)
        throw new NotFoundException(`UserId ${queryParam.id} not found`);
      return user;
    }
    return this.userService.findAll();
  }
}
