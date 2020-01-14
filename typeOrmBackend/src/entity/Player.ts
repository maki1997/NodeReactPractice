import {Entity, PrimaryGeneratedColumn, Column, ManyToOne} from "typeorm";
import {Team} from "./Team";

@Entity()
export class Player {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    firstname: string;

    @Column()
    lastname: string;

    @ManyToOne(type => Team, team => team.players)
    team: Team;


}
