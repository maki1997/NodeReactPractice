import {Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn} from "typeorm";
import { Length, IsNotEmpty } from "class-validator";
import * as bcrypt from "bcryptjs";
import {Team} from "../entity/Team";

@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({unique:true})
    username: string;

    @Column()
    password: string;

    @Column()
    @IsNotEmpty()
    role: string;

    @OneToOne(type => Team)
    @JoinColumn()
    myTeam: Team;

    hashPassword() {
    this.password = bcrypt.hashSync(this.password, 8);
  }

  checkIfUnencryptedPasswordIsValid(unencryptedPassword: string) {
    console.log("thispass: "+ this.password);
    return bcrypt.compareSync(unencryptedPassword, this.password);
  }

}
