import { Body, Controller, Get, Post, Query } from "@nestjs/common";
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
  findUser(
    @Query() findUserParamDto: FindUserParamDto,
    @CurrentUser() currentUser: UserEntity,
  ) {
    console.log(currentUser);
    console.log(findUserParamDto);
  }
}
