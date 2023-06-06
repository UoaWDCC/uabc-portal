/**
 * @author Aditya Tendulkar <aten037@aucklanduni.ac.nz>
 */

export class User {
  constructor(
    public firstName: string,
    public lastName: string,
    public email: string,

    public isMember: Boolean,
    public sessionsRemaining: Number,

    public previousDifficulty: Difficulty,

    public university?: University,
    public universityID?: UniversityID,
    public id?: string,
  ) {}
}

export enum University {
}

export enum UniversityID {

}

export enum Difficulty {
  BEGINNER = "BEGINNER",
  INTERMEDIATE = "INTERMEDIATE",
  ADVANCED = "ADVANCED",
  UNSPECIFIED = "UNSPECIFIED"
}