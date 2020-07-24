import { MovieModel } from './MovieModel';

export class ScreenModel{
    constructor(
        public screenId: string,
        public multiplexId: string,
        public screenName: string,
        public screenSize: number,
        public totalSeat: number,
        public movieId: string,
        public movieDetail: MovieModel,
        public showStartDate: string,
        public showEndDate: string,
        public isScreenAlive: boolean,
        public showAllocationDate: string,
        public showLastModified: string
    ){}
}