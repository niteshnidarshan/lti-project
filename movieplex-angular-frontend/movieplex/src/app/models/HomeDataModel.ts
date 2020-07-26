export class HomeDataModel{
    constructor(
        //multiplex details
	public multiplexId: string,
	public multiplexName: string,
	public location: string,
	
	//Screen details
	public screenId: string,
	public screenName: string,
	public screenSize: number, 
	public totalSeat: number, 
	public showStartDate: string,
	public showEndDate: string,
	
	//Movie details
	public movieId: string,
	public movieName: string,
	public category: string,
	public casts: string,
	public producer: string,
    public director: string,
    public description: string,
	public length: number,
	public language: string,
	public trailer: string,
	public posterURL: string,
	public imdbRating: number,
	public userRating: number,
	public releaseDate: string
    ){}
}