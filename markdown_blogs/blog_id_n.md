# Code cùng AnSon NestJS-MySQL (P1)

**Hai modules chính của phần này là auth và user**

Các thư viện sẽ sử dụng:

> npm i class-validator class-transformer @nestjs/passport passport passport-local express-session @nestjs/typeorm typeorm mysql2

- [Code cùng AnSon NestJS-MySQL (P1)](#code-cùng-anson-nestjs-mysql-p1)
- [Dùng intellisense cho env](#dùng-intellisense-cho-env)
- [main.ts](#maints)
- [App Module](#app-module)
- [Tạo 1 database MySQL bằng command](#tạo-1-database-mysql-bằng-command)
- [Tạo Entity User](#tạo-entity-user)
- [Export entity](#export-entity)
- [Khởi tạo constant cho Route và Service Inject](#khởi-tạo-constant-cho-route-và-service-inject)
- [User](#user)
  - [Tạo User Module](#tạo-user-module)
  - [Tạo User Controller](#tạo-user-controller)
  - [Tạo User Service](#tạo-user-service)
    - [Interface User Service](#interface-user-service)
  - [Hash password và compare](#hash-password-và-compare)
  - [User Service](#user-service)
  - [Local Stratergy.ts](#local-stratergyts)
  - [Guard.ts apply các Strategy](#guardts-apply-các-strategy)
  - [Serialize và Deserialize](#serialize-và-deserialize)
- [Cài đặt Auth module](#cài-đặt-auth-module)
  - [Auth Controller](#auth-controller)
  - [Auth service](#auth-service)
    - [Interface Auth Service](#interface-auth-service)

# Dùng intellisense cho env

```ts
declare namespace NodeJS {
  export interface ProcessEnv {
    PORT: number;
    MYSQL_DB_HOST?: string;
    MYSQL_DB_USERNAME?: string;
    MYSQL_DB_PASSWORD?: string;
    MYSQL_DB_PORT?: number;
    MYSQL_DB_DATABASE?: string;
  }
}
```

# main.ts

```ts
import 'reflect-metadata'; //dùng cho các decorators

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as session from 'express-session';
import * as passport from 'passport';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const { PORT, COOKIE_SECRET } = process.env; //PORT 3001 env
  app.setGlobalPrefix('api'); //set global prefix (api)
  app.useGlobalPipes(new ValidationPipe());
  //Global pipe

  //Định nghĩa cho session
  app.use(
    session({
      secret: COOKIE_SECRET,
      saveUninitialized: false,
      resave: false,
      cookie: {
        maxAge: 86400000,
      },
    })
  );
  app.use(passport.initialize()); //init passport
  app.use(passport.session()); //use passprt session
  try {
    await app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  } catch (error) {
    console.log(error);
  }
}
bootstrap(); //run app
```

# App Module

```ts
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import entities from './utils/typeorm';
import { PassportModule } from '@nestjs/passport';
@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env', //config env path bằng Config
    }),
    PassportModule.register({ session: true }), //Tiến hành đăng ký Passport sử dụng session

    //Để sử dụng type ORM, ta cài đặt module type orm trong app module vỡi các thông số sau
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.MYSQL_DB_HOST, //mặc định là 3306
      port: process.env.MYSQL_DB_PORT,
      username: process.env.MYSQL_DB_USERNAME, //mặc định là root
      password: process.env.MYSQL_DB_PASSWORD, //password mà mình cài khi cài mysql server
      database: process.env.MYSQL_DB_DATABASE, //tên của data base
      entities: entities, //các entites được định nghĩa và export ra
      synchronize: true, //Đồng bộ với các entites, nó sẽ tự cập nhật trong database nếu có sự thay đổi
    }),

    AuthModule,
    UserModule,
    //Thêm User và Auth Module
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
```

# Tạo 1 database MySQL bằng command

```
mysql -u root -p //Sau đó tiến hành nhập password
Create database chatapp_db;
Show database; //hiện các database
Use database chatapp_db;
show tables; hiện ra các bảng
describe column_name //miêu tả các thuộc tính (cột) có trong bảng
select * from table_name //select từ table
```

# Tạo Entity User

```ts
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Exclude } from 'class-transformer';
@Entity()
export class User {
  //cái cless này mình export nó để xíu nữa dùng làm Type cho User được luôn
  @PrimaryGeneratedColumn() //Khóa chính và tự generate
  id: number;

  @Column({ unique: true })
  username: string;

  @Column({ nullable: true })
  email: string;
  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  @Exclude() //exclude để khi chuyển sang plain object thì nó không return password
  password: string;
}
```

# Export entity

```ts
import { User } from './entities/User';

const entities = [User];
export { User };
export default entities;
```

# Khởi tạo constant cho Route và Service Inject

```ts
export enum Routes {
  AUTH = 'auth',
}
export enum Services {
  //Cách dùng constant Service inject này là mình sẽ bỏ nó vào providers
  //Còn bản thân nó nếu mà module khác dùng thì cần export
  // ví dụ  providers: [{ provide: Services.USER, useClass: UserService }],
  // sau đó @Inject trong constructor của service hoặc controller
  AUTH = 'AUTH_SERVICE',
  USER = 'USER_SERVICE',
}
```

# User

## Tạo User Module

```ts
import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { Services } from 'src/utils/constants';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/utils/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([User])], //Nếu như mình dùng Entity nào trong module này
  //thì mình phải import nó trong array for Feature
  controllers: [UserController],
  providers: [{ provide: Services.USER, useClass: UserService }],
  //định nghĩa inject service
  exports: [{ provide: Services.USER, useClass: UserService }],
  //export ra cho module Auth dùng
})
export class UserModule {}
```

## Tạo User Controller

```ts
import { Controller } from '@nestjs/common';

@Controller('user')
export class UserController {}
```

## Tạo User Service

> chủ yếu hiện tại cái service này để inject vào cho auth nên controller chưa dùng

### Interface User Service

```ts
import {
  CreateUserDetail,
  FindUserOptions,
  FindUserParams,
} from 'src/utils/types';

export interface IUserServices {
  createUser(userDetails: CreateUserDetail);
  findUser(findUserParams: FindUserParams, findUserOptions: FindUserOptions);
}
```

## Hash password và compare

```ts
import * as bcrypt from 'bcrypt';

export async function hashPassword(rawPassword: string) {
  const salt = await bcrypt.genSalt();
  return bcrypt.hash(rawPassword, salt);
}
export async function compareHash(rawPassword: string, hash: string) {
  return bcrypt.compare(rawPassword, hash);
}
```

##Định nghĩa type cho User Service

```ts
export type CreateUserDetail = {
  username: string;
  password: string;
  firstName: string;
  lastName: string;
};

export type ValidateUserDetails = {
  username: string;
  password: string;
};
export type FindUserParams = Partial<{
  id: number;
  email: string;
  username: string;
}>;
export type FindUserOptions = Partial<{
  selectAll: boolean;
}>;
```

## User Service

```ts
import { Body, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { IUserServices } from './user';
import {
  CreateUserDetail,
  FindUserOptions,
  FindUserParams,
} from 'src/utils/types';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/utils/typeorm';
import { Repository } from 'typeorm';
import { hashPassword } from 'src/utils/typeorm/helper';

@Injectable()
export class UserService implements IUserServices {
  //Implement theo interface
  constructor(
    @InjectRepository(User) //Nếu ta dùng entity User thì ta cần inject, User là Entity
    private readonly userRepository: Repository<User> //Định nghĩa instance
  ) {}
  async createUser(userDetails: CreateUserDetail) {
    const user = await this.userRepository.findOneBy({
      username: userDetails.username,
    });
    if (user) {
      throw new HttpException('User already exists', HttpStatus.CONFLICT);
    }
    const password = await hashPassword(userDetails.password);
    const newUser = this.userRepository.create({ ...userDetails, password });

    return this.userRepository.save(newUser);
  }
  async findUser(
    findUserParams: FindUserParams,
    findUserOptions: FindUserOptions
  ) {
    const user = await this.userRepository.findOneBy(findUserParams);
    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
    return user;
  }
}
```

**Phần User xem như là xong**

#Cài đặt Local Strategy để dùng trong Auth Module

## Local Stratergy.ts

```ts
import { Inject, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { Services } from 'src/utils/constants';
import { IAuthServices } from '../auth';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  //Strategy nằm trong passport-local
  //nên xíu nó tự có name là 'local'
  constructor(
    @Inject(Services.AUTH) private readonly authService: IAuthServices //Providers của AUTH
  ) {
    //super({ usernameField: "email" }) if you want to use email instead of username
    super();
  }
  async validate(username: string, password: string) {
    return this.authService.validateUser({ username, password });
    //Hàm validate với giá trị return để set trong request.user
    // nếu mình return có giá trị => hợp lệ, nếu là null=> không hợp lệ
  }
}
```

## Guard.ts apply các Strategy

```ts
import { ExecutionContext } from '@nestjs/common';
import { Injectable } from '@nestjs/common/decorators';
import { AuthGuard } from '@nestjs/passport';

@Injectable() //local mình đã định nghĩa ở trên
export class LocalAuthGuard extends AuthGuard('local') {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    // CanActivate sẽ nhận vào Execution Context và return 1 boolean value
    //boolean value này sẽ xác định xem có vượt qua Guard được không
    const result = (await super.canActivate(context)) as boolean;
    //CanActivate trong super của AuthGuard sẽ check xem trong context có chứa
    // request.user không => return boolean
    const request = context.switchToHttp().getRequest();
    //convert execution Context sang HTTP Request
    await super.logIn(request);
    //Gọi hàm login của super, dù cho thằng result true hay false gì cũng kệ
    // Mục đích là nếu đăng nhập thành công thì cần lưu session id vào cookies

    return result;
  }
}
```

_Thì khi mà Guard chạy local thành công thì để lưu vào session_ _Mình cần serialize nó và deserialize cho các requests sau_

## Serialize và Deserialize

```ts
import { Inject, Injectable } from '@nestjs/common';
import { PassportSerializer } from '@nestjs/passport';
import { UserService } from 'src/user/user.service';
import { Services } from 'src/utils/constants';
import { User } from 'src/utils/typeorm';

@Injectable()
export class SessionSerializer extends PassportSerializer {
  // kế thừa PassportSerializer
  constructor(
    @Inject(Services.USER) private readonly userService: UserService
  ) {
    super();
  }
  serializeUser(user: User, done: Function) {
    done(null, user); //null là không có lỗi
  }
  //Serialize sẽ chạy lần đầu tiên khi gửi request
  // sau đó nếu thành công sẽ done() và lưu user vào cookies
  // ở đây user khi đăng nhập thì tùy vào logic return của validate mà có các values nào
  //nên khi đó mình cần deserialize để các request sau dựa trên thông tin đó
  // mà tìm trong database thì sẽ có nhiều dữ liệu về user hơn
  async deserializeUser(user: User, done: Function) {
    const userDB = this.userService.findUser(
      { id: user.id }, //ở đây mình dùng id để find
      { selectAll: true }
    );
    return userDB ? done(null, userDB) : done(null, null);

    //nếu tìm thấy user trong database thì sẽ done user, còn không thì done null
  }
}
```

# Cài đặt Auth module

```ts
import { Module } from '@nestjs/common';
import { AuthController } from '../auth/auth.controller';
import { AuthService } from './auth.service';
import { Services } from 'src/utils/constants';
import { UserModule } from 'src/user/user.module';
import { LocalStrategy } from './utils/localStrategy';
import { SessionSerializer } from './utils/SessionSerializer';

@Module({
  imports: [UserModule],
  controllers: [AuthController],
  providers: [
    //cung cấp localStrategy và session Serializer đã định nghĩa phía trên
    LocalStrategy,
    SessionSerializer,
    {
      provide: Services.AUTH,
      useClass: AuthService,
    },
  ],
})
export class AuthModule {}
```

## Auth Controller

```ts
import {
  Body,
  Controller,
  Get,
  Inject,
  Post,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { Routes, Services } from 'src/utils/constants';
import { IAuthServices } from './auth';
import { CreateUserDto } from './dtos/createUser.dto';
import { UserService } from 'src/user/user.service';
import { instanceToPlain } from 'class-transformer';
import { UserLoginDto } from './dtos/userLogin.dto';
import { LocalAuthGuard } from './utils/Guard';

@Controller(Routes.AUTH) //import auth route
export class AuthController {
  constructor(
    //Inject cac service
    @Inject(Services.AUTH)
    private authService: AuthService,
    @Inject(Services.USER)
    private userService: UserService
  ) {}

  @Post('/register')
  @UsePipes(ValidationPipe)
  registerUser(@Body() createUserDto: CreateUserDto) {
    return instanceToPlain(this.userService.createUser(createUserDto));
    //instanceToPlain để apply cái Exlude trong User Entity lúc nãy
  }
  @Post('/login')
  @UseGuards(LocalAuthGuard)
  //Apply Guard Local đã định nghĩa
  login() {
    console.log('ok');
  }
  @Get('/status')
  status() {}

  @Post('/logout')
  logout() {}
}
```

## Auth service

**Auth service này lát dùng trong local strategy khi login**

### Interface Auth Service

```ts
import { User } from 'src/utils/typeorm';
import { ValidateUserDetails } from 'src/utils/types';
export interface IAuthServices {
  validateUser(userCredentials: ValidateUserDetails): Promise<User | null>;
  // return lại user hoặc null ( dùng trong validate của local strategy)
}
```

```ts
import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { IAuthServices } from './auth';
import { Services } from 'src/utils/constants';
import { UserService } from 'src/user/user.service';
import { ValidateUserDetails } from 'src/utils/types';
import { compareHash } from 'src/utils/typeorm/helper';

@Injectable() //Injectable decorator
export class AuthService implements IAuthServices {
  constructor(
    @Inject(Services.USER) //inject user service
    private userService: UserService
  ) {}
  async validateUser(userDetails: ValidateUserDetails) {
    {
      const user = await this.userService.findUser(
        { username: userDetails.username },
        { selectAll: true }
      );
      console.log(user);
      if (!user)
        throw new HttpException('Invalid Credentials', HttpStatus.UNAUTHORIZED);
      const isPasswordValid = await compareHash(
        userDetails.password,
        user.password
      );
      console.log(isPasswordValid);
      return isPasswordValid ? user : null;
    }
  }
}
```

**Done**
