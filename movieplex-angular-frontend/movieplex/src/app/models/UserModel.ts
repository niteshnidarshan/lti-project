import { MultiplexModel } from './MultiplexModel';

export class UserModel{
    constructor(
        public userId: String,
        public firstName: string,
        public lastName: string,
        public gender: string,
        public dob: string,
        public age: string,
        public email: string,
        public mobile: string,
        public password: string,
        public location: string,
        public userType: string,
        public isAlive: string,
        public mPlexList: MultiplexModel,
        public profileCreationTimeStamp: string,
        public profileLastModifiedTimeStamp: string
    ){}
}