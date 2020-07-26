export class MovieModel{
    constructor(
        public movieId: string,
        public name: string,
        public category: string,
        public casts: string,
        public producer: string,
        public director: string,
        public description: string,
        public length: string,
        public language: string,
        public trailer: string,
        public posterURL: string,
        public imdbRating: number,
        public userRating: number, 
        public releaseDate: string,
        public movieAddedBy: string,
        public isAlive: boolean,
        public movieCreationTimeStamp: string,
        public movieLastModifiedTimeStamp: string
    ){}
}