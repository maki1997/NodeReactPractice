import {Entity, PrimaryGeneratedColumn, Column} from "typeorm";
import { Length, IsNotEmpty } from "class-validator";
import * as bcrypt from "bcryptjs";

@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    username: string;

    @Column()
    password: string;

    @Column()
    @IsNotEmpty()
    role: string;

    hashPassword() {
    this.password = bcrypt.hashSync(this.password, 8);
  }

  checkIfUnencryptedPasswordIsValid(unencryptedPassword: string) {
    console.log("thispass: "+ this.password);
    return bcrypt.compareSync(unencryptedPassword, this.password);
  }

}
