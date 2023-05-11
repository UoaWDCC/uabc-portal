/**
 * @author Aditya Tendulkar <aten037@aucklanduni.ac.nz>
 */

export class User {
  constructor(
    public userId: string,
    public firstName: string,
    public lastName: string,
    public email: string,

    public isMember: Boolean,
    public sessionsRemaining: Number,

    public previousDifficulty: Difficulty,

    public university?: University,
    public universityID?: UniversityID


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