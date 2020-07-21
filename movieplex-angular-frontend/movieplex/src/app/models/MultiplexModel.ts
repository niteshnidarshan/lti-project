export class MultiplexModel{
    constructor(
        public multiplexId: string,
        public name: string,
	    public location: string,
        public screenDetailList: any,
        public numberOfScreens: number,
        public associatedUserId: string,
        public isAlive: boolean,
        public mPlexCreateTimeStamp: string,
	    public mPlexModifiedTimeStamp: string
        ){}
}