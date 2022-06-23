/* Type that defines the MyCard props */
export default interface MyCardProps { 
	fetching? : boolean,
	error? : boolean,
	imgURL?: string,
	quoteText?: string,
	quoteAuthor?: string,
	doUpdate?: () => void
}
