import {Entity, PrimaryGeneratedColumn, Column, OneToMany} from "typeorm";
import {Player} from "./Player";

@Entity()
export class Team {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @OneToMany(type => Player, player => player.team) // note: we will create author property in the Photo class below
    players: Player[];


}
