import {Entity, PrimaryGeneratedColumn, Column, OneToMany} from "typeorm";
import {Player} from "./Player";

@Entity()
export class Team {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({unique:true})
    name: string;

    @OneToMany(type => Player, player => player.team,{
        cascade: true,
    })
    players: Player[];


}
